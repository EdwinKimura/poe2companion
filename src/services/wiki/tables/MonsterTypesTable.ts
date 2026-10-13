import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'monster_types._ID=id',
    'monster_types._pageID=_pageID',
    'monster_types._pageName=_pageName',
    'monster_types.armour_multiplier',
    'monster_types.damage_spread',
    'monster_types.energy_shield_multiplier',
    'monster_types.evasion_multiplier',
    'monster_types.id=cargo_id',
    'monster_types.monster_resistance_id',
    'monster_types.tags',
] as const;

const TABLE_MONSTER_TYPES : CargoTable = {
    table: 'monster_types',
    fields: FIELDS,
};

export default TABLE_MONSTER_TYPES;
