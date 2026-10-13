import TABLE_MONSTER_TYPES from '../../wiki/tables/MonsterTypesTable';
import type { SyncDataset } from '../syncData';

const MONSTER_TYPES_SYNC: SyncDataset = {
    dataset: 'monster_types',
    databaseTable: 'monster_types',
    cargo: TABLE_MONSTER_TYPES,
};

export default MONSTER_TYPES_SYNC;
