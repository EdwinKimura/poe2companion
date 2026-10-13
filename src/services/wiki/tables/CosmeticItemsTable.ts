import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'cosmetic_items._ID=id',
    'cosmetic_items._pageID=_pageID',
    'cosmetic_items._pageName=_pageName',
    'cosmetic_items.cosmetic_type',
    'cosmetic_items.target',
    'cosmetic_items.theme',
] as const;

const TABLE_COSMETIC_ITEMS : CargoTable = {
    table: 'cosmetic_items',
    fields: FIELDS,
};

export default TABLE_COSMETIC_ITEMS;
