import TABLE_LIQUID_EMOTIONS from '../../wiki/tables/LiquidEmotionsTable';
import type { SyncDataset } from '../syncData';

const LIQUID_EMOTIONS_SYNC: SyncDataset = {
    dataset: 'liquid_emotions',
    databaseTable: 'liquid_emotions',
    cargo: TABLE_LIQUID_EMOTIONS,
};

export default LIQUID_EMOTIONS_SYNC;
