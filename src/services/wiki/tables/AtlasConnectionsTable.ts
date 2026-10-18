import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'atlas_connections._ID=id',
    'atlas_connections._pageID=pageID',
    'atlas_connections._pageName=pageName',
    'atlas_connections.map1',
    'atlas_connections.map2',
    'atlas_connections.region0',
    'atlas_connections.region1',
    'atlas_connections.region2',
    'atlas_connections.region3',
    'atlas_connections.region4',
] as const;

const TABLE_ATLAS_CONNECTIONS : CargoTable = {
    table: 'atlas_connections',
    fields: FIELDS,
};

export default TABLE_ATLAS_CONNECTIONS;
