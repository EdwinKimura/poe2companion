import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'skill_levels._ID=id',
    'skill_levels._pageID=pageID',
    'skill_levels._pageName=pageName',
    'skill_levels.attack_speed_multiplier',
    'skill_levels.attack_time',
    'skill_levels.cooldown',
    'skill_levels.cost_amounts',
    'skill_levels.cost_multiplier',
    'skill_levels.cost_types',
    'skill_levels.critical_strike_chance',
    'skill_levels.damage_effectiveness',
    'skill_levels.damage_multiplier',
    'skill_levels.dexterity_requirement',
    'skill_levels.duration',
    'skill_levels.experience',
    'skill_levels.intelligence_requirement',
    'skill_levels.level',
    'skill_levels.level_requirement',
    'skill_levels.life_reservation_flat',
    'skill_levels.life_reservation_percent',
    'skill_levels.mana_reservation_flat',
    'skill_levels.mana_reservation_percent',
    'skill_levels.spirit_reservation_flat',
    'skill_levels.stat_text',
    'skill_levels.stored_uses',
    'skill_levels.strength_requirement',
    'skill_levels.vaal_soul_gain_prevention_time',
    'skill_levels.vaal_souls_requirement',
    'skill_levels.vaal_stored_uses',
] as const;

const TABLE_SKILL_LEVELS : CargoTable = {
    table: 'skill_levels',
    fields: FIELDS,
};

export default TABLE_SKILL_LEVELS;
