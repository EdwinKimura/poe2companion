import TABLE_JEWELS from '../../wiki/tables/JewelsTable';
import type { SyncDataset } from '../syncData';

const JEWELS_SYNC: SyncDataset = {
    dataset: 'jewels',
    databaseTable: 'jewels',
    cargo: TABLE_JEWELS,
};

export default JEWELS_SYNC;
