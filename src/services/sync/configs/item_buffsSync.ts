import TABLE_ITEM_BUFFS from '../../wiki/tables/ItemBuffsTable';
import type { SyncDataset } from '../syncData';

const ITEM_BUFFS_SYNC: SyncDataset = {
    dataset: 'item_buffs',
    databaseTable: 'item_buffs',
    cargo: TABLE_ITEM_BUFFS,
};

export default ITEM_BUFFS_SYNC;
