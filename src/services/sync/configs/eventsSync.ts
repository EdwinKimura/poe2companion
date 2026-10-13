import TABLE_EVENTS from '../../wiki/tables/EventsTable';
import type { SyncDataset } from '../syncData';

const EVENTS_SYNC: SyncDataset = {
    dataset: 'events',
    databaseTable: 'events',
    cargo: TABLE_EVENTS,
};

export default EVENTS_SYNC;
