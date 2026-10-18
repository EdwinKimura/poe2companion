import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'monster_resistances._ID=id',
    'monster_resistances._pageID=pageID',
    'monster_resistances._pageName=pageName',
    'monster_resistances.id=cargo_id',
    'monster_resistances.maps_chaos',
    'monster_resistances.maps_cold',
    'monster_resistances.maps_fire',
    'monster_resistances.maps_lightning',
    'monster_resistances.part1_chaos',
    'monster_resistances.part1_cold',
    'monster_resistances.part1_fire',
    'monster_resistances.part1_lightning',
    'monster_resistances.part2_chaos',
    'monster_resistances.part2_cold',
    'monster_resistances.part2_fire',
    'monster_resistances.part2_lightning',
] as const;

const TABLE_MONSTER_RESISTANCES : CargoTable = {
    table: 'monster_resistances',
    fields: FIELDS,
};

export default TABLE_MONSTER_RESISTANCES;
