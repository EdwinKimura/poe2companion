import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'skill_stats_per_level._ID=id',
    'skill_stats_per_level._pageID=pageID',
    'skill_stats_per_level._pageName=pageName',
    'skill_stats_per_level.id=cargo_id',
    'skill_stats_per_level.level',
    'skill_stats_per_level.value',
] as const;

const TABLE_SKILL_STATS_PER_LEVEL : CargoTable = {
    table: 'skill_stats_per_level',
    fields: FIELDS,
};

export default TABLE_SKILL_STATS_PER_LEVEL;
