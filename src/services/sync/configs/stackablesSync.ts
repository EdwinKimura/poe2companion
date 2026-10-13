import TABLE_STACKABLES from '../../wiki/tables/StackablesTable';
import type { SyncDataset } from '../syncData';

const STACKABLES_SYNC: SyncDataset = {
    dataset: 'stackables',
    databaseTable: 'stackables',
    cargo: TABLE_STACKABLES,
};

export default STACKABLES_SYNC;
