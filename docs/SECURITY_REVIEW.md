# SECURITY_REVIEW.md

## 1. Modelo de Ameaças e Superfície de Ataque

A arquitetura **Offline-First** com sincronização bidirecional expande a superfície de ataque convencional de aplicações móveis, transferindo validações de integridade, controle de acesso e armazenamento sensível para o ambiente hostil do dispositivo cliente.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Superfície de Ataque Mobile                     │
├────────────────────────────────┬───────────────────────────────────────┤
│ Armazenamento Local (At Rest)  │ SQLite (op-sqlite), MMKV, SecureStore │
│ Camada de Transporte (In Transit)│ REST API, Sync Endpoints, S3/CDN    │
│ Mecanismo de Sincronização     │ Fila Outbox, Delta Pull, Reconciliação│
│ Runtime & Código Cliente       │ JS Bundle (Hermes), Config Plugins    │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

## 2. Matriz de Riscos e Análise de Vulnerabilidades

| ID | Vetor de Ameaça | Gravidade | Impacto | Risco Operacional |
|---|---|---|---|---|
| **SEC-01** | Extração de Dados em Repouso no SQLite Desprotegido | **Crítico** | Alto | Dispositivos com *root* ou *jailbreak* acessam diretamente arquivos `.db` via `adb` ou sandbox bypass, expondo entidades de negócio e tabelas de histórico. |
| **SEC-02** | Adulteração de Payload na Fila Outbox (Tampering) | **Alto** | Alto | Modificação direta de comandos na tabela `outbox_mutations` injetando privilégios, IDs forjados ou contornando regras de negócio antes do envio. |
| **SEC-03** | Interceptação de Tráfego por MitM (Man-in-the-Middle) | **Alto** | Alto | Proxies locais (Burp Suite, Charles) interceptam payloads de sincronização em redes Wi-Fi não confiáveis sem validação estrita de certificados. |
| **SEC-04** | Vazamento de Tokens e PII em Logs e Armazenamento MMKV | **Médio** | Médio | Gravação de tokens de longa duração em MMKV não criptografado ou despejo de payloads brutos no console nativo (`logcat` / `os_log`). |
| **SEC-05** | Envenenamento de Dependências ou OTA Tampering | **Médio** | Crítico | Injeção de código arbitrário via artefatos adulterados do EAS Update sem verificação criptográfica de assinatura de bundle. |

---

## 3. Análise Detalhada e Contramedidas de Engenharia

### 3.1 Proteção de Dados em Repouso (Data At Rest)

#### Vulnerabilidade
O uso de SQLite (`@op-engineering/op-sqlite`) sem criptografia transparente de banco (SQLCipher) permite leitura imediata em texto claro do schema e registros caso o arquivo seja extraído. O `react-native-mmkv` sem chave de criptografia também opera em texto claro.

#### Mitigação Obrigatória
1. **Criptografia SQLCipher no SQLite:** Inicializar o banco com chave de criptografia de 256 bits gerada randomicamente na primeira instalação e armazenada estritamente no `expo-secure-store` (Keystore/Keychain).
2. **Instância Criptografada do MMKV:** Nunca utilizar a instância default não protegida para dados de sessão ou metadados de sync.

```typescript
// src/core/storage/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';
import * as Crypto from 'expo-crypto';

const MMKV_KEY_STORAGE_KEY = 'mmkv_encryption_secret_key';

export async function getOrCreateStorageKey(): Promise<string> {
  let key = await SecureStore.getItemAsync(MMKV_KEY_STORAGE_KEY);
  if (!key) {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    key = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    await SecureStore.setItemAsync(MMKV_KEY_STORAGE_KEY, key, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  }
  return key;
}

export function createEncryptedMMKV(encryptionKey: string): MMKV {
  return new MMKV({
    id: 'app-secure-storage',
    encryptionKey,
  });
}
```

---

### 3.2 Integridade e Imutabilidade da Fila Outbox

#### Vulnerabilidade
Se um atacante tiver permissões locais, pode alterar registros dentro da tabela `outbox_mutations`, modificando o `payload` JSON antes que o método `syncAllData()` faça o push para a nuvem.

#### Mitigação Obrigatória
Adicionar assinatura criptográfica local (HMAC-SHA256) em cada mutação criada na Outbox. Durante a leitura no `syncAllData()`, recalcular e validar o HMAC antes do despacho HTTP. Se divergir, a mutação é descartada e o incidente registrado.

