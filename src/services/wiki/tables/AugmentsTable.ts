import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'augments._ID=id',
    'augments._pageID=_pageID',
    'augments._pageName=_pageName',
    'augments.augment_limit',
    'augments.stat_text',
    'augments.stat_text_bonded',
    'augments.type_id',
    'augments.type_name',
] as const;

const TABLE_AUGMENTS : CargoTable = {
    table: 'augments',
    fields: FIELDS,
};

export default TABLE_AUGMENTS;
