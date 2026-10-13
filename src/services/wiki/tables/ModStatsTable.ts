import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'mod_stats._ID=id',
    'mod_stats._pageID=pageID',
    'mod_stats._pageName=pageName',
    'mod_stats.max',
    'mod_stats.min',
    'mod_stats.id=cargo_id',
] as const;

const TABLE_MOD_STATS : CargoTable = {
    table: 'mod_stats',
    fields: FIELDS,
};

export default TABLE_MOD_STATS;
