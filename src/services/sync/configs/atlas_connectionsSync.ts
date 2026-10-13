import TABLE_ATLAS_CONNECTIONS from '../../wiki/tables/AtlasConnectionsTable';
import type { SyncDataset } from '../syncData';

const ATLAS_CONNECTIONS_SYNC: SyncDataset = {
    dataset: 'atlas_connections',
    databaseTable: 'atlas_connections',
    cargo: TABLE_ATLAS_CONNECTIONS,
};

export default ATLAS_CONNECTIONS_SYNC;
