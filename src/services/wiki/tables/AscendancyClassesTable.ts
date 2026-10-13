import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'ascendancy_classes._ID=id',
    'ascendancy_classes._pageID=_pageID',
    'ascendancy_classes._pageName=_pageName',
    'ascendancy_classes.character_class',
    'ascendancy_classes.character_id',
    'ascendancy_classes.flavour_text',
    'ascendancy_classes.id=cargo_id',
    'ascendancy_classes.name',
] as const;

const TABLE_ASCENDANCY_CLASSES : CargoTable = {
    table: 'ascendancy_classes',
    fields: FIELDS,
};

export default TABLE_ASCENDANCY_CLASSES;
