import TABLE_AREAS from '../../wiki/tables/AreasTable';
import type { SyncDataset } from '../syncData';

const AREAS_SYNC: SyncDataset = {
    dataset: 'areas',
    databaseTable: 'areas',
    cargo: TABLE_AREAS,
};

export default AREAS_SYNC;
