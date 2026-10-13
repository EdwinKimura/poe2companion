import TABLE_PASSIVE_SKILLS from '../../wiki/tables/PassiveSkillsTable';
import type { SyncDataset } from '../syncData';

const PASSIVE_SKILLS_SYNC: SyncDataset = {
    dataset: 'passive_skills',
    databaseTable: 'passive_skills',
    cargo: TABLE_PASSIVE_SKILLS,
};

export default PASSIVE_SKILLS_SYNC;
