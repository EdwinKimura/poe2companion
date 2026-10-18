import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'item_buffs._ID=id',
    'item_buffs._pageID=pageID',
    'item_buffs._pageName=pageName',
    'item_buffs.buff_values',
    'item_buffs.icon',
    'item_buffs.id=cargo_id',
    'item_buffs.stat_text',
] as const;

const TABLE_ITEM_BUFFS : CargoTable = {
    table: 'item_buffs',
    fields: FIELDS,
};

export default TABLE_ITEM_BUFFS;
