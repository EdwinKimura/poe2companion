import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'acquisition_recipe_parts._ID=id',
    'acquisition_recipe_parts._pageID=pageID',
    'acquisition_recipe_parts._pageName=pageName',
    'acquisition_recipe_parts.amount',
    'acquisition_recipe_parts.item_id',
    'acquisition_recipe_parts.item_name',
    'acquisition_recipe_parts.notes',
    'acquisition_recipe_parts.item_page',
    'acquisition_recipe_parts.part_id',
    'acquisition_recipe_parts.recipe_id',
] as const;

const TABLE_ACQUISITION_RECIPE_PARTS : CargoTable = {
    table: 'acquisition_recipe_parts',
    fields: FIELDS,
};

export default TABLE_ACQUISITION_RECIPE_PARTS;
