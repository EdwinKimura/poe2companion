import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'skill._ID=id',
    'skill._pageID=pageID',
    'skill._pageName=pageName',
    'skill.active_skill_name',
    'skill.cast_time',
    'skill.description',
    'skill.html',
    'skill.item_class_id_restriction',
    'skill.item_class_restriction',
    'skill.max_level',
    'skill.projectile_speed',
    'skill.radius',
    'skill.radius_description',
    'skill.radius_secondary',
    'skill.radius_secondary_description',
    'skill.radius_tertiary',
    'skill.radius_tertiary_description',
    'skill.skill_icon',
    'skill.skill_id',
    'skill.skill_screenshot',
    'skill.stat_text',
] as const;

const TABLE_SKILL : CargoTable = {
    table: 'skill',
    fields: FIELDS,
};

export default TABLE_SKILL;
