import TABLE_WEAPONS from '../../wiki/tables/WeaponsTable';
import type { SyncDataset } from '../syncData';

const WEAPONS_SYNC: SyncDataset = {
    dataset: 'weapons',
    databaseTable: 'weapons',
    cargo: TABLE_WEAPONS,
};

export default WEAPONS_SYNC;
