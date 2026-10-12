import TABLE_ITEMS from '../../wiki/tables/ItemsTable';
import type { SyncDataset } from '../syncData';

const ITEMS_SYNC: SyncDataset = {
    dataset: 'items',
    databaseTable: 'items',
    cargo: TABLE_ITEMS,
};

export default ITEMS_SYNC;
