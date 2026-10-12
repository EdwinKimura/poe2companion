import { CargoTable } from './types/table.type';

const API_URL = 'https://www.poe2wiki.net/w/api.php';
const BATCH_SIZE = 500;

export type CargoRow = Record<string, unknown>;

interface CargoResponse {
    cargoquery?: Array<{ title: CargoRow }>;
    'continue'?: string;
    error?: {
        code: string;
        info: string;
    };
}

export async function fetchAllCargoData(
    config: CargoTable,
    onBatch: (rows: CargoRow[], totalFetched: number) => Promise<void>,
): Promise<number> {
    let offset = 0;

    while (true) {
        const params = new URLSearchParams({
            action: 'cargoquery',
            format: 'json',
            tables: config.table,
            fields: config.fields.join(','),
            limit: String(BATCH_SIZE),
            offset: String(offset),
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status} ao consultar a wiki.`);
        }

        const data = (await response.json()) as CargoResponse;
        if (data.error) {
            throw new Error(`Cargo Query (${data.error.code}): ${data.error.info}`);
        }

        const batch = (data.cargoquery ?? []).map((row) => row.title);
        if (batch.length === 0) {
            break;
        }

        offset += batch.length;

        await onBatch(batch, offset);

        if (batch.length < BATCH_SIZE) {
            break;
        }
    }

    return offset;
}