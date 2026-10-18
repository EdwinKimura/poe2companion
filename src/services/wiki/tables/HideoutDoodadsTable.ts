import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'hideout_doodads._ID=id',
    'hideout_doodads._pageID=pageID',
    'hideout_doodads._pageName=pageName',
    'hideout_doodads.is_master_doodad',
    'hideout_doodads.variation_count',
] as const;

const TABLE_HIDEOUT_DOODADS : CargoTable = {
    table: 'hideout_doodads',
    fields: FIELDS,
};

export default TABLE_HIDEOUT_DOODADS;
