import TABLE_SKILL_STATS_PER_LEVEL from '../../wiki/tables/SkillStatsPerLevelTable';
import type { SyncDataset } from '../syncData';

const SKILL_STATS_PER_LEVEL_SYNC: SyncDataset = {
    dataset: 'skill_stats_per_level',
    databaseTable: 'skill_stats_per_level',
    cargo: TABLE_SKILL_STATS_PER_LEVEL,
};

export default SKILL_STATS_PER_LEVEL_SYNC;
