import TABLE_ACQUISITION_RECIPE_PARTS from '../../wiki/tables/AcquisitionRecipePartsTable';
import type { SyncDataset } from '../syncData';

const ACQUISITION_RECIPE_PARTS_SYNC: SyncDataset = {
    dataset: 'acquisition_recipe_parts',
    databaseTable: 'acquisition_recipe_parts',
    cargo: TABLE_ACQUISITION_RECIPE_PARTS,
};

export default ACQUISITION_RECIPE_PARTS_SYNC;
