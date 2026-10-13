import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'mod_spawn_weights._ID=id',
    'mod_spawn_weights._pageID=pageID',
    'mod_spawn_weights._pageName=pageName',
    'mod_spawn_weights.ordinal',
    'mod_spawn_weights.value',
    'mod_spawn_weights.tag',
] as const;

const TABLE_MOD_SPAWN_WEIGHTS : CargoTable = {
    table: 'mod_spawn_weights',
    fields: FIELDS,
};

export default TABLE_MOD_SPAWN_WEIGHTS;
