import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'inherent_skills._ID=id',
    'inherent_skills._pageID=pageID',
    'inherent_skills._pageName=pageName',
    'inherent_skills.inherent_skills_ids',
    'inherent_skills.inherent_skills_text',
] as const;

const TABLE_INHERENT_SKILLS : CargoTable = {
    table: 'inherent_skills',
    fields: FIELDS,
};

export default TABLE_INHERENT_SKILLS;
