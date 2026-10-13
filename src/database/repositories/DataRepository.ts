import type { SQLiteDatabase } from 'expo-sqlite';
import * as he from 'he';

export type DatabaseRow = Record<string, unknown>;

function assertIdentifier(identifier: string, label: string): void {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)) {
        throw new Error(`${label} inválido: ${identifier}`);
    }
}

function toDatabaseColumn(key: string): string {
    return key.trim().replace(/[\s-]+/g, '_');
}

function normalizeValue(value: unknown): string | number | null {
    if (value == null) return null;

    if (typeof value === 'string') return he.decode(value);
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'number') return value;

    return JSON.stringify(value);
}

function normalizeRow(row: DatabaseRow): Record<string, unknown> {
    const normalized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(row)) {
        normalized[toDatabaseColumn(key)] = value;
    }

    if (normalized.id == null) {
        throw new Error('Registro Cargo sem identificador "id". Verifique o alias no campo Cargo.');
    }

    return normalized;
}

/**
 * Insere ou atualiza um lote em qualquer tabela SQLite compatível com os campos recebidos.
 * O nome da tabela deve ser uma constante definida pelo aplicativo, nunca entrada do usuário.
 */
export async function saveDataset(
    database: SQLiteDatabase,
    databaseTable: string,
    rows: DatabaseRow[],
): Promise<number> {
    assertIdentifier(databaseTable, 'Nome da tabela');

    if (rows.length === 0) return 0;

    let savedCount = 0;

    await database.withTransactionAsync(async () => {
        for (const row of rows) {
            const normalized = normalizeRow(row);
            const columns = Object.keys(normalized);

            for (const column of columns) {
                assertIdentifier(column, 'Nome da coluna');
            }

            const columnSql = columns.map((column) => `\"${column}\"`).join(', ');
            const placeholders = columns.map(() => '?').join(', ');
            const updates = columns
                .filter((column) => column !== 'id')
                .map((column) => `\"${column}\" = excluded.\"${column}\"`)
                .join(', ');

            const sql = updates
                ? `INSERT INTO \"${databaseTable}\" (${columnSql}) VALUES (${placeholders}) ON CONFLICT(\"id\") DO UPDATE SET ${updates};`
                : `INSERT INTO \"${databaseTable}\" (${columnSql}) VALUES (${placeholders}) ON CONFLICT(\"id\") DO NOTHING;`;

            const values = columns.map((column) => normalizeValue(normalized[column]));
            await database.runAsync(sql, ...values);
            savedCount++;
        }
    });

    return savedCount;
}

export async function getDatasetCount(
    database: SQLiteDatabase,
    databaseTable: string,
): Promise<number> {
    assertIdentifier(databaseTable, 'Nome da tabela');

    const result = await database.getFirstAsync<{ total: number }>(
        `SELECT COUNT(*) AS total FROM \"${databaseTable}\"`,
    );

    return result?.total ?? 0;
}
