import TABLE_VERSIONS from '../../wiki/tables/VersionsTable';
import type { SyncDataset } from '../syncData';

const VERSIONS_SYNC: SyncDataset = {
    dataset: 'versions',
    databaseTable: 'versions',
    cargo: TABLE_VERSIONS,
};

export default VERSIONS_SYNC;
