import TABLE_ATLAS_MAPS from '../../wiki/tables/AtlasMapsTable';
import type { SyncDataset } from '../syncData';

const ATLAS_MAPS_SYNC: SyncDataset = {
    dataset: 'atlas_maps',
    databaseTable: 'atlas_maps',
    cargo: TABLE_ATLAS_MAPS,
};

export default ATLAS_MAPS_SYNC;
