import TABLE_SKILL from '../../wiki/tables/SkillTable';
import type { SyncDataset } from '../syncData';

const SKILL_SYNC: SyncDataset = {
    dataset: 'skill',
    databaseTable: 'skill',
    cargo: TABLE_SKILL,
};

export default SKILL_SYNC;
