import { getDatabase } from '../../database/database';
import { getDatasetCount } from '../../database/repositories/DataRepository';
import SYNC_DATASETS from './configs';
import {
    beginSyncBatch,
    endSyncBatch,
    syncDataWithinBatch,
    type SyncDataset,
} from './syncData';

export interface SyncAllResult {
    synchronized: string[];
    skipped: string[];
}

let activeSyncAll: Promise<SyncAllResult> | null = null;

/**
 * Sincroniza datasets pendentes; 
 * force=true refaz todos.
 * 
 * @param options 
 * @returns 
 */
export function syncAllData(
    options: {
        force?: boolean;
        onDatasetProgress?: (dataset: string, saved: number, totalFetched: number) => void;
    } = {},
): Promise<SyncAllResult> {

    // Reutiliza a mesma operação se o startup e o botão chamarem juntos.
    if (activeSyncAll) {
        console.log('[Sync] Sincronização geral já ativa; reutilizando a operação atual.');
        return activeSyncAll;
    }

    // Reserva o lock antes de executar qualquer SELECT/COUNT no SQLite.
    if (!beginSyncBatch()) {
        return Promise.reject(
            new Error('Já existe uma sincronização em andamento. Aguarde sua conclusão.'),
        );
    }

    const operation = runSyncAll(options);
    activeSyncAll = operation;

    return operation.finally(() => {
        if (activeSyncAll === operation) activeSyncAll = null;
        endSyncBatch();
    });
}


/**
 * Faz a sincronização em lote
 * 
 * @param options 
 * @returns 
 */
// async function runSyncAll(
//     options: {
//         force?: boolean;
//         onDatasetProgress?: (dataset: string, saved: number, totalFetched: number) => void;
//     },
// ): Promise<SyncAllResult> {
//     const database = await getDatabase();
//     const synchronized: string[] = [];
//     const skipped: string[] = [];

//     for (const config of SYNC_DATASETS as readonly SyncDataset[]) {
        
//         const state = await database.getFirstAsync<{
//             status: string;
//             record_count: number;
//         }>(
//             'SELECT status, record_count FROM sync_state WHERE dataset = ?',
//             config.dataset,
//         );

//         const actualCount = await getDatasetCount(database, config.databaseTable);
//         const needsSync = options.force === true || !state || state.status !== 'completed' || state.record_count !== actualCount;

//         if (!needsSync) {
//             skipped.push(config.dataset);
//             console.log(`[Sync] ${config.dataset}: já está sincronizada (${actualCount}).`);
//             continue;
//         }

//         console.log(`[Sync] ${config.dataset}: sincronização necessária.`);
//         await syncDataWithinBatch(config, (saved, totalFetched) => {
//             options.onDatasetProgress?.(config.dataset, saved, totalFetched);
//         });
//         synchronized.push(config.dataset);
//     }

//     return { synchronized, skipped };
// }
async function runSyncAll(
    options: {
        force?: boolean;
        onDatasetProgress?: (dataset: string, saved: number, totalFetched: number) => void;
    },
): Promise<SyncAllResult> {
    const database = await getDatabase();
    const synchronized: string[] = [];
    const skipped: string[] = [];
    
    // Array para guardar apenas as configurações que REALMENTE precisam rodar
    const datasetsParaSincronizar: SyncDataset[] = [];

    // --- PASSO 1: APENAS LEITURA (Descobre quem precisa de sync) ---
    for (const config of SYNC_DATASETS as readonly SyncDataset[]) {
        const state = await database.getFirstAsync<{
            status: string;
            record_count: number;
        }>(
            'SELECT status, record_count FROM sync_state WHERE dataset = ?',
            config.dataset,
        );

        const actualCount = await getDatasetCount(database, config.databaseTable);
        const needsSync = options.force === true || !state || state.status !== 'completed' || state.record_count !== actualCount;

        if (!needsSync) {
            skipped.push(config.dataset);
            console.log(`[Sync] ${config.dataset}: já está sincronizada (${actualCount}).`);
        } else {
            datasetsParaSincronizar.push(config);
        }
    }

    // AGUARDA A LIBERAÇÃO COMPLETA DAS THREADS NATIVAS DE LEITURA
    // Dá 50ms para o coletor nativo fechar os statements abertos acima.
    await new Promise((resolve) => setTimeout(resolve, 50));

    // --- PASSO 2: APENAS ESCRITA (Executa isolado, sem travar) ---
    for (const config of datasetsParaSincronizar) {
        console.log(`[Sync] ${config.dataset}: iniciando sincronização necessária.`);
        
        // Agora o banco está 100% livre de leituras anteriores
        await syncDataWithinBatch(config, (saved, totalFetched) => {
            options.onDatasetProgress?.(config.dataset, saved, totalFetched);
        });
        
        synchronized.push(config.dataset);
    }

    return { synchronized, skipped };
}
