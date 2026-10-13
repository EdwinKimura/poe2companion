import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'item_mods._ID=id',
    'item_mods._pageID=pageID',
    'item_mods._pageName=pageName',
    'item_mods.is_explicit',
    'item_mods.is_implicit',
    'item_mods.is_map_fragment_bonus',
    'item_mods.is_random',
    'item_mods.text',
    'item_mods.id=cargo_id',
] as const;

const TABLE_ITEM_MODS : CargoTable = {
    table: 'item_mods',
    fields: FIELDS,
};

export default TABLE_ITEM_MODS;
