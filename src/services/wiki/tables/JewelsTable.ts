import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'jewels._ID=id',
    'jewels._pageID=pageID',
    'jewels._pageName=pageName',
    'jewels.jewel_limit',
    'jewels.radius_html',
] as const;

const TABLE_JEWELS : CargoTable = {
    table: 'jewels',
    fields: FIELDS,
};

export default TABLE_JEWELS;
