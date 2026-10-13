import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'skill_gems._ID=id',
    'skill_gems._pageID=_pageID',
    'skill_gems._pageName=_pageName',
    'skill_gems.awakened_variant_id',
    'skill_gems.dexterity_percent',
    'skill_gems.gem_description',
    'skill_gems.gem_tags',
    'skill_gems.gem_tier',
    'skill_gems.intelligence_percent',
    'skill_gems.is_awakened_support_gem',
    'skill_gems.is_vaal_skill_gem',
    'skill_gems.primary_attribute',
    'skill_gems.strength_percent',
    'skill_gems.vaal_variant_id',
] as const;

const TABLE_SKILL_GEMS : CargoTable = {
    table: 'skill_gems',
    fields: FIELDS,
};

export default TABLE_SKILL_GEMS;
