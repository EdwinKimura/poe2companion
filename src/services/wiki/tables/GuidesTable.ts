import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'guides._ID=id',
    'guides._pageID=pageID',
    'guides._pageName=pageName',
    'guides.date',
    'guides.subject',
    'guides.version',
] as const;

const TABLE_GUIDES : CargoTable = {
    table: 'guides',
    fields: FIELDS,
};

export default TABLE_GUIDES;
