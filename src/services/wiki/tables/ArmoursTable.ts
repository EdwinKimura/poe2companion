import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'armours._ID=id',
    'armours._pageID=pageID',
    'armours._pageName=pageName',
    'armours.armour_html',
    'armours.armour_max',
    'armours.armour_min',
    'armours.armour_range_average',
    'armours.armour_range_colour',
    'armours.armour_range_maximum',
    'armours.armour_range_minimum',
    'armours.armour_range_text',
    'armours.energy_shield_html',
    'armours.energy_shield_max',
    'armours.energy_shield_min',
    'armours.energy_shield_range_average',
    'armours.energy_shield_range_colour',
    'armours.energy_shield_range_maximum',
    'armours.energy_shield_range_minimum',
    'armours.energy_shield_range_text',
    'armours.evasion_html',
    'armours.evasion_max',
    'armours.evasion_min',
    'armours.evasion_range_average',
    'armours.evasion_range_colour',
    'armours.evasion_range_maximum',
    'armours.evasion_range_minimum',
    'armours.evasion_range_text',
    'armours.movement_speed',
    'armours.ward_html',
    'armours.ward_max',
    'armours.ward_min',
    'armours.ward_range_average',
    'armours.ward_range_colour',
    'armours.ward_range_maximum',
    'armours.ward_range_minimum',
    'armours.ward_range_text',
] as const;

const TABLE_ARMOURS : CargoTable = {
    table: 'armours',
    fields: FIELDS,
};

export default TABLE_ARMOURS;