```typescript
// src/features/sync/utils/mutationSigner.ts
import * as Crypto from 'expo-crypto';

export async function generateMutationSignature(
  entityName: string,
  entityId: string,
  payload: string,
  timestamp: number,
  clientSecret: string
): Promise<string> {
  const data = `${entityName}:${entityId}:${payload}:${timestamp}`;
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${data}:${clientSecret}`
  );
}
```

---

### 3.3 Comunicação e Transporte (Data In Transit)

#### Vulnerabilidade
Sem Certificate Pinning nativo, o aplicativo aceita certificados instalados pelo usuário na pasta de autoridades raiz do dispositivo (cenário comum em dispositivos corporativos auditados ou adulterados).

#### Mitigação Obrigatória
1. **Network Security Config (Android) & Info.plist (iOS):** Restringir tráfego HTTP inseguro via CNG Config Plugins.
2. **SSL Pinning Nativo:** Implementar pinning dos hashes SHA-256 das chaves públicas (SPKI) do backend nos domínios de sincronização e autenticação via config plugin ou camada nativa.

```json
// Trecho de configuração segura em app.json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": false
          },
          "ios": {
            "appleSilicon": true
          }
        }
      ]
    ]
  }
}
```

---

### 3.4 Gestão de Sessão, Tokens e Mutex de Renovação

#### Vulnerabilidade
Condições de corrida em requisições paralelas quando o Access Token expira: múltiplos endpoints acionam o refresh concorrentemente, provocando revogação de Refresh Token por rotação de credenciais no backend.

#### Mitigação Obrigatória
Implementação de Axios Interceptor com semáforo atômico (Mutex) para fila de requisições pendentes durante o ciclo de refresh:

```typescript
// src/core/api/httpClient.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import```typescript
import * as SecureStore from 'expo-secure-store';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        if (!refreshToken) {
          throw new Error('Sem refresh token persistido');
        }

        const { data } = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        await SecureStore.setItemAsync('access_token', newAccessToken);

        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        // Notifica store global de autenticação para redirecionar à tela de login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
```

---

### 3.5 Sanitização de Logs e Telemetria

#### Vulnerabilidade
Gravação acidental de dados de autenticação ou informações de clientes em logs de produção, tornando-os acessíveis via ferramentas de monitoramento de crash ou dumps de sistema (`console.log(error)` ou dumps de requisições do Axios).

#### Mitigação Obrigatória
Logger centralizado com mascaramento obrigatório de chaves sensíveis e supressão de saídas de console em builds de produção:

```typescript
// src/utils/logger.ts
const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'secret',
  'cpf',
  'document',
]);

function sanitize(data: unknown): unknown {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  const sanitizedObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitizedObj[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitizedObj[key] = sanitize(value);
    } else {
      sanitizedObj[key] = value;
    }
  }
  return sanitizedObj;
}

export const logger = {
  info: (message: string, context?: unknown) => {
    if (__DEV__) {
      console.log(`[INFO] ${message}`, context ? sanitize(context) : '');
    }
  },
  warn: (message: string, context?: unknown) => {
    console.warn(`[WARN] ${message}`, context ? sanitize(context) : '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ? sanitize(error) : '');
    // Encaminhamento seguro para serviço de observabilidade/crash report
  },
};
```

---

### 3.6 Assinatura e Integridade de Atualizações Over-The-Air (EAS Update)

#### Vulnerabilidade
Ataques no canal de entrega de assets ou sequestro de CDN podem distribuir arquivos JavaScript maliciosos que sobrescrevem a lógica original da aplicação instalada no dispositivo.

#### Mitigação Obrigatória
Ativar verificação de código por assinatura criptográfica assimétrica de chave pública (Code Signing) no EAS Update em `app.json`:

```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/[PROJECT_ID]",
      "checkAutomatically": "ON_LOAD",
      "codeSigningCertificate": "./certificates/certificate.pem",
      "codeSigningMetadata": {
        "keyid": "main-release-key",
        "alg": "rsa-v1_5-sha256"
      }
    }
  }
}
```

---

## 4. Checklist de Segurança para Pull Requests (Gate Operacional)

Todo PR submetido deve atender aos seguintes critérios antes do merge:

- [ ] **Variáveis Sensíveis:** Nenhuma chave privada, secret de assinatura ou token hardcoded no código ou exposto via prefixo `EXPO_PUBLIC_` incorretamente.
- [ ] **Persistência Segura:** Dados de sessão, credenciais ou biométricos persistem exclusivamente em `SecureStore` ou instâncias criptografadas do `MMKV`.
- [ ] **Queries Parametrizadas:** Toda operação manual no driver SQLite (`op-sqlite`) utiliza *prepared statements* com bindings (`?`), banindo concatenação direta de strings para evitar SQL Injection local.
- [ ] **Tratamento de Exceções:** Blocos `try/catch` que tratam erros de autenticação ou de transação limpam o estado da memória sem persistir dados corrompidos.
- [ ] **Logs Mascarados:** Nenhuma chamada direta a `console.log` em arquivos de produção; uso restrito da abstração `logger` com sanitização ativada.
- [ ] **Validação Estrita:** Schemas TypeScript sincronizados e validados em runtime (ex: Zod) ao deserializar respostas da API e entradas da tabela `outbox_mutations`.