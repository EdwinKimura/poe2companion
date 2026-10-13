import TABLE_MOD_STATS from '../../wiki/tables/ModStatsTable';
import type { SyncDataset } from '../syncData';

const MOD_STATS_SYNC: SyncDataset = {
    dataset: 'mod_stats',
    databaseTable: 'mod_stats',
    cargo: TABLE_MOD_STATS,
};

export default MOD_STATS_SYNC;
