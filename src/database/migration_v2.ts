import type { SQLiteDatabase } from 'expo-sqlite';
import { DATABASE_VERSION } from './schema';

// 1. Centralize as suas queries de criação originais aqui (ou importe do seu schema)
// Garanta que todas as tabelas bases usem IF NOT EXISTS na Versão 1
import { INITIAL_SCHEMA, ITEM_SCHEMA, VERSION_SCHEMA /* ... outros schemas */ } from './schema';

/**
 * Dicionário de Migrações Incrementais.
 * Cada número representa a transição para aquela versão específica.
 * NUNCA mude o código de uma versão passada, apenas adicione novas versões abaixo.
 */
const MIGRATIONS: Record<number, (db: any) => Promise<void>> = {
    // Versão 1: Criação da estrutura inicial do aplicativo
    1: async (transaction) => {
        console.log('[Migration] Executando Versão 1: Criação das tabelas base...');
        await transaction.execAsync(INITIAL_SCHEMA);
        await transaction.execAsync(ITEM_SCHEMA);
        // ... execute todas as suas 45 tabelas originais aqui ...
        await transaction.execAsync(VERSION_SCHEMA);
    },

    // Versão 2: Exemplo de alteração futura (Adicionar coluna sem dropar nada)
    2: async (transaction) => {
        console.log('[Migration] Executando Versão 2: Adicionando nova coluna em item_mods...');
        await transaction.execAsync(
            `ALTER TABLE "item_mods" ADD COLUMN "nova_propriedade" TEXT;`
        );
    },

    // Versão 3: Exemplo de alteração drástica (Remover/Recriar uma tabela específica)
    3: async (transaction) => {
        console.log('[Migration] Executando Versão 3: Recriando tabela skkiastestdictionary...');
        await transaction.execAsync(`DROP TABLE IF EXISTS "skkiastestdictionary";`);
        await transaction.execAsync(
            `CREATE TABLE "skkiastestdictionary" (
                "id" TEXT PRIMARY KEY NOT NULL,
                "nova_chave" TEXT
            );`
        );
    },
};

/**
 * Executa as migrações de forma estrita e sequencial usando a mesma conexão
 */
export async function migrateDatabase(database: SQLiteDatabase): Promise<void> {
    // Usamos withTransactionAsync para evitar Deadlocks com o botão de Sync
    await database.withTransactionAsync(async () => {
        
        // Busca a versão onde o banco do usuário parou
        const result = await database.getFirstAsync<{ user_version: number }>(
            'PRAGMA user_version',
        );
        let currentVersion = result?.user_version ?? 0;

        console.log(`[Migration] Versão atual do banco: ${currentVersion}. Versão alvo: ${DATABASE_VERSION}`);

        if (currentVersion > DATABASE_VERSION) {
            throw new Error(
                `Banco incompatível: versão do arquivo (${currentVersion}) é maior que a suportada (${DATABASE_VERSION}).`
            );
        }

        if (currentVersion === DATABASE_VERSION) {
            console.log('[Migration] Banco de dados já está atualizado.');
            return;
        }

        // Executa em fila (Ex: Se o usuário estiver na v1 e a alvo for v3, ele roda a v2 e depois a v3)
        while (currentVersion < DATABASE_VERSION) {
            const nextVersion = currentVersion + 1;
            const migrationFn = MIGRATIONS[nextVersion];

            if (!migrationFn) {
                throw new Error(`Migração para a versão ${nextVersion} não foi encontrada no arquivo de configuração.`);
            }

            // Executa o bloco específico daquela versão
            await migrationFn(database);
            
            currentVersion = nextVersion;
        }

        // Atualiza o cabeçalho do SQLite de forma definitiva
        await database.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
        console.log(`[Migration] Banco atualizado com sucesso para a versão: ${DATABASE_VERSION}`);
    });
}
