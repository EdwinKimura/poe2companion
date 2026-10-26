import { Directory, File, Paths } from 'expo-file-system';

const WIKI_FILE_URL = 'https://www.poe2wiki.net/wiki/Special:FilePath/';
const MAX_CONCURRENT_DOWNLOADS = 1;
const MIN_REQUEST_INTERVAL_MS = 6000;
const MAX_RETRIES = 5;
const FALLBACK_429_DELAY_MS = 45000;

type QueueJob = {
  key: string;
  fileName: string;
  url: string;
  targetFile: File;
  resolve: (uri: string) => void;
};

let directoryCache: Directory | null = null;
let activeDownloads = 0;
let queueRunning = false;
let nextRequestAt = 0;
let rateLimitedUntil = 0;

const queue: QueueJob[] = [];
const pending = new Map<string, Promise<string>>();
const failedUntil = new Map<string, number>();
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, ms)));

function getDirectory(): Directory {
  if (directoryCache) return directoryCache;
  const directory = new Directory(Paths.document, 'images/items');
  if (!directory.exists) directory.create({ idempotent: true, intermediates: true });
  directoryCache = directory;
  return directory;
}

function normalizeName(name: string): string {
  return name.trim()
    .replace(/^File:/i, '')
    .replace(/^\/+/, '')
    .replace(/&amp;#0*39;/gi, "'")
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&amp;quot;|&quot;/gi, '"')
    .replace(/&amp;lt;|&lt;/gi, '<')
    .replace(/&amp;gt;|&gt;/gi, '>')
    .replace(/&amp;/gi, '&');
}

function makeKey(name: string): string {
  let hash = 2166136261;
  for (let i = 0; i < name.length; i++) {
    hash ^= name.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const readable = name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60);
  return `${readable}_${(hash >>> 0).toString(16)}`;
}

function retryAfterMs(error: unknown): number | null {
  const e = error as {
    status?: number;
    message?: string;
    headers?: Record<string, string | undefined>;
    response?: { status?: number; headers?: Record<string, string | undefined> };
  };
  const headers = e?.response?.headers ?? e?.headers;
  const value = headers?.['Retry-After'] ?? headers?.['retry-after'];
  if (value) {
    const seconds = Number(value);
    if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
    const date = Date.parse(value);
    if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
  }
  if (e?.status === 429 || e?.response?.status === 429 || /\b429\b|too many requests/i.test(e?.message ?? '')) {
    return FALLBACK_429_DELAY_MS;
  }
  return null;
}

async function runJob(job: QueueJob): Promise<void> {
  const { key, fileName, url, targetFile, resolve } = job;
  try {
    if (targetFile.exists && targetFile.size > 0) {
      resolve(targetFile.uri);
      return;
    }

    let lastError: unknown;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const rateWait = rateLimitedUntil - Date.now();
      if (rateWait > 0) await delay(rateWait);
      const spacingWait = nextRequestAt - Date.now();
      if (spacingWait > 0) await delay(spacingWait);
      nextRequestAt = Date.now() + MIN_REQUEST_INTERVAL_MS;

      try {
        const file = await File.downloadFileAsync(url, targetFile, { idempotent: true });
        if (file.exists && file.size > 0) {
          failedUntil.delete(key);
          resolve(file.uri);
          return;
        }
        throw new Error(`Arquivo vazio após download: ${fileName}`);
      } catch (error) {
        lastError = error;
        const wait = retryAfterMs(error);
        if (wait !== null) {
          rateLimitedUntil = Math.max(rateLimitedUntil, Date.now() + wait);
          await delay(wait);
        } else if (attempt < MAX_RETRIES) {
          await delay(Math.min(1000 * 2 ** attempt, 8000));
        }
      }
    }

    failedUntil.set(key, Date.now() + 60000);
    console.log(`[ImageCache] Falha ao baixar "${fileName}".`, lastError);
    resolve('');
  } finally {
    activeDownloads--;
    pending.delete(key);
    void processQueue();
  }
}

async function processQueue(): Promise<void> {
  if (queueRunning) return;
  queueRunning = true;
  try {
    while (queue.length > 0 && activeDownloads < MAX_CONCURRENT_DOWNLOADS) {
      const wait = rateLimitedUntil - Date.now();
      if (wait > 0) await delay(wait);
      const job = queue.shift();
      if (!job) continue;
      activeDownloads++;
      void runJob(job);
    }
  } finally {
    queueRunning = false;
    if (queue.length > 0 && activeDownloads < MAX_CONCURRENT_DOWNLOADS) void processQueue();
  }
}

/** Retorna o URI local ou string vazia se falhar; não retorna a URL remota como fallback. */
export async function getCachedImageUri(fileName: string): Promise<string> {
  if (!fileName || typeof fileName !== 'string') return '';
  const normalizedName = normalizeName(fileName);
  if (!normalizedName) return '';
  const key = makeKey(normalizedName);

  try {
    const directory = getDirectory();
    // Special:FilePath pode redirecionar para formatos diferentes de PNG.
    const targetFile = new File(directory, `poe2_${key}.img`);
    if (targetFile.exists && targetFile.size > 0) return targetFile.uri;
    if ((failedUntil.get(key) ?? 0) > Date.now()) return '';
    const existing = pending.get(key);
    if (existing) return existing;

    const url = WIKI_FILE_URL + encodeURIComponent(normalizedName);
    const promise = new Promise<string>((resolve) => {
      queue.push({ key, fileName: normalizedName, url, targetFile, resolve });
      void processQueue();
    });
    pending.set(key, promise);
    return await promise;
  } catch (error) {
    console.log(`[ImageCache] Erro no cache para "${normalizedName}".`, error);
    return '';
  }
}

export function clearImageCacheQueue(): void {
  // Esvazia a fila de trabalhos pendentes
  queue.length = 0;
  
  // Limpa o mapa de promessas ativas pendentes
  pending.clear();
  
  // Reseta os sinalizadores de execução
  queueRunning = false;
  activeDownloads = 0;
  rateLimitedUntil = 0;
  nextRequestAt = 0;
  
  console.log('[ImageCache] Fila de requisições de imagem limpa com sucesso.');
}
