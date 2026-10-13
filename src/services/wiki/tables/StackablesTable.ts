import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'stackables._ID=id',
    'stackables._pageID=_pageID',
    'stackables._pageName=_pageName',
    'stackables.stack_size',
    'stackables.stack_size_currency_tab',
] as const;

const TABLE_STACKABLES : CargoTable = {
    table: 'stackables',
    fields: FIELDS,
};

export default TABLE_STACKABLES;
