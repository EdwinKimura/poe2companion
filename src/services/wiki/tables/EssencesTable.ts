import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'essences._ID=id',
    'essences._pageID=_pageID',
    'essences._pageName=_pageName',
    'essences.category',
    'essences.level',
    'essences.level_restriction',
    'essences.type',
] as const;

const TABLE_ESSENCES : CargoTable = {
    table: 'essences',
    fields: FIELDS,
};

export default TABLE_ESSENCES;
