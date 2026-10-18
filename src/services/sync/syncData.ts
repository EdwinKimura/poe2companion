import { traceSqlite } from '@/database/debug/sqliteTrace';
import { getDatabase } from '../../database/database';
import { getDatasetCount, saveDataset } from '../../database/repositories/DataRepository';
import { fetchAllCargoData, type CargoRow } from '../wiki/cargoData';
import type { CargoTable } from '../wiki/types/table.type';

export interface SyncDataset {
    /** Chave única usada em sync_state. */
    dataset: string;
    /** Nome da tabela física no SQLite. */
    databaseTable: string;
    /** Configuração da consulta Cargo na Wiki. */
    cargo: CargoTable;
}

let syncing = false;
let batchActive = false;
let datasetActive = false;
const syncStatusListeners = new Set<(isSyncing: boolean) => void>();

const SQLITE_WRITE_MAX_ATTEMPTS = 6;

function isSqliteLocked(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error);
    return /database is locked|database table is locked|SQLITE_BUSY|SQLITE_LOCKED/i.test(message);
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Executa escritas de estado com retry se o SQLite estiver temporariamente ocupado. */
async function runStateWrite(
    database: Awaited<ReturnType<typeof getDatabase>>,
    sql: string,
    ...params: (string | number | null)[]
): Promise<void> {
    for (let attempt = 0; ; attempt++) {
        try {
            await database.runAsync(sql, ...params);
            return;
        } catch (error) {
            if (!isSqliteLocked(error) || attempt >= SQLITE_WRITE_MAX_ATTEMPTS - 1) {
                console.error('[Sync] Falha ao gravar estado SQLite:', {
                    attempt: attempt + 1,
                    sql,
                    error,
                });
                throw error;
            }

            const delayMs = Math.min(1000 * 2 ** attempt, 15000);
            console.warn(
                `[Sync] SQLite ocupado ao atualizar sync_state; tentativa ${attempt + 2}/${SQLITE_WRITE_MAX_ATTEMPTS} em ${delayMs} ms.`,
            );
            await sleep(delayMs);
        }
    }
}

export function isSyncInProgress(): boolean {
    return syncing;
}

export function subscribeSyncStatus(
    listener: (isSyncing: boolean) => void,
): () => void {
    syncStatusListeners.add(listener);
    listener(syncing);
    return () => syncStatusListeners.delete(listener);
}

function setSyncing(value: boolean): void {
    if (syncing === value) return;
    syncing = value;
    syncStatusListeners.forEach((listener) => listener(value));
}

/**
 * Reserva o fluxo global ANTES de qualquer consulta SQLite feita por syncAllData.
 * Retorna false quando uma sincronização individual ou geral já está em andamento.
 */
export function beginSyncBatch(): boolean {
    if (syncing || batchActive || datasetActive) return false;
    batchActive = true;
    setSyncing(true);
    return true;
}

export function endSyncBatch(): void {
    batchActive = false;
    if (!datasetActive) setSyncing(false);
}

/** Executa um dataset dentro do lote exclusivo iniciado por beginSyncBatch. */
export async function syncDataWithinBatch(
    config: SyncDataset,
    onProgress?: (saved: number, totalFetched: number) => void,
): Promise<number> {

    if (!batchActive) {
        throw new Error('syncDataWithinBatch precisa ser chamado dentro de syncAllData.');
    }
    if (datasetActive) {
        throw new Error(`Já existe uma tabela em sincronização; não é possível iniciar "${config.dataset}" em paralelo.`);
    }

    datasetActive = true;
    try {
        return await runSync(config, onProgress);
    } finally {
        datasetActive = false;
        // O bloqueio global permanece ativo até endSyncBatch.
    }
}

/** Sincronização individual. Não pode competir com um lote geral. */
export async function syncData(
    config: SyncDataset,
    onProgress?: (saved: number, totalFetched: number) => void,
): Promise<number> {
    if (syncing || batchActive || datasetActive) {
        throw new Error(
            `Já existe uma sincronização em andamento; não é possível iniciar "${config.dataset}" em paralelo.`,
        );
    }

    datasetActive = true;
    setSyncing(true);
    try {
        return await runSync(config, onProgress);
    } finally {
        datasetActive = false;
        setSyncing(false);
    }
}

async function runSync(
    config: SyncDataset,
    onProgress?: (saved: number, totalFetched: number) => void,
): Promise<number> {
    const database = await getDatabase();
    const { dataset, databaseTable, cargo } = config;

    try {
        await runStateWrite(
            database,
            `INSERT INTO sync_state (dataset, status, record_count)
             VALUES (?, 'syncing', 0)
             ON CONFLICT(dataset) DO UPDATE SET status = 'syncing'`,
            dataset,
        );

        console.log(`[Sync] ${dataset}: estado atualizado; iniciando consulta Cargo.`);

        await new Promise((resolve) => setTimeout(resolve, 30));

        let savedCount = 0;
        const totalFetched = await fetchAllCargoData(
            cargo,
            async (batch: CargoRow[], fetched) => {
                console.log(`[Sync] ${dataset}: lote recebido com ${batch.length} registros.`);
                const saved = await saveDataset(database, databaseTable, batch);
                savedCount += saved;
                console.log(`[Sync] ${dataset}: total processado ${savedCount}`);
                onProgress?.(savedCount, fetched);
            },
        );

        await new Promise((resolve) => setTimeout(resolve, 30));

        const totalInDatabase = await getDatasetCount(database, databaseTable);
        
        await runStateWrite(
            database,
            `UPDATE sync_state
             SET status = 'completed', last_sync_at = ?, record_count = ?
             WHERE dataset = ?`,
            new Date().toISOString(),
            totalInDatabase,
            dataset,
        );

        console.log(`[Sync] ${dataset} concluída. Recebidos: ${totalFetched}; no banco: ${totalInDatabase}.`);
        return totalInDatabase;
    } catch (error) {
        try {
            await runStateWrite(
                database,
                `UPDATE sync_state SET status = 'failed' WHERE dataset = ?`,
                dataset,
            );
        } catch (statusError) {
            console.error(`[Sync] Não foi possível marcar "${dataset}" como failed:`, statusError);
        }
        console.error(`[Sync] Falha em "${dataset}":`, error);
        throw error;
    }
}
