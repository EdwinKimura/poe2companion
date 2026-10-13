import TABLE_AUGMENTS from '../../wiki/tables/AugmentsTable';
import type { SyncDataset } from '../syncData';

const AUGMENTS_SYNC: SyncDataset = {
    dataset: 'augments',
    databaseTable: 'augments',
    cargo: TABLE_AUGMENTS,
};

export default AUGMENTS_SYNC;
