import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'versions._ID=id',
    'versions._pageID=pageID',
    'versions._pageName=pageName',
    'versions.after',
    'versions.major_part',
    'versions.minor_part',
    'versions.patch_part',
    'versions.previous',
    'versions.release_date',
    'versions.revision_part',
    'versions.version',
] as const;

const TABLE_VERSIONS : CargoTable = {
    table: 'versions',
    fields: FIELDS,
};

export default TABLE_VERSIONS;
