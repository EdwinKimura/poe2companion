import TABLE_MONSTERS from '../../wiki/tables/MonstersTable';
import type { SyncDataset } from '../syncData';

const MONSTERS_SYNC: SyncDataset = {
    dataset: 'monsters',
    databaseTable: 'monsters',
    cargo: TABLE_MONSTERS,
};

export default MONSTERS_SYNC;
