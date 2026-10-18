import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'SkkiasTestDictionary._ID=id',
    'SkkiasTestDictionary._pageID=pageID',
    'SkkiasTestDictionary._pageName=pageName',
    'SkkiasTestDictionary.Term',
    'SkkiasTestDictionary.Category',
    'SkkiasTestDictionary.Definition',
] as const;

const TABLE_SKKIASTESTDICTIONARY : CargoTable = {
    table: 'SkkiasTestDictionary',
    fields: FIELDS,
};

export default TABLE_SKKIASTESTDICTIONARY;
