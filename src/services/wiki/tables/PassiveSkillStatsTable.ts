import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'passive_skill_stats._ID=id',
    'passive_skill_stats._pageID=_pageID',
    'passive_skill_stats._pageName=_pageName',
    'passive_skill_stats.id=cargo_id',
    'passive_skill_stats.value',
] as const;

const TABLE_PASSIVE_SKILL_STATS : CargoTable = {
    table: 'passive_skill_stats',
    fields: FIELDS,
};

export default TABLE_PASSIVE_SKILL_STATS;
