import TABLE_INHERENT_SKILLS from '../../wiki/tables/InherentSkillsTable';
import type { SyncDataset } from '../syncData';

const INHERENT_SKILLS_SYNC: SyncDataset = {
    dataset: 'inherent_skills',
    databaseTable: 'inherent_skills',
    cargo: TABLE_INHERENT_SKILLS,
};

export default INHERENT_SKILLS_SYNC;
