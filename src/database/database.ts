import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

import { migrateDatabase } from './migrations';
import { DATABASE_NAME } from './schema';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

const APP_VERSION = Constants.expoConfig?.version ?? '0.0.0';

type AppVersion = {
    major: number;
    minor: number;
    patch: number;
};

function parseAppVersion(version: string): AppVersion {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);

    if (!match) {
        throw new Error(
            `Versão inválida em expo.version: "${version}". ` +
            'Use o formato MAJOR.MINOR.PATCH, por exemplo 0.0.1.',
        );
    }

    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

function shouldResetDatabase(
    currentVersion: AppVersion,
    savedVersion: AppVersion,
): boolean {
    return (
        currentVersion.major > savedVersion.major ||
        (
            currentVersion.major === savedVersion.major &&
            currentVersion.minor > savedVersion.minor
        )
    );
}

function isNewerVersion(
    currentVersion: AppVersion,
    savedVersion: AppVersion,
): boolean {
    if (currentVersion.major !== savedVersion.major) {
        return currentVersion.major > savedVersion.major;
    }

    if (currentVersion.minor !== savedVersion.minor) {
        return currentVersion.minor > savedVersion.minor;
    }

    return currentVersion.patch > savedVersion.patch;
}

/**
 * Exclui o banco apenas quando a versão MAJOR ou MINOR do aplicativo
 * aumenta. Alterações somente no PATCH preservam os dados.
 */
async function resetDatabaseForAppVersionIfNeeded(): Promise<void> {
    const database = await SQLite.openDatabaseAsync(DATABASE_NAME);
    let shouldDelete = false;

    try {
        await database.execAsync('PRAGMA busy_timeout = 5000;');

        const metadataTable = await database.getFirstAsync<{ name: string }>(
            `SELECT name
             FROM sqlite_master
             WHERE type = 'table'
               AND name = 'app_metadata'`,
        );

        // Banco novo: as migrations criarão app_metadata.
        if (metadataTable) {
            const savedAppVersion = await database.getFirstAsync<{ value: string }>(
                `SELECT value
                 FROM app_metadata
                 WHERE key = 'app_version'`,
            );

            if (!savedAppVersion?.value) {
                // Banco preexistente sem marcador de versão do app:
                // primeira execução desta regra, então recria o banco uma vez.
                shouldDelete = true;
            } else {
                const current = parseAppVersion(APP_VERSION);
                const saved = parseAppVersion(savedAppVersion.value);

                shouldDelete = shouldResetDatabase(current, saved);

                console.log('[SQLite] Versão do app salva:', savedAppVersion.value);
                console.log('[SQLite] Versão atual do app:', APP_VERSION);
                console.log('[SQLite] Reset necessário:', shouldDelete);
            }
        }
    } finally {
        // A conexão precisa estar fechada antes de excluir o arquivo.
        await database.closeAsync();
    }

    if (shouldDelete) {
        await SQLite.deleteDatabaseAsync(DATABASE_NAME);
        console.log('[SQLite] Banco excluído devido à mudança de versão do app.');
    }
}

async function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
    // A comparação acontece antes das migrations e sem manter outra
    // conexão aberta durante a exclusão.
    await resetDatabaseForAppVersionIfNeeded();

    const database = await SQLite.openDatabaseAsync(DATABASE_NAME);

    try {
        await database.execAsync('PRAGMA busy_timeout = 5000;');

        // O PRAGMA user_version continua controlando as migrations.
        await migrateDatabase(database);

        // Registra a versão do app somente depois que as migrations terminarem.
        const savedVersion = await database.getFirstAsync<{ value: string }>(
            `SELECT value
             FROM app_metadata
             WHERE key = 'app_version'`,
        );

        if (!savedVersion?.value) {
            await database.runAsync(
                `INSERT INTO app_metadata (key, value)
                 VALUES ('app_version', ?)`,
                APP_VERSION,
            );
        } else {
            const current = parseAppVersion(APP_VERSION);
            const saved = parseAppVersion(savedVersion.value);

            // Não regride o marcador caso seja instalada uma versão anterior.
            if (isNewerVersion(current, saved)) {
                await database.runAsync(
                    `UPDATE app_metadata
                     SET value = ?
                     WHERE key = 'app_version'`,
                    APP_VERSION,
                );
            }
        }

        console.log('[SQLite] Versão do app:', APP_VERSION);
        console.log('[SQLite] Banco inicializado:', database.databasePath);

        return database;
    } catch (error) {
        try {
            await database.closeAsync();
        } catch {
            // Preserva o erro original da inicialização.
        }

        throw error;
    }
}

export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (!databasePromise) {
        const initialization = initializeDatabase();
        databasePromise = initialization;

        void initialization.catch(() => {
            if (databasePromise === initialization) {
                databasePromise = null;
            }
        });
    }

    return databasePromise;
}

export async function resetDatabase(): Promise<void> {
    if (databasePromise) {
        const database = await databasePromise;

        await database.closeAsync();
        databasePromise = null;
    }

    await SQLite.deleteDatabaseAsync(DATABASE_NAME);

    await getDatabase();
}

export async function logDatabaseTables(): Promise<void> {
    const database = await getDatabase();

    const tables = await database.getAllAsync<{
        name: string;
    }>(
        `SELECT name
         FROM sqlite_master
         WHERE type = 'table'
         ORDER BY name;`
    );

    console.log('[SQLite] Tabelas do banco:');

    for (const table of tables) {
        console.log(`- ${table.name}`);
    }
}

export async function getAppVersion() {
    const database = await getDatabase();
    const savedAppVersion = await database.getFirstAsync<{ value: string }>(
        `SELECT value
            FROM app_metadata
            WHERE key = 'app_version'`,
    );
    let savedversion: AppVersion = {
        major: 0,
        minor: 0,
        patch: 0
    };

    if (savedAppVersion?.value) {
        savedversion = parseAppVersion(savedAppVersion.value)
    }

    return savedversion;
}