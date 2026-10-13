import TABLE_ACQUISITION_RECIPES from '../../wiki/tables/AcquisitionRecipesTable';
import type { SyncDataset } from '../syncData';

const ACQUISITION_RECIPES_SYNC: SyncDataset = {
    dataset: 'acquisition_recipes',
    databaseTable: 'acquisition_recipes',
    cargo: TABLE_ACQUISITION_RECIPES,
};

export default ACQUISITION_RECIPES_SYNC;
