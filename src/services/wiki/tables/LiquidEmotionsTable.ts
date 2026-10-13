import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'liquid_emotions._ID=id',
    'liquid_emotions._pageID=_pageID',
    'liquid_emotions._pageName=_pageName',
    'liquid_emotions.modifier',
    'liquid_emotions.stat_text',
    'liquid_emotions.tier',
] as const;

const TABLE_LIQUID_EMOTIONS : CargoTable = {
    table: 'liquid_emotions',
    fields: FIELDS,
};

export default TABLE_LIQUID_EMOTIONS;
