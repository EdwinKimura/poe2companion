import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'flasks._ID=id',
    'flasks._pageID=pageID',
    'flasks._pageName=pageName',
    'flasks.charges_max',
    'flasks.charges_max_html',
    'flasks.charges_max_range_average',
    'flasks.charges_max_range_colour',
    'flasks.charges_max_range_maximum',
    'flasks.charges_max_range_minimum',
    'flasks.charges_max_range_text',
    'flasks.charges_per_use',
    'flasks.charges_per_use_html',
    'flasks.charges_per_use_range_average',
    'flasks.charges_per_use_range_colour',
    'flasks.charges_per_use_range_maximum',
    'flasks.charges_per_use_range_minimum',
    'flasks.charges_per_use_range_text',
    'flasks.duration',
    'flasks.duration_html',
    'flasks.duration_range_average',
    'flasks.duration_range_colour',
    'flasks.duration_range_maximum',
    'flasks.duration_range_minimum',
    'flasks.duration_range_text',
    'flasks.life',
    'flasks.life_html',
    'flasks.life_range_average',
    'flasks.life_range_colour',
    'flasks.life_range_maximum',
    'flasks.life_range_minimum',
    'flasks.life_range_text',
    'flasks.mana',
    'flasks.mana_html',
    'flasks.mana_range_average',
    'flasks.mana_range_colour',
    'flasks.mana_range_maximum',
    'flasks.mana_range_minimum',
    'flasks.mana_range_text',
] as const;

const TABLE_FLASKS : CargoTable = {
    table: 'flasks',
    fields: FIELDS,
};

export default TABLE_FLASKS;
