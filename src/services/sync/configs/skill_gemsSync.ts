import TABLE_SKILL_GEMS from '../../wiki/tables/SkillGemsTable';
import type { SyncDataset } from '../syncData';

const SKILL_GEMS_SYNC: SyncDataset = {
    dataset: 'skill_gems',
    databaseTable: 'skill_gems',
    cargo: TABLE_SKILL_GEMS,
};

export default SKILL_GEMS_SYNC;
