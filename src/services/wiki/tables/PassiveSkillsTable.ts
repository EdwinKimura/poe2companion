import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'passive_skills._ID=id',
    'passive_skills._pageID=pageID',
    'passive_skills._pageName=pageName',
    'passive_skills.ascendancy_class',
    'passive_skills.atlas_sub_tree',
    'passive_skills.buff_id',
    'passive_skills.connections',
    'passive_skills.flavour_text',
    'passive_skills.frame',
    'passive_skills.icon',
    'passive_skills.id=cargo_id',
    'passive_skills.int_id',
    'passive_skills.is_atlas_passive',
    'passive_skills.is_attribute',
    'passive_skills.is_free',
    'passive_skills.is_icon_only',
    'passive_skills.is_in_game',
    'passive_skills.is_jewel_socket',
    'passive_skills.is_keystone',
    'passive_skills.is_multiple_choice',
    'passive_skills.is_multiple_choice_option',
    'passive_skills.is_notable',
    'passive_skills.is_starting_node',
    'passive_skills.main_page',
    'passive_skills.name',
    'passive_skills.reminder_text',
    'passive_skills.skill_points',
    'passive_skills.stat_text',
    'passive_skills.stat_text_raw',
    'passive_skills.weapon_set_points',
] as const;

const TABLE_PASSIVE_SKILLS : CargoTable = {
    table: 'passive_skills',
    fields: FIELDS,
};

export default TABLE_PASSIVE_SKILLS;
