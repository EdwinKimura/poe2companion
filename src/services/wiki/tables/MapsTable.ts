import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'maps._ID=id',
    'maps._pageID=pageID',
    'maps._pageName=pageName',
    'maps.area_id',
    'maps.area_level',
    'maps.guild_character',
    'maps.series',
    'maps.tier',
    'maps.unique_area_id',
    'maps.unique_area_level',
    'maps.unique_guild_character',
] as const;

const TABLE_MAPS : CargoTable = {
    table: 'maps',
    fields: FIELDS,
};

export default TABLE_MAPS;
