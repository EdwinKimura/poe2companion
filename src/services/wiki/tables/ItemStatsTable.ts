import { CargoTable } from '../types/table.type';

const FIELDS = [
    'item_stats._ID=id',
    'item_stats._pageID=pageID',
    'item_stats._pageName=pageName',
    'item_stats.avg',
    'item_stats.max',
    'item_stats.min',
    'item_stats.mod_id',
    'item_stats.id=cargo_id',
] as const;

const TABLE_ITEM_STATS: CargoTable = {
    table: 'item_stats',
    fields: FIELDS
}

export default TABLE_ITEM_STATS;