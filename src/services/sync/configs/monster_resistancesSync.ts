import TABLE_MONSTER_RESISTANCES from '../../wiki/tables/MonsterResistancesTable';
import type { SyncDataset } from '../syncData';

const MONSTER_RESISTANCES_SYNC: SyncDataset = {
    dataset: 'monster_resistances',
    databaseTable: 'monster_resistances',
    cargo: TABLE_MONSTER_RESISTANCES,
};

export default MONSTER_RESISTANCES_SYNC;
