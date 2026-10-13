import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'acquisition_recipes._ID=id',
    'acquisition_recipes._pageID=pageID',
    'acquisition_recipes._pageName=pageName',
    'acquisition_recipes.automatic',
    'acquisition_recipes.description',
    'acquisition_recipes.recipe_id',
    'acquisition_recipes.result_amount',
] as const;

const TABLE_ACQUISITION_RECIPES : CargoTable = {
    table: 'acquisition_recipes',
    fields: FIELDS,
};

export default TABLE_ACQUISITION_RECIPES;
