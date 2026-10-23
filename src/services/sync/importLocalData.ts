import { getDatabase } from '@/database/database';
import { getAllDatabaseTables, getDatasetCount } from '@/database/repositories/DataRepository';
import { SEED_ASSETS } from '@/database/seeds';
import { SQLiteDatabase } from 'expo-sqlite';

export async function importLocalData(options?: {
    onDatasetProgress?: (dataset: string, saved: number, total: number) => void;
}) {
    const database = await getDatabase();
    const tables = await getAllDatabaseTables(database);
    const synchronized: string[] = [];

    for (const table of tables) { 
        if (table !== 'sync_state' && table !== 'app_metadata') {
            try {
                // Pega o array de arquivos daquela tabela (ex: [ [item1, item2], [item3, item4] ] se for dividida)
                const jsonParts = SEED_ASSETS[table];

                if (!jsonParts || !Array.isArray(jsonParts)) {
                    console.warn(`[Import] Nenhum seed encontrado para a tabela: ${table}`);
                    continue;
                }

                // Calcula o total geral de registros somando todas as partes divididas
                const totalRecords = jsonParts.reduce((acc, part) => acc + (Array.isArray(part) ? part.length : 0), 0);

                // Dispara o progresso inicial zerado
                options?.onDatasetProgress?.(table, 0, totalRecords);

                await insertJsonDataIntoTable(database, table, jsonParts, (saved, totalCount) => {
                    options?.onDatasetProgress?.(table, saved, totalCount);
                });

                synchronized.push(table);
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
    jsonParts: Record<string, any>[][], // Recebe a lista de arquivos (partes)
    onProgress?: (saved: number, total: number) => void
): Promise<void> {
    if (!jsonParts || jsonParts.length === 0) {
        onProgress?.(0, 0);
        return;
    }

    const tableItemsCount = await getDatasetCount(database, tableName);

    // Calcula o total geral de itens em todas as partes combinadas
    const totalRecords = jsonParts.reduce((acc, part) => acc + (Array.isArray(part) ? part.length : 0), 0);
    let cumulativeSaved = 0;
    const batchSize = 500;

    if(tableItemsCount === totalRecords) return;
    
    // Itera por cada arquivo/parte da tabela (ex: items1_6.json, items2_6.json...)
    for (const partData of jsonParts) {
        if (!Array.isArray(partData) || partData.length === 0) continue;

        const partTotal = partData.length;

        // Itera em lotes (chunks) dentro de cada parte para não travar a UI
        for (let i = 0; i < partTotal; i += batchSize) {
            const chunk = partData.slice(i, i + batchSize);

            await database.withTransactionAsync(async () => {
                for (const row of chunk) {

                    const sanitizedRow: Record<string, any> = {};
                    for (const [key, value] of Object.entries(row)) {
                        const cleanKey = key.trim().replace(/[\s-]+/g, '_');
                        sanitizedRow[cleanKey] = value;
                    }

                    const columns = Object.keys(sanitizedRow);
                    const values = Object.values(sanitizedRow);

                    const placeholders = columns.map(() => '?').join(', ');
                    const columnNames = columns.map(c => `"${c}"`).join(', ');

                    const query = `INSERT OR REPLACE INTO "${tableName}" (${columnNames}) VALUES (${placeholders});`;
                    await database.runAsync(query, values);
                }
            });

            // Atualiza quantos itens da parte atual já foram salvos
            const partSaved = Math.min(i + batchSize, partTotal);
            cumulativeSaved = partData === jsonParts[jsonParts.length - 1] ? partSaved : cumulativeSaved + chunk.length;

            // Se for a última parte, garante que atinja o total exato
            const currentTotalSaved = Math.min(cumulativeSaved, totalRecords);

            // Reporta o progresso total acumulado para a interface
            onProgress?.(currentTotalSaved, totalRecords);

            // Pausa de 0ms para liberar a thread de UI e evitar travamentos (ANR) no mobile
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    }
}