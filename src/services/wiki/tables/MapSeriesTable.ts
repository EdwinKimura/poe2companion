import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'map_series._ID=id',
    'map_series._pageID=pageID',
    'map_series._pageName=pageName',
    'map_series.name',
    'map_series.ordinal',
    'map_series.id=cargo_id',
] as const;

const TABLE_MAP_SERIES : CargoTable = {
    table: 'map_series',
    fields: FIELDS,
};

export default TABLE_MAP_SERIES;
