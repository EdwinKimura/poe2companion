import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'mod_generation_weights._ID=id',
    'mod_generation_weights._pageID=pageID',
    'mod_generation_weights._pageName=pageName',
    'mod_generation_weights.ordinal',
    'mod_generation_weights.value',
    'mod_generation_weights.tag',
] as const;

const TABLE_MOD_GENERATION_WEIGHTS : CargoTable = {
    table: 'mod_generation_weights',
    fields: FIELDS,
};

export default TABLE_MOD_GENERATION_WEIGHTS;
