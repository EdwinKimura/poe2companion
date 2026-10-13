import TABLE_ESSENCES from '../../wiki/tables/EssencesTable';
import type { SyncDataset } from '../syncData';

const ESSENCES_SYNC: SyncDataset = {
    dataset: 'essences',
    databaseTable: 'essences',
    cargo: TABLE_ESSENCES,
};

export default ESSENCES_SYNC;
