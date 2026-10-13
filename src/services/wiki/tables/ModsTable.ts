import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'mods._ID=id',
    'mods._pageID=pageID',
    'mods._pageName=pageName',
    'mods.domain',
    'mods.generation_type',
    'mods.granted_buff_id',
    'mods.granted_buff_value',
    'mods.granted_skill',
    'mods.mod_groups',
    'mods.mod_type',
    'mods.name',
    'mods.required_level',
    'mods.stat_text',
    'mods.stat_text_raw',
    'mods.tags',
    'mods.tier_text',
    'mods.id=cargo_id',
] as const;

const TABLE_MODS : CargoTable = {
    table: 'mods',
    fields: FIELDS,
};

export default TABLE_MODS;
