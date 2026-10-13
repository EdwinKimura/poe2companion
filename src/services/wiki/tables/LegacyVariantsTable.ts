import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'legacy_variants._ID=id',
    'legacy_variants._pageID=_pageID',
    'legacy_variants._pageName=_pageName',
    'legacy_variants.removal_version',
    'legacy_variants.implicit_stat_text',
    'legacy_variants.explicit_stat_text',
    'legacy_variants.stat_text',
    'legacy_variants.base_item',
    'legacy_variants.required_level',
] as const;

const TABLE_LEGACY_VARIANTS : CargoTable = {
    table: 'legacy_variants',
    fields: FIELDS,
};

export default TABLE_LEGACY_VARIANTS;
