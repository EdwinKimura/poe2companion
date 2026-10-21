import { getDatabase } from '@/database/database';
import { getAllDatabaseTables } from '@/database/repositories/DataRepository';
import { SEED_ASSETS } from '@/database/seeds';
import { SQLiteDatabase } from 'expo-sqlite';

// Exemplo simulado de importação de JSONs locais
export async function importLocalData(options?: {
    onDatasetProgress?: (dataset: string, saved: number, total: number) => void;
}) {
    const database = await getDatabase();
    const tables = await getAllDatabaseTables(database);
    const synchronized: string[] = [];

    for (const table of tables) {
        if (table !== 'sync_state' && table !== 'app_metadata') {
            try {
                let jsonData = SEED_ASSETS[table];
                console.log(jsonData.length)

                // await insertJsonDataIntoTable(database, table, jsonData, (saved, totalCount) => {
                //     options?.onDatasetProgress?.(table, saved, totalCount);
                // });

                // synchronized.push(table);
            } catch (error) {
                console.error(`[Import] Erro ao importar tabela ${table}:`, error);
            }
        }

    }

    return { synchronized };
}

export async function insertJsonDataIntoTable(
    database: SQLiteDatabase,
    tableName: string,
    jsonData: Record<string, any>[],
    onProgress?: (saved: number, total: number) => void
): Promise<void> {

    if (!jsonData || jsonData.length === 0) {
        onProgress?.(0, 0);
        return;
    }

    const total = jsonData.length;
    const batchSize = 500;


    for (let i = 0; i < total; i += batchSize) {
        const chunk = jsonData.slice(i, i + batchSize);

        await database.withTransactionAsync(async () => {
            for (const row of chunk) {
                const columns = Object.keys(row);
                const values = Object.values(row);

                const placeholders = columns.map(() => '?').join(', ');
                const columnNames = columns.map(c => `"${c}"`).join(', ');

                const query = `INSERT OR REPLACE INTO "${tableName}" (${columnNames}) VALUES (${placeholders});`;

                await database.runAsync(query, values);
            }
        });

        const currentSaved = Math.min(i + batchSize, total);
        onProgress?.(currentSaved, total);
    }
}