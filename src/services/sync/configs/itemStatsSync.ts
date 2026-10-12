import TABLE_ITEM_STATS from '../../wiki/tables/ItemStatsTable';
import type { SyncDataset } from '../syncData';

const ITEM_STATS_SYNC: SyncDataset = {
    dataset: 'item_stats',
    databaseTable: 'item_stats',
    cargo: TABLE_ITEM_STATS,
};

export default ITEM_STATS_SYNC;
