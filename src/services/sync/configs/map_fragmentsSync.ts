import TABLE_MAP_FRAGMENTS from '../../wiki/tables/MapFragmentsTable';
import type { SyncDataset } from '../syncData';

const MAP_FRAGMENTS_SYNC: SyncDataset = {
    dataset: 'map_fragments',
    databaseTable: 'map_fragments',
    cargo: TABLE_MAP_FRAGMENTS,
};

export default MAP_FRAGMENTS_SYNC;
