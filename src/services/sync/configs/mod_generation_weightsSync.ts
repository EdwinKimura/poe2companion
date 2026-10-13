import TABLE_MOD_GENERATION_WEIGHTS from '../../wiki/tables/ModGenerationWeightsTable';
import type { SyncDataset } from '../syncData';

const MOD_GENERATION_WEIGHTS_SYNC: SyncDataset = {
    dataset: 'mod_generation_weights',
    databaseTable: 'mod_generation_weights',
    cargo: TABLE_MOD_GENERATION_WEIGHTS,
};

export default MOD_GENERATION_WEIGHTS_SYNC;
