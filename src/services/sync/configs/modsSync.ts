import TABLE_MODS from '../../wiki/tables/ModsTable';
import type { SyncDataset } from '../syncData';

const MODS_SYNC: SyncDataset = {
    dataset: 'mods',
    databaseTable: 'mods',
    cargo: TABLE_MODS,
};

export default MODS_SYNC;
