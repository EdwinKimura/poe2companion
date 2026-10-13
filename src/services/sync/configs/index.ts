import VERSIONS_SYNC from './versionsSync';
import ITEMS_SYNC from './itemsSync';
import ITEM_STATS_SYNC from './item_statsSync';
import ITEM_MODS_SYNC from './item_modsSync';
import MAPS_SYNC from './mapsSync';
import MAP_SERIES_SYNC from './map_seriesSync';
import MODS_SYNC from './modsSync';
import MOD_STATS_SYNC from './mod_statsSync';
import MOD_SPAWN_WEIGHTS_SYNC from './mod_spawn_weightsSync';
import MOD_GENERATION_WEIGHTS_SYNC from './mod_generation_weightsSync';
import MOD_SELL_PRICES_SYNC from './mod_sell_pricesSync';
import ITEM_SELL_PRICES_SYNC from './item_sell_pricesSync';
import ACQUISITION_RECIPES_SYNC from './acquisition_recipesSync';
import ACQUISITION_RECIPE_PARTS_SYNC from './acquisition_recipe_partsSync';
import VENDOR_REWARDS_SYNC from './vendor_rewardsSync';
import STACKABLES_SYNC from './stackablesSync';
import SHIELDS_SYNC from './shieldsSync';
import QUEST_REWARDS_SYNC from './quest_rewardsSync';
import ITEM_BUFFS_SYNC from './item_buffsSync';
import HIDEOUT_DOODADS_SYNC from './hideout_doodadsSync';
import FLASKS_SYNC from './flasksSync';
import ESSENCES_SYNC from './essencesSync';
import COSMETIC_ITEMS_SYNC from './cosmetic_itemsSync';
import ATLAS_MAPS_SYNC from './atlas_mapsSync';
import ATLAS_CONNECTIONS_SYNC from './atlas_connectionsSync';
import SKILL_SYNC from './skillSync';
import SKILL_STATS_PER_LEVEL_SYNC from './skill_stats_per_levelSync';
import SKILL_LEVELS_SYNC from './skill_levelsSync';
import ASCENDANCY_CLASSES_SYNC from './ascendancy_classesSync';
import MONSTERS_SYNC from './monstersSync';
import MONSTER_TYPES_SYNC from './monster_typesSync';
import MONSTER_RESISTANCES_SYNC from './monster_resistancesSync';
import MONSTER_MAP_MULTIPLIERS_SYNC from './monster_map_multipliersSync';
import SKKIASTESTDICTIONARY_SYNC from './skkiastestdictionarySync';
import EVENTS_SYNC from './eventsSync';
import LEGACY_VARIANTS_SYNC from './legacy_variantsSync';
import ARMOURS_SYNC from './armoursSync';
import WEAPONS_SYNC from './weaponsSync';
import SKILL_GEMS_SYNC from './skill_gemsSync';
import LIQUID_EMOTIONS_SYNC from './liquid_emotionsSync';
import MAP_FRAGMENTS_SYNC from './map_fragmentsSync';
import JEWELS_SYNC from './jewelsSync';
import INHERENT_SKILLS_SYNC from './inherent_skillsSync';
import AREAS_SYNC from './areasSync';
import GUIDES_SYNC from './guidesSync';
import PASSIVE_SKILL_STATS_SYNC from './passive_skill_statsSync';
import AUGMENTS_SYNC from './augmentsSync';
import PASSIVE_SKILLS_SYNC from './passive_skillsSync';

const SYNC_DATASETS = [
    VERSIONS_SYNC,
    ITEMS_SYNC,
    ITEM_STATS_SYNC,
    ITEM_MODS_SYNC,
    MAPS_SYNC,
    MAP_SERIES_SYNC,
    MODS_SYNC,
    MOD_STATS_SYNC,
    MOD_SPAWN_WEIGHTS_SYNC,
    MOD_GENERATION_WEIGHTS_SYNC,
    MOD_SELL_PRICES_SYNC,
    ITEM_SELL_PRICES_SYNC,
    ACQUISITION_RECIPES_SYNC,
    ACQUISITION_RECIPE_PARTS_SYNC,
    VENDOR_REWARDS_SYNC,
    STACKABLES_SYNC,
    SHIELDS_SYNC,
    QUEST_REWARDS_SYNC,
    ITEM_BUFFS_SYNC,
    HIDEOUT_DOODADS_SYNC,
    FLASKS_SYNC,
    ESSENCES_SYNC,
    COSMETIC_ITEMS_SYNC,
    ATLAS_MAPS_SYNC,
    ATLAS_CONNECTIONS_SYNC,
    SKILL_SYNC,
    SKILL_STATS_PER_LEVEL_SYNC,
    SKILL_LEVELS_SYNC,
    ASCENDANCY_CLASSES_SYNC,
    MONSTERS_SYNC,
    MONSTER_TYPES_SYNC,
    MONSTER_RESISTANCES_SYNC,
    MONSTER_MAP_MULTIPLIERS_SYNC,
    SKKIASTESTDICTIONARY_SYNC,
    EVENTS_SYNC,
    LEGACY_VARIANTS_SYNC,
    ARMOURS_SYNC,
    WEAPONS_SYNC,
    SKILL_GEMS_SYNC,
    LIQUID_EMOTIONS_SYNC,
    MAP_FRAGMENTS_SYNC,
    JEWELS_SYNC,
    INHERENT_SKILLS_SYNC,
    AREAS_SYNC,
    GUIDES_SYNC,
    PASSIVE_SKILL_STATS_SYNC,
    AUGMENTS_SYNC,
    PASSIVE_SKILLS_SYNC,
] as const;

export default SYNC_DATASETS;
