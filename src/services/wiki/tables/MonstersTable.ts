import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'monsters._ID=id',
    'monsters._pageID=pageID',
    'monsters._pageName=pageName',
    'monsters.attack_speed',
    'monsters.critical_strike_chance',
    'monsters.damage_multiplier',
    'monsters.endgame_mod_ids',
    'monsters.experience_multiplier',
    'monsters.health_multiplier',
    'monsters.is_boss',
    'monsters.maximum_attack_distance',
    'monsters.metadata_id',
    'monsters.minimum_attack_distance',
    'monsters.mod_ids',
    'monsters.model_size_multiplier',
    'monsters.monster_type_id',
    'monsters.name',
    'monsters.part1_mod_ids',
    'monsters.part2_mod_ids',
    'monsters.rarity',
    'monsters.rarity_id',
    'monsters.size',
    'monsters.skill_ids',
    'monsters.tags',
] as const;

const TABLE_MONSTERS : CargoTable = {
    table: 'monsters',
    fields: FIELDS,
};

export default TABLE_MONSTERS;
