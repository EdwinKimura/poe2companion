import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'shields._ID=id',
    'shields._pageID=pageID',
    'shields._pageName=pageName',
    'shields.block',
    'shields.block_html',
    'shields.block_range_average',
    'shields.block_range_colour',
    'shields.block_range_maximum',
    'shields.block_range_minimum',
    'shields.block_range_text',
] as const;

const TABLE_SHIELDS : CargoTable = {
    table: 'shields',
    fields: FIELDS,
};

export default TABLE_SHIELDS;
