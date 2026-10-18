import type { CargoTable } from './types/table.type';

const API_URL = 'https://www.poe2wiki.net/w/api.php';
const BATCH_SIZE = 500;
const REQUEST_DELAY_MS = 1500;
const MAX_RETRIES = 5;
const MAX_BACKOFF_MS = 60_000;

export type CargoRow = Record<string, unknown>;

interface CargoResponse {
    cargoquery?: Array<{ title: CargoRow }>;
    'continue'?: string;
    error?: {
        code: string;
        info: string;
    };
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryAfterMs(response: Response): number {
    const value = response.headers.get('Retry-After');

    if (value) {
        const seconds = Number(value);
        if (Number.isFinite(seconds) && seconds >= 0) {
            return seconds * 1000;
        }

        const dateMs = Date.parse(value);
        if (!Number.isNaN(dateMs)) {
            return Math.max(0, dateMs - Date.now());
        }
    }

    // Sem Retry-After, aguarda no mínimo 5 segundos.
    return 5000;
}

async function fetchWithRetry(url: string): Promise<Response> {
    for (let attempt = 0; ; attempt++) {
        let response: Response;

        try {
            response = await fetch(url, {
                headers: {
                    // Substitua pelo site/contato real do projeto quando disponível.
                    'Api-User-Agent': 'PoE2Companion/1.0 (React Native app)',
                },
            });
        } catch (error) {
            if (attempt >= MAX_RETRIES) {
                throw error;
            }

            await sleep(Math.min(2000 * 2 ** attempt, MAX_BACKOFF_MS));
            continue;
        }

        if (response.status === 429 || response.status === 503) {
            if (attempt >= MAX_RETRIES) {
                throw new Error(
                    `A Wiki respondeu HTTP ${response.status} após ${MAX_RETRIES + 1} tentativas.`,
                );
            }

            const retryDelay = response.status === 429
                ? getRetryAfterMs(response)
                : Math.max(5000, getRetryAfterMs(response));

            // Pequeno jitter evita que novas tentativas coincidam exatamente.
            await sleep(retryDelay + Math.random() * 500);
            continue;
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status} ao consultar a Wiki.`);
        }

        return response;
    }
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

        const response = await fetchWithRetry(`${API_URL}?${params.toString()}`);
        const data = (await response.json()) as CargoResponse;

        if (data.error) {
            throw new Error(`Cargo Query (${data.error.code}): ${data.error.info}`);
        }

        const batch = (data.cargoquery ?? []).map((row) => row.title);
        if (batch.length === 0) {
            break;
        }

        offset += batch.length;

        // Salva cada lote antes de pedir o próximo.
        await onBatch(batch, offset);

        if (batch.length < BATCH_SIZE) {
            break;
        }

        // Espaça as requisições de todas as tabelas.
        await sleep(REQUEST_DELAY_MS);
    }

    return offset;
}
