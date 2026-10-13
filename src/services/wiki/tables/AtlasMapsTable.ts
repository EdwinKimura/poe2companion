import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'atlas_maps._ID=id',
    'atlas_maps._pageID=_pageID',
    'atlas_maps._pageName=_pageName',
    'atlas_maps.map_tier0',
    'atlas_maps.map_tier1',
    'atlas_maps.map_tier2',
    'atlas_maps.map_tier3',
    'atlas_maps.map_tier4',
    'atlas_maps.region_id',
    'atlas_maps.region_minimum',
    'atlas_maps.x',
    'atlas_maps.x0',
    'atlas_maps.x1',
    'atlas_maps.x2',
    'atlas_maps.x3',
    'atlas_maps.x4',
    'atlas_maps.y',
    'atlas_maps.y0',
    'atlas_maps.y1',
    'atlas_maps.y2',
    'atlas_maps.y3',
    'atlas_maps.y4',
] as const;

const TABLE_ATLAS_MAPS : CargoTable = {
    table: 'atlas_maps',
    fields: FIELDS,
};

export default TABLE_ATLAS_MAPS;
