import TABLE_SKILL_LEVELS from '../../wiki/tables/SkillLevelsTable';
import type { SyncDataset } from '../syncData';

const SKILL_LEVELS_SYNC: SyncDataset = {
    dataset: 'skill_levels',
    databaseTable: 'skill_levels',
    cargo: TABLE_SKILL_LEVELS,
};

export default SKILL_LEVELS_SYNC;
