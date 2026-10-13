import TABLE_PASSIVE_SKILL_STATS from '../../wiki/tables/PassiveSkillStatsTable';
import type { SyncDataset } from '../syncData';

const PASSIVE_SKILL_STATS_SYNC: SyncDataset = {
    dataset: 'passive_skill_stats',
    databaseTable: 'passive_skill_stats',
    cargo: TABLE_PASSIVE_SKILL_STATS,
};

export default PASSIVE_SKILL_STATS_SYNC;
