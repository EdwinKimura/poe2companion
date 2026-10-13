import TABLE_MAP_SERIES from '../../wiki/tables/MapSeriesTable';
import type { SyncDataset } from '../syncData';

const MAP_SERIES_SYNC: SyncDataset = {
    dataset: 'map_series',
    databaseTable: 'map_series',
    cargo: TABLE_MAP_SERIES,
};

export default MAP_SERIES_SYNC;
