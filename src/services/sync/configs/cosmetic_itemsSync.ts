import TABLE_COSMETIC_ITEMS from '../../wiki/tables/CosmeticItemsTable';
import type { SyncDataset } from '../syncData';

const COSMETIC_ITEMS_SYNC: SyncDataset = {
    dataset: 'cosmetic_items',
    databaseTable: 'cosmetic_items',
    cargo: TABLE_COSMETIC_ITEMS,
};

export default COSMETIC_ITEMS_SYNC;
