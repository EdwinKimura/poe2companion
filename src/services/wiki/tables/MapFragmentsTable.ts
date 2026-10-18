import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'map_fragments._ID=id',
    'map_fragments._pageID=pageID',
    'map_fragments._pageName=pageName',
    'map_fragments.map_fragment_limit',
] as const;

const TABLE_MAP_FRAGMENTS : CargoTable = {
    table: 'map_fragments',
    fields: FIELDS,
};

export default TABLE_MAP_FRAGMENTS;
