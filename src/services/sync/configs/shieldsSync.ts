import TABLE_SHIELDS from '../../wiki/tables/ShieldsTable';
import type { SyncDataset } from '../syncData';

const SHIELDS_SYNC: SyncDataset = {
    dataset: 'shields',
    databaseTable: 'shields',
    cargo: TABLE_SHIELDS,
};

export default SHIELDS_SYNC;
