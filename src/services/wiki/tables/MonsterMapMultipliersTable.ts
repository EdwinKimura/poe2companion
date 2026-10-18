import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'monster_map_multipliers._ID=id',
    'monster_map_multipliers._pageID=pageID',
    'monster_map_multipliers._pageName=pageName',
    'monster_map_multipliers.boss_damage',
    'monster_map_multipliers.boss_item_quantity',
    'monster_map_multipliers.boss_item_rarity',
    'monster_map_multipliers.boss_life',
    'monster_map_multipliers.damage',
    'monster_map_multipliers.level',
    'monster_map_multipliers.life',
] as const;

const TABLE_MONSTER_MAP_MULTIPLIERS : CargoTable = {
    table: 'monster_map_multipliers',
    fields: FIELDS,
};

export default TABLE_MONSTER_MAP_MULTIPLIERS;
