import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'skkiastestdictionary._ID=id',
    'skkiastestdictionary._pageID=_pageID',
    'skkiastestdictionary._pageName=_pageName',
    'skkiastestdictionary.Term',
    'skkiastestdictionary.Category',
    'skkiastestdictionary.Definition',
] as const;

const TABLE_SKKIASTESTDICTIONARY : CargoTable = {
    table: 'skkiastestdictionary',
    fields: FIELDS,
};

export default TABLE_SKKIASTESTDICTIONARY;
