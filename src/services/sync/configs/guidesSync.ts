import TABLE_GUIDES from '../../wiki/tables/GuidesTable';
import type { SyncDataset } from '../syncData';

const GUIDES_SYNC: SyncDataset = {
    dataset: 'guides',
    databaseTable: 'guides',
    cargo: TABLE_GUIDES,
};

export default GUIDES_SYNC;
