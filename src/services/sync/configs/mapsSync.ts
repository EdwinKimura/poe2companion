import TABLE_MAPS from '../../wiki/tables/MapsTable';
import type { SyncDataset } from '../syncData';

const MAPS_SYNC: SyncDataset = {
    dataset: 'maps',
    databaseTable: 'maps',
    cargo: TABLE_MAPS,
};

export default MAPS_SYNC;
