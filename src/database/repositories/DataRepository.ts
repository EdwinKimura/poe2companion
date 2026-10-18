import {
    assertIdentifier,
    normalizeRow,
    normalizeValue
} from '@/database/handlers/normalizeHandler';
import type { SQLiteDatabase } from 'expo-sqlite';

export type DatabaseRow = Record<string, unknown>;


/**
 * Salva um lote em uma transação exclusiva. Se o SQLite estiver temporariamente
 * ocupado por outra operação, repete o lote inteiro após o rollback automático.
 * 
 * @param database 
 * @param databaseTable 
 * @param rows 
 * @returns 
 */
export async function saveDataset(
    database: SQLiteDatabase,
    databaseTable: string,
    rows: DatabaseRow[],
): Promise<number> {
    assertIdentifier(databaseTable, 'Nome da tabela');
    if (rows.length === 0) return 0;

    const normalizedRows = rows.map((row) => {
        const normalized = normalizeRow(row);
        for (const column of Object.keys(normalized)) {
            assertIdentifier(column, 'Nome da coluna');
        }
        return normalized;
    });


    const maxAttempts = 5;
    for (let attempt = 0; ; attempt++) {
        try {
            await database.withExclusiveTransactionAsync(async (transaction) => {

                for (const row of normalizedRows) {

                    const columns = Object.keys(row);
                    const columnSql = columns.map((column) => `"${column}"`).join(', ');
                    const placeholders = columns.map(() => '?').join(', ');
                    const updates = columns
                        .filter((column) => column !== 'id')
                        .map((column) => `"${column}" = excluded."${column}"`)
                        .join(', ');
                    const sql = updates
                        ? `INSERT INTO "${databaseTable}" (${columnSql}) VALUES (${placeholders}) ON CONFLICT("id") DO UPDATE SET ${updates};`
                        : `INSERT INTO "${databaseTable}" (${columnSql}) VALUES (${placeholders}) ON CONFLICT("id") DO NOTHING;`;
                    const values = columns.map((column) => normalizeValue(row[column]));
                    await transaction.runAsync(sql, ...values);

                }

            });

            return normalizedRows.length;

        } catch (error) {

            const message = error instanceof Error ? error.message : String(error);
            const isLocked = /database is locked|database table is locked|SQLITE_BUSY|SQLITE_LOCKED/i.test(message);

            if (!isLocked || attempt >= maxAttempts - 1) {
                throw error;
            }

            const delayMs = Math.min(500 * 2 ** attempt, 8000);
            console.warn(
                `[SQLite] Banco ocupado ao salvar ${databaseTable}; tentativa ${attempt + 2}/${maxAttempts} em ${delayMs} ms.`,
            );
            await new Promise<void>((resolve) => setTimeout(resolve, delayMs));

        }
    }
}

/** 
 * 
 * Faz Contagem dos dados de uma tabela
 * 
 * @param database 
 * @param databaseTable 
 * @returns 
 */
export async function getDatasetCount(
    database: SQLiteDatabase,
    databaseTable: string,
): Promise<number> {
    assertIdentifier(databaseTable, 'Nome da tabela');

    const result = await database.getFirstAsync<{ total: number }>(
        `SELECT COUNT(*) AS total FROM "${databaseTable}"`,
    );

    return result?.total ?? 0;
}
