
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

let activeSync: Promise<number> | null = null;
let syncing = false;
const syncStatusListeners = new Set<(isSyncing: boolean) => void>();

export function isSyncInProgress(): boolean {
    return syncing;
}

export function subscribeSyncStatus(
    listener: (isSyncing: boolean) => void,
): () => void {
    syncStatusListeners.add(listener);
    listener(syncing);

    return () => {
        syncStatusListeners.delete(listener);
    };
}

function setSyncing(value: boolean): void {
    syncing = value;
    syncStatusListeners.forEach((listener) => listener(value));
}

export function syncData(
    config: SyncDataset,
    onProgress?: (saved: number, totalFetched: number) => void,
): Promise<number> {
    if (activeSync) {
        console.log('[Sync] Já existe uma sincronização em andamento.');
        return activeSync;
    }

    setSyncing(true);
    const operation = runSync(config, onProgress);
    activeSync = operation;

    return operation.finally(() => {
        if (activeSync === operation) activeSync = null;
        setSyncing(false);
    });
}

async function runSync(
    config: SyncDataset,
    onProgress?: (saved: number, totalFetched: number) => void,
): Promise<number> {
    const database = await getDatabase();
    const { dataset, databaseTable, cargo } = config;

    await database.runAsync(
        `INSERT INTO sync_state (dataset, status, record_count)
         VALUES (?, 'syncing', 0)
         ON CONFLICT(dataset) DO UPDATE SET status = 'syncing'`,
        dataset,
    );

    let savedCount = 0;

    try {
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

        const totalInDatabase = await getDatasetCount(database, databaseTable);

        await database.runAsync(
            `UPDATE sync_state
             SET status = 'completed',
                 last_sync_at = ?,
                 record_count = ?
             WHERE dataset = ?`,
            new Date().toISOString(),
            totalInDatabase,
            dataset,
        );

        console.log(
            `[Sync] ${dataset} concluída. Recebidos: ${totalFetched}; no banco: ${totalInDatabase}.`,
        );

        return totalInDatabase;
    } catch (error) {
        await database.runAsync(
            `UPDATE sync_state SET status = 'failed' WHERE dataset = ?`,
            dataset,
        );
        throw error;
    }
}
