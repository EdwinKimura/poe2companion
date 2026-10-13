import TABLE_ITEM_MODS from '../../wiki/tables/ItemModsTable';
import type { SyncDataset } from '../syncData';

const ITEM_MODS_SYNC: SyncDataset = {
    dataset: 'item_mods',
    databaseTable: 'item_mods',
    cargo: TABLE_ITEM_MODS,
};

export default ITEM_MODS_SYNC;
