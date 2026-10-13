import TABLE_MONSTER_MAP_MULTIPLIERS from '../../wiki/tables/MonsterMapMultipliersTable';
import type { SyncDataset } from '../syncData';

const MONSTER_MAP_MULTIPLIERS_SYNC: SyncDataset = {
    dataset: 'monster_map_multipliers',
    databaseTable: 'monster_map_multipliers',
    cargo: TABLE_MONSTER_MAP_MULTIPLIERS,
};

export default MONSTER_MAP_MULTIPLIERS_SYNC;
