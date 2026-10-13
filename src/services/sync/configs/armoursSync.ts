import TABLE_ARMOURS from '../../wiki/tables/ArmoursTable';
import type { SyncDataset } from '../syncData';

const ARMOURS_SYNC: SyncDataset = {
    dataset: 'armours',
    databaseTable: 'armours',
    cargo: TABLE_ARMOURS,
};

export default ARMOURS_SYNC;
