import TABLE_MOD_SPAWN_WEIGHTS from '../../wiki/tables/ModSpawnWeightsTable';
import type { SyncDataset } from '../syncData';

const MOD_SPAWN_WEIGHTS_SYNC: SyncDataset = {
    dataset: 'mod_spawn_weights',
    databaseTable: 'mod_spawn_weights',
    cargo: TABLE_MOD_SPAWN_WEIGHTS,
};

export default MOD_SPAWN_WEIGHTS_SYNC;
