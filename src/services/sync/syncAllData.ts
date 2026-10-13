import { getDatabase } from '../../database/database';
import { getDatasetCount } from '../../database/repositories/DataRepository';
import SYNC_DATASETS from './configs';
import { syncData, type SyncDataset } from './syncData';

export interface SyncAllResult {
    synchronized: string[];
    skipped: string[];
}

/** Synchroniza datasets pendentes; force=true refaz todos. */
export async function syncAllData(
    options: { force?: boolean; onDatasetProgress?: (dataset: string, saved: number, totalFetched: number) => void } = {},
): Promise<SyncAllResult> {
    const database = await getDatabase();
    const synchronized: string[] = [];
    const skipped: string[] = [];

    for (const config of SYNC_DATASETS as readonly SyncDataset[]) {
        const state = await database.getFirstAsync<{ status: string; record_count: number }>(
            'SELECT status, record_count FROM sync_state WHERE dataset = ?', config.dataset,
        );
        const actualCount = await getDatasetCount(database, config.databaseTable);
        const needsSync = options.force === true || !state || state.status !== 'completed' || state.record_count !== actualCount;

        if (!needsSync) {
            skipped.push(config.dataset);
            console.log(`[Sync] ${config.dataset}: já está sincronizada (${actualCount}).`);
            continue;
        }

        console.log(`[Sync] ${config.dataset}: sincronização necessária.`);
        await syncData(config, (saved, totalFetched) => {
            options.onDatasetProgress?.(config.dataset, saved, totalFetched);
        });
        synchronized.push(config.dataset);
    }

    return { synchronized, skipped };
}
