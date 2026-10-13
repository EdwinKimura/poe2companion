import TABLE_FLASKS from '../../wiki/tables/FlasksTable';
import type { SyncDataset } from '../syncData';

const FLASKS_SYNC: SyncDataset = {
    dataset: 'flasks',
    databaseTable: 'flasks',
    cargo: TABLE_FLASKS,
};

export default FLASKS_SYNC;
