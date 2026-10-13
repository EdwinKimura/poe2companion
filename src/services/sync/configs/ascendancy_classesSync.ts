import TABLE_ASCENDANCY_CLASSES from '../../wiki/tables/AscendancyClassesTable';
import type { SyncDataset } from '../syncData';

const ASCENDANCY_CLASSES_SYNC: SyncDataset = {
    dataset: 'ascendancy_classes',
    databaseTable: 'ascendancy_classes',
    cargo: TABLE_ASCENDANCY_CLASSES,
};

export default ASCENDANCY_CLASSES_SYNC;
