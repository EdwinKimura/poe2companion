
export const DATABASE_NAME = 'poe2-companion.db';

export const DATABASE_VERSION = 7;

export const INITIAL_SCHEMA = `
    CREATE TABLE IF NOT EXISTS app_metadata (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sync_state (
        dataset TEXT PRIMARY KEY NOT NULL,
        version TEXT,
        last_sync_at TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        record_count INTEGER NOT NULL DEFAULT 0
    );
`;

export const VERSION_SCHEMA = `
    CREATE TABLE IF NOT EXISTS versions (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        after TEXT,
        major_part INTEGER,
        minor_part INTEGER,
        patch_part INTEGER,
        previous TEXT,
        release_date TEXT,
        release_date__precision TEXT,
        revision_part TEXT,
        version TEXT
    );
`;

export const ITEM_SCHEMA = `
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        pageTitle TEXT,
        pageNamespace INTEGER,
        acquisition_tags TEXT,
        alternate_art_inventory_icons TEXT,
        base_item TEXT,
        base_item_id TEXT,
        base_item_page TEXT,
        cannot_be_traded_or_modified INTEGER,
        class TEXT,
        class_id TEXT,
        description TEXT,
        drop_areas TEXT,
        drop_areas_html TEXT,
        drop_enabled INTEGER,
        drop_level INTEGER,
        drop_level_maximum INTEGER,
        drop_monsters TEXT,
        drop_rarity_ids TEXT,
        drop_text TEXT,
        explicit_stat_text TEXT,
        flavour_text TEXT,
        frame_type TEXT,
        help_text TEXT,
        html TEXT,
        implicit_stat_text TEXT,
        influences TEXT,
        infobox_html TEXT,
        inventory_icon TEXT,
        is_account_bound INTEGER,
        is_corrupted INTEGER,
        is_drop_restricted INTEGER,
        is_eater_of_worlds_item INTEGER,
        is_fractured INTEGER,
        is_in_game INTEGER,
        is_replica INTEGER,
        is_searing_exarch_item INTEGER,
        is_synthesised INTEGER,
        is_unmodifiable INTEGER,
        is_veiled INTEGER,
        metabox_html TEXT,
        metadata_id TEXT,
        name TEXT,
        name_list TEXT,
        quality INTEGER,
        rarity TEXT,
        rarity_id TEXT,
        release_version TEXT,
        removal_version TEXT,
        required_dexterity INTEGER,
        required_dexterity_html TEXT,
        required_dexterity_range_average INTEGER,
        required_dexterity_range_colour TEXT,
        required_dexterity_range_maximum INTEGER,
        required_dexterity_range_minimum INTEGER,
        required_dexterity_range_text TEXT,
        required_intelligence INTEGER,
        required_intelligence_html TEXT,
        required_intelligence_range_average INTEGER,
        required_intelligence_range_colour TEXT,
        required_intelligence_range_maximum INTEGER,
        required_intelligence_range_minimum INTEGER,
        required_intelligence_range_text TEXT,
        required_level INTEGER,
        required_level_base INTEGER,
        required_level_html TEXT,
        required_level_range_average INTEGER,
        required_level_range_colour TEXT,
        required_level_range_maximum INTEGER,
        required_level_range_minimum INTEGER,
        required_level_range_text TEXT,
        required_strength INTEGER,
        required_strength_html TEXT,
        required_strength_range_average INTEGER,
        required_strength_range_colour TEXT,
        required_strength_range_maximum INTEGER,
        required_strength_range_minimum INTEGER,
        required_strength_range_text TEXT,
        size_x INTEGER,
        size_y INTEGER,
        stat_text TEXT,
        tags TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_itemspageID ON items (pageID);
    CREATE INDEX IF NOT EXISTS idx_items_name_value ON items (name);
    CREATE INDEX IF NOT EXISTS idx_items_base_item_id ON items (base_item_id);
    CREATE INDEX IF NOT EXISTS idx_items_metadata_id ON items (metadata_id);
    CREATE INDEX IF NOT EXISTS idx_items_rarity_id ON items (rarity_id);
    CREATE INDEX IF NOT EXISTS idx_items_name ON items(pageName);
    CREATE INDEX IF NOT EXISTS idx_items_class ON items(class);
    CREATE INDEX IF NOT EXISTS idx_items_class_id ON items(class_id);
`;

export const ITEM_STATS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS item_stats (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        avg INTEGER,
        max INTEGER,
        min INTEGER,
        mod_id TEXT,
        cargo_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_item_statspageName ON item_stats (pageName);
    CREATE INDEX IF NOT EXISTS idx_item_statspageID ON item_stats (pageID);
    CREATE INDEX IF NOT EXISTS idx_item_stats_mod_id ON item_stats (mod_id);
`;

export const ITEM_MODS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS item_mods (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        is_explicit INTEGER,
        is_implicit INTEGER,
        is_map_fragment_bonus INTEGER,
        is_random INTEGER,
        text TEXT,
        cargo_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_item_modspageName ON item_mods (pageName);
    CREATE INDEX IF NOT EXISTS idx_item_modspageID ON item_mods (pageID);
`;

export const MAPS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS maps (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        area_id TEXT,
        area_level INTEGER,
        guild_character TEXT,
        series TEXT,
        tier INTEGER,
        unique_area_id TEXT,
        unique_area_level INTEGER,
        unique_guild_character TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_mapspageName ON maps (pageName);
    CREATE INDEX IF NOT EXISTS idx_mapspageID ON maps (pageID);
    CREATE INDEX IF NOT EXISTS idx_maps_area_id ON maps (area_id);
    CREATE INDEX IF NOT EXISTS idx_maps_unique_area_id ON maps (unique_area_id);
    CREATE INDEX IF NOT EXISTS idx_maps_series ON maps (series);
`;

export const MAP_SERIES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS map_series (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        name TEXT,
        ordinal INTEGER,
        cargo_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_map_seriespageName ON map_series (pageName);
    CREATE INDEX IF NOT EXISTS idx_map_seriespageID ON map_series (pageID);
    CREATE INDEX IF NOT EXISTS idx_map_series_name ON map_series (name);
`;

export const MODS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS mods (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        domain INTEGER,
        generation_type INTEGER,
        granted_buff_id TEXT,
        granted_buff_value INTEGER,
        granted_skill TEXT,
        mod_groups TEXT,
        mod_type TEXT,
        name TEXT,
        required_level INTEGER,
        stat_text TEXT,
        stat_text_raw TEXT,
        tags TEXT,
        tier_text TEXT,
        cargo_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_modspageName ON mods (pageName);
    CREATE INDEX IF NOT EXISTS idx_modspageID ON mods (pageID);
    CREATE INDEX IF NOT EXISTS idx_mods_name ON mods (name);
    CREATE INDEX IF NOT EXISTS idx_mods_granted_buff_id ON mods (granted_buff_id);
`;

export const MOD_STATS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS mod_stats (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        max INTEGER,
        min INTEGER,
        cargo_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_mod_statspageName ON mod_stats (pageName);
    CREATE INDEX IF NOT EXISTS idx_mod_statspageID ON mod_stats (pageID);
`;

export const MOD_SPAWN_WEIGHT_SCHEMA = `
    CREATE TABLE IF NOT EXISTS mod_spawn_weights (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        ordinal INTEGER,
        value INTEGER,
        tag TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_mod_spawn_weightspageName ON mod_spawn_weights (pageName);
    CREATE INDEX IF NOT EXISTS idx_mod_spawn_weightspageID ON mod_spawn_weights (pageID);
    CREATE INDEX IF NOT EXISTS idx_mod_spawn_weights_tag ON mod_spawn_weights (tag);
`;

export const MOD_GENERATION_WEIGHT_SCHEMA = `
    CREATE TABLE IF NOT EXISTS mod_generation_weights (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        ordinal INTEGER,
        value INTEGER,
        tag TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_mod_generation_weightspageName ON mod_generation_weights (pageName);
    CREATE INDEX IF NOT EXISTS idx_mod_generation_weightspageID ON mod_generation_weights (pageID);
    CREATE INDEX IF NOT EXISTS idx_mod_generation_weights_tag ON mod_generation_weights (tag);
`;

export const MOD_SELL_PRICES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS mod_sell_prices (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        amount INTEGER,
        name TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_mod_sell_pricespageName ON mod_sell_prices (pageName);
    CREATE INDEX IF NOT EXISTS idx_mod_sell_pricespageID ON mod_sell_prices (pageID);
    CREATE INDEX IF NOT EXISTS idx_mod_sell_prices_name ON mod_sell_prices (name);
`;

export const ITEM_SELL_PRICES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS item_sell_prices (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        amount INTEGER,
        name TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_item_sell_pricespageName ON item_sell_prices (pageName);
    CREATE INDEX IF NOT EXISTS idx_item_sell_pricespageID ON item_sell_prices (pageID);
    CREATE INDEX IF NOT EXISTS idx_item_sell_prices_name ON item_sell_prices (name);
`;

export const ACQUISITION_RECIPES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS acquisition_recipes (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        automatic INTEGER,
        description TEXT,
        recipe_id INTEGER,
        result_amount INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_acquisition_recipespageName ON acquisition_recipes (pageName);
    CREATE INDEX IF NOT EXISTS idx_acquisition_recipespageID ON acquisition_recipes (pageID);
    CREATE INDEX IF NOT EXISTS idx_acquisition_recipes_recipe_id ON acquisition_recipes (recipe_id);
`;

export const ACQUISITION_RECIPES_PARTS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS acquisition_recipe_parts (
        id INTEGER PRIMARY KEY NOT NULL,
        pageID INTEGER,
        pageName TEXT,
        amount INTEGER,
        item_id TEXT,
        item_name TEXT,
        notes TEXT,
        item_page TEXT,
        part_id INTEGER,
        recipe_id INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_acquisition_recipe_partspageName ON acquisition_recipe_parts (pageName);
    CREATE INDEX IF NOT EXISTS idx_acquisition_recipe_partspageID ON acquisition_recipe_parts (pageID);
    CREATE INDEX IF NOT EXISTS idx_acquisition_recipe_parts_recipe_id ON acquisition_recipe_parts (recipe_id);
    CREATE INDEX IF NOT EXISTS idx_acquisition_recipe_parts_item_id ON acquisition_recipe_parts (item_id);
    CREATE INDEX IF NOT EXISTS idx_acquisition_recipe_parts_item_page ON acquisition_recipe_parts (item_page);
`;

export const VENDOR_REWARDS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS vendor_rewards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        act INTEGER,
        class_ids TEXT,
        classes TEXT,
        npc TEXT,
        quest TEXT,
        quest_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_vendor_rewardspageName ON vendor_rewards (pageName);
    CREATE INDEX IF NOT EXISTS idx_vendor_rewardspageID ON vendor_rewards (pageID);
    CREATE INDEX IF NOT EXISTS idx_vendor_rewards_quest_id ON vendor_rewards (quest_id);
    CREATE INDEX IF NOT EXISTS idx_vendor_rewards_act ON vendor_rewards (act);
`;

export const STACKABLES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS stackables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        stack_size INTEGER,
        stack_size_currency_tab INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_stackablespageName ON stackables (pageName);
    CREATE INDEX IF NOT EXISTS idx_stackablespageID ON stackables (pageID);
`;

export const SHIELDS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS shields (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        block INTEGER,
        block_html TEXT,
        block_range_average INTEGER,
        block_range_colour TEXT,
        block_range_maximum INTEGER,
        block_range_minimum INTEGER,
        block_range_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_shieldspageName ON shields (pageName);
    CREATE INDEX IF NOT EXISTS idx_shieldspageID ON shields (pageID);
`;

export const QUEST_REWARDS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS quest_rewards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        act INTEGER,
        class_ids TEXT,
        classes TEXT,
        item_level INTEGER,
        notes TEXT,
        quest TEXT,
        quest_id TEXT,
        rarity TEXT,
        sockets INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_quest_rewardspageName ON quest_rewards (pageName);
    CREATE INDEX IF NOT EXISTS idx_quest_rewardspageID ON quest_rewards (pageID);
    CREATE INDEX IF NOT EXISTS idx_quest_rewards_quest_id ON quest_rewards (quest_id);
    CREATE INDEX IF NOT EXISTS idx_quest_rewards_act ON quest_rewards (act);
`;

export const ITEM_BUFFS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS item_buffs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        buff_values TEXT,
        icon TEXT,
        cargo_id TEXT,
        stat_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_item_buffspageName ON item_buffs (pageName);
    CREATE INDEX IF NOT EXISTS idx_item_buffspageID ON item_buffs (pageID);
    CREATE INDEX IF NOT EXISTS idx_item_buffs_cargo_id ON item_buffs (cargo_id);
`;

export const HIDEOUT_DOODADS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS hideout_doodads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        is_master_doodad INTEGER,
        variation_count INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_hideout_doodadspageName ON hideout_doodads (pageName);
    CREATE INDEX IF NOT EXISTS idx_hideout_doodadspageID ON hideout_doodads (pageID);
`;

export const FLASKS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS flasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        charges_max INTEGER,
        charges_max_html TEXT,
        charges_max_range_average INTEGER,
        charges_max_range_colour TEXT,
        charges_max_range_maximum INTEGER,
        charges_max_range_minimum INTEGER,
        charges_max_range_text TEXT,
        charges_per_use INTEGER,
        charges_per_use_html TEXT,
        charges_per_use_range_average INTEGER,
        charges_per_use_range_colour TEXT,
        charges_per_use_range_maximum INTEGER,
        charges_per_use_range_minimum INTEGER,
        charges_per_use_range_text TEXT,
        duration REAL,
        duration_html TEXT,
        duration_range_average REAL,
        duration_range_colour TEXT,
        duration_range_maximum REAL,
        duration_range_minimum REAL,
        duration_range_text TEXT,
        life INTEGER,
        life_html TEXT,
        life_range_average INTEGER,
        life_range_colour TEXT,
        life_range_maximum INTEGER,
        life_range_minimum INTEGER,
        life_range_text TEXT,
        mana INTEGER,
        mana_html TEXT,
        mana_range_average INTEGER,
        mana_range_colour TEXT,
        mana_range_maximum INTEGER,
        mana_range_minimum INTEGER,
        mana_range_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_flaskspageName ON flasks (pageName);
    CREATE INDEX IF NOT EXISTS idx_flaskspageID ON flasks (pageID);
`;

export const ESSENCES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS essences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        category TEXT,
        level INTEGER,
        level_restriction INTEGER,
        type INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_essencespageName ON essences (pageName);
    CREATE INDEX IF NOT EXISTS idx_essencespageID ON essences (pageID);
    CREATE INDEX IF NOT EXISTS idx_essences_category ON essences (category);
`;

export const COSMETIC_ITEMS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS cosmetic_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        cosmetic_type TEXT,
        target TEXT,
        theme TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_cosmetic_itemspageName ON cosmetic_items (pageName);
    CREATE INDEX IF NOT EXISTS idx_cosmetic_itemspageID ON cosmetic_items (pageID);
    CREATE INDEX IF NOT EXISTS idx_cosmetic_items_cosmetic_type ON cosmetic_items (cosmetic_type);
`;

export const ATLAS_MAPS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS atlas_maps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        map_tier0 INTEGER,
        map_tier1 INTEGER,
        map_tier2 INTEGER,
        map_tier3 INTEGER,
        map_tier4 INTEGER,
        region_id TEXT,
        region_minimum INTEGER,
        x REAL,
        x0 REAL,
        x1 REAL,
        x2 REAL,
        x3 REAL,
        x4 REAL,
        y REAL,
        y0 REAL,
        y1 REAL,
        y2 REAL,
        y3 REAL,
        y4 REAL
    );

    CREATE INDEX IF NOT EXISTS idx_atlas_mapspageName ON atlas_maps (pageName);
    CREATE INDEX IF NOT EXISTS idx_atlas_mapspageID ON atlas_maps (pageID);
    CREATE INDEX IF NOT EXISTS idx_atlas_maps_region_id ON atlas_maps (region_id);
`;

export const ATLAS_CONNECTIONS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS atlas_connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        map1 TEXT,
        map2 TEXT,
        region0 INTEGER,
        region1 INTEGER,
        region2 INTEGER,
        region3 INTEGER,
        region4 INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_atlas_connectionspageName ON atlas_connections (pageName);
    CREATE INDEX IF NOT EXISTS idx_atlas_connectionspageID ON atlas_connections (pageID);
    CREATE INDEX IF NOT EXISTS idx_atlas_connections_map1 ON atlas_connections (map1);
    CREATE INDEX IF NOT EXISTS idx_atlas_connections_map2 ON atlas_connections (map2);
`;

export const SKILL_SCHEMA = `
    CREATE TABLE IF NOT EXISTS skill (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        active_skill_name TEXT,
        cast_time REAL,
        description TEXT,
        html TEXT,
        item_class_id_restriction TEXT,
        item_class_restriction TEXT,
        max_level INTEGER,
        projectile_speed INTEGER,
        radius INTEGER,
        radius_description TEXT,
        radius_secondary INTEGER,
        radius_secondary_description TEXT,
        radius_tertiary INTEGER,
        radius_tertiary_description TEXT,
        skill_icon TEXT,
        skill_id TEXT,
        skill_screenshot TEXT,
        stat_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_skillpageName ON skill (pageName);
    CREATE INDEX IF NOT EXISTS idx_skillpageID ON skill (pageID);
    CREATE INDEX IF NOT EXISTS idx_skill_skill_id ON skill (skill_id);
    CREATE INDEX IF NOT EXISTS idx_skill_active_skill_name ON skill (active_skill_name);
`;

export const SKILL_STATS_PER_LEVEL_SCHEMA = `
    CREATE TABLE IF NOT EXISTS skill_stats_per_level (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        cargo_id TEXT,
        level INTEGER,
        value INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_skill_stats_per_levelpageName ON skill_stats_per_level (pageName);
    CREATE INDEX IF NOT EXISTS idx_skill_stats_per_levelpageID ON skill_stats_per_level (pageID);
    CREATE INDEX IF NOT EXISTS idx_skill_stats_per_level_cargo_id ON skill_stats_per_level (cargo_id);
    CREATE INDEX IF NOT EXISTS idx_skill_stats_per_level_level ON skill_stats_per_level (level);
`;

export const SKILL_LEVELS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS skill_levels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        attack_speed_multiplier INTEGER,
        attack_time REAL,
        cooldown REAL,
        cost_amounts TEXT,
        cost_multiplier REAL,
        cost_types TEXT,
        critical_strike_chance REAL,
        damage_effectiveness REAL,
        damage_multiplier REAL,
        dexterity_requirement INTEGER,
        duration REAL,
        experience INTEGER,
        intelligence_requirement INTEGER,
        level INTEGER,
        level_requirement INTEGER,
        life_reservation_flat INTEGER,
        life_reservation_percent INTEGER,
        mana_reservation_flat INTEGER,
        mana_reservation_percent INTEGER,
        spirit_reservation_flat INTEGER,
        stat_text TEXT,
        stored_uses INTEGER,
        strength_requirement INTEGER,
        vaal_soul_gain_prevention_time REAL,
        vaal_souls_requirement INTEGER,
        vaal_stored_uses INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_skill_levelspageName ON skill_levels (pageName);
    CREATE INDEX IF NOT EXISTS idx_skill_levelspageID ON skill_levels (pageID);
    CREATE INDEX IF NOT EXISTS idx_skill_levels_level ON skill_levels (level);
`;

export const ASCENDANCY_CLASSES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS ascendancy_classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        character_class TEXT,
        character_id INTEGER,
        flavour_text TEXT,
        cargo_id INTEGER,
        name TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_ascendancy_classespageName ON ascendancy_classes (pageName);
    CREATE INDEX IF NOT EXISTS idx_ascendancy_classespageID ON ascendancy_classes (pageID);
    CREATE INDEX IF NOT EXISTS idx_ascendancy_classes_cargo_id ON ascendancy_classes (cargo_id);
    CREATE INDEX IF NOT EXISTS idx_ascendancy_classes_character_id ON ascendancy_classes (character_id);
    CREATE INDEX IF NOT EXISTS idx_ascendancy_classes_name ON ascendancy_classes (name);
`;

export const MONSTERS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS monsters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        attack_speed REAL,
        critical_strike_chance REAL,
        damage_multiplier REAL,
        endgame_mod_ids TEXT,
        experience_multiplier REAL,
        health_multiplier REAL,
        is_boss INTEGER,
        maximum_attack_distance INTEGER,
        metadata_id TEXT,
        minimum_attack_distance INTEGER,
        mod_ids TEXT,
        model_size_multiplier REAL,
        monster_type_id TEXT,
        name TEXT,
        part1_mod_ids TEXT,
        part2_mod_ids TEXT,
        rarity TEXT,
        rarity_id TEXT,
        size INTEGER,
        skill_ids TEXT,
        tags TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_monsterspageName ON monsters (pageName);
    CREATE INDEX IF NOT EXISTS idx_monsterspageID ON monsters (pageID);
    CREATE INDEX IF NOT EXISTS idx_monsters_metadata_id ON monsters (metadata_id);
    CREATE INDEX IF NOT EXISTS idx_monsters_monster_type_id ON monsters (monster_type_id);
    CREATE INDEX IF NOT EXISTS idx_monsters_name ON monsters (name);
    CREATE INDEX IF NOT EXISTS idx_monsters_rarity_id ON monsters (rarity_id);
`;

export const MONSTER_TYPES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS monster_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        armour_multiplier REAL,
        damage_spread REAL,
        energy_shield_multiplier REAL,
        evasion_multiplier REAL,
        cargo_id TEXT,
        monster_resistance_id TEXT,
        tags TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_monster_typespageName ON monster_types (pageName);
    CREATE INDEX IF NOT EXISTS idx_monster_typespageID ON monster_types (pageID);
    CREATE INDEX IF NOT EXISTS idx_monster_types_cargo_id ON monster_types (cargo_id);
    CREATE INDEX IF NOT EXISTS idx_monster_types_monster_resistance_id ON monster_types (monster_resistance_id);
`;

export const MONSTER_RESISTANCES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS monster_resistances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        cargo_id TEXT,
        maps_chaos INTEGER,
        maps_cold INTEGER,
        maps_fire INTEGER,
        maps_lightning INTEGER,
        part1_chaos INTEGER,
        part1_cold INTEGER,
        part1_fire INTEGER,
        part1_lightning INTEGER,
        part2_chaos INTEGER,
        part2_cold INTEGER,
        part2_fire INTEGER,
        part2_lightning INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_monster_resistancespageName ON monster_resistances (pageName);
    CREATE INDEX IF NOT EXISTS idx_monster_resistancespageID ON monster_resistances (pageID);
    CREATE INDEX IF NOT EXISTS idx_monster_resistances_cargo_id ON monster_resistances (cargo_id);
`;

export const MONSTER_MAP_MULTIPLIERS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS monster_map_multipliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        boss_damage INTEGER,
        boss_item_quantity INTEGER,
        boss_item_rarity INTEGER,
        boss_life INTEGER,
        damage INTEGER,
        level INTEGER,
        life INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_monster_map_multiplierspageName ON monster_map_multipliers (pageName);
    CREATE INDEX IF NOT EXISTS idx_monster_map_multiplierspageID ON monster_map_multipliers (pageID);
    CREATE INDEX IF NOT EXISTS idx_monster_map_multipliers_level ON monster_map_multipliers (level);
`;

export const SKKIASTESTDICTIONARY_SCHEMA = `
    CREATE TABLE IF NOT EXISTS skkiastestdictionary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        Term TEXT,
        Category TEXT,
        Definition TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_skkiastestdictionarypageName ON skkiastestdictionary (pageName);
    CREATE INDEX IF NOT EXISTS idx_skkiastestdictionarypageID ON skkiastestdictionary (pageID);
    CREATE INDEX IF NOT EXISTS idx_skkiastestdictionary_term ON skkiastestdictionary (Term);
    CREATE INDEX IF NOT EXISTS idx_skkiastestdictionary_category ON skkiastestdictionary (Category);
`;

export const EVENTS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        end_date TEXT,
        cargo_id TEXT,
        is_hardcore INTEGER,
        is_standard INTEGER,
        links TEXT,
        name TEXT,
        number_of_events INTEGER,
        ordinal INTEGER,
        prize TEXT,
        release_date TEXT,
        release_version TEXT,
        rewards TEXT,
        short_name TEXT,
        type TEXT,
        end_date__precision TEXT,
        release_date__precision TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_eventspageName ON events (pageName);
    CREATE INDEX IF NOT EXISTS idx_eventspageID ON events (pageID);
    CREATE INDEX IF NOT EXISTS idx_events_cargo_id ON events (cargo_id);
    CREATE INDEX IF NOT EXISTS idx_events_short_name ON events (short_name);
    CREATE INDEX IF NOT EXISTS idx_events_name ON events (name);
`;

export const LEGACY_VARIANTS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS legacy_variants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        removal_version TEXT,
        implicit_stat_text TEXT,
        explicit_stat_text TEXT,
        stat_text TEXT,
        base_item TEXT,
        required_level INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_legacy_variantspageName ON legacy_variants (pageName);
    CREATE INDEX IF NOT EXISTS idx_legacy_variantspageID ON legacy_variants (pageID);
    CREATE INDEX IF NOT EXISTS idx_legacy_variants_base_item ON legacy_variants (base_item);
`;

export const ARMOURS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS armours (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        armour_html TEXT,
        armour_max INTEGER,
        armour_min INTEGER,
        armour_range_average INTEGER,
        armour_range_colour TEXT,
        armour_range_maximum INTEGER,
        armour_range_minimum INTEGER,
        armour_range_text TEXT,
        energy_shield_html TEXT,
        energy_shield_max INTEGER,
        energy_shield_min INTEGER,
        energy_shield_range_average INTEGER,
        energy_shield_range_colour TEXT,
        energy_shield_range_maximum INTEGER,
        energy_shield_range_minimum INTEGER,
        energy_shield_range_text TEXT,
        evasion_html TEXT,
        evasion_max INTEGER,
        evasion_min INTEGER,
        evasion_range_average INTEGER,
        evasion_range_colour TEXT,
        evasion_range_maximum INTEGER,
        evasion_range_minimum INTEGER,
        evasion_range_text TEXT,
        movement_speed REAL,
        ward_html TEXT,
        ward_max INTEGER,
        ward_min INTEGER,
        ward_range_average INTEGER,
        ward_range_colour TEXT,
        ward_range_maximum INTEGER,
        ward_range_minimum INTEGER,
        ward_range_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_armourspageName ON armours (pageName);
    CREATE INDEX IF NOT EXISTS idx_armourspageID ON armours (pageID);
`;

export const WEAPONS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS weapons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        attack_speed REAL,
        attack_speed_html TEXT,
        attack_speed_range_average REAL,
        attack_speed_range_colour TEXT,
        attack_speed_range_maximum REAL,
        attack_speed_range_minimum REAL,
        attack_speed_range_text TEXT,
        chaos_damage_html TEXT,
        chaos_damage_max INTEGER,
        chaos_damage_max_html TEXT,
        chaos_damage_max_range_average INTEGER,
        chaos_damage_max_range_colour TEXT,
        chaos_damage_max_range_maximum INTEGER,
        chaos_damage_max_range_minimum INTEGER,
        chaos_damage_max_range_text TEXT,
        chaos_damage_min INTEGER,
        chaos_damage_min_html TEXT,
        chaos_damage_min_range_average INTEGER,
        chaos_damage_min_range_colour TEXT,
        chaos_damage_min_range_maximum INTEGER,
        chaos_damage_min_range_minimum INTEGER,
        chaos_damage_min_range_text TEXT,
        chaos_dps_html TEXT,
        chaos_dps_range_average REAL,
        chaos_dps_range_colour TEXT,
        chaos_dps_range_maximum REAL,
        chaos_dps_range_minimum REAL,
        chaos_dps_range_text TEXT,
        cold_damage_html TEXT,
        cold_damage_max INTEGER,
        cold_damage_max_html TEXT,
        cold_damage_max_range_average INTEGER,
        cold_damage_max_range_colour TEXT,
        cold_damage_max_range_maximum INTEGER,
        cold_damage_max_range_minimum INTEGER,
        cold_damage_max_range_text TEXT,
        cold_damage_min INTEGER,
        cold_damage_min_html TEXT,
        cold_damage_min_range_average INTEGER,
        cold_damage_min_range_colour TEXT,
        cold_damage_min_range_maximum INTEGER,
        cold_damage_min_range_minimum INTEGER,
        cold_damage_min_range_text TEXT,
        cold_dps_html TEXT,
        cold_dps_range_average REAL,
        cold_dps_range_colour TEXT,
        cold_dps_range_maximum REAL,
        cold_dps_range_minimum REAL,
        cold_dps_range_text TEXT,
        critical_strike_chance REAL,
        critical_strike_chance_html TEXT,
        critical_strike_chance_range_average REAL,
        critical_strike_chance_range_colour TEXT,
        critical_strike_chance_range_maximum REAL,
        critical_strike_chance_range_minimum REAL,
        critical_strike_chance_range_text TEXT,
        damage_avg TEXT,
        damage_html TEXT,
        dps_html TEXT,
        dps_range_average REAL,
        dps_range_colour TEXT,
        dps_range_maximum REAL,
        dps_range_minimum REAL,
        dps_range_text TEXT,
        elemental_dps_html TEXT,
        elemental_dps_range_average REAL,
        elemental_dps_range_colour TEXT,
        elemental_dps_range_maximum REAL,
        elemental_dps_range_minimum REAL,
        elemental_dps_range_text TEXT,
        fire_damage_html TEXT,
        fire_damage_max INTEGER,
        fire_damage_max_html TEXT,
        fire_damage_max_range_average INTEGER,
        fire_damage_max_range_colour TEXT,
        fire_damage_max_range_maximum INTEGER,
        fire_damage_max_range_minimum INTEGER,
        fire_damage_max_range_text TEXT,
        fire_damage_min INTEGER,
        fire_damage_min_html TEXT,
        fire_damage_min_range_average INTEGER,
        fire_damage_min_range_colour TEXT,
        fire_damage_min_range_maximum INTEGER,
        fire_damage_min_range_minimum INTEGER,
        fire_damage_min_range_text TEXT,
        fire_dps_html TEXT,
        fire_dps_range_average REAL,
        fire_dps_range_colour TEXT,
        fire_dps_range_maximum REAL,
        fire_dps_range_minimum REAL,
        fire_dps_range_text TEXT,
        lightning_damage_html TEXT,
        lightning_damage_max INTEGER,
        lightning_damage_max_html TEXT,
        lightning_damage_max_range_average INTEGER,
        lightning_damage_max_range_colour TEXT,
        lightning_damage_max_range_maximum INTEGER,
        lightning_damage_max_range_minimum INTEGER,
        lightning_damage_max_range_text TEXT,
        lightning_damage_min INTEGER,
        lightning_damage_min_html TEXT,
        lightning_damage_min_range_average INTEGER,
        lightning_damage_min_range_colour TEXT,
        lightning_damage_min_range_maximum INTEGER,
        lightning_damage_min_range_minimum INTEGER,
        lightning_damage_min_range_text TEXT,
        lightning_dps_html TEXT,
        lightning_dps_range_average REAL,
        lightning_dps_range_colour TEXT,
        lightning_dps_range_maximum REAL,
        lightning_dps_range_minimum REAL,
        lightning_dps_range_text TEXT,
        physical_damage_html TEXT,
        physical_damage_max INTEGER,
        physical_damage_max_html TEXT,
        physical_damage_max_range_average INTEGER,
        physical_damage_max_range_colour TEXT,
        physical_damage_max_range_maximum INTEGER,
        physical_damage_max_range_minimum INTEGER,
        physical_damage_max_range_text TEXT,
        physical_damage_min INTEGER,
        physical_damage_min_html TEXT,
        physical_damage_min_range_average INTEGER,
        physical_damage_min_range_colour TEXT,
        physical_damage_min_range_maximum INTEGER,
        physical_damage_min_range_minimum INTEGER,
        physical_damage_min_range_text TEXT,
        physical_dps_html TEXT,
        physical_dps_range_average REAL,
        physical_dps_range_colour TEXT,
        physical_dps_range_maximum REAL,
        physical_dps_range_minimum REAL,
        physical_dps_range_text TEXT,
        poison_dps_html TEXT,
        poison_dps_range_average REAL,
        poison_dps_range_colour TEXT,
        poison_dps_range_maximum REAL,
        poison_dps_range_minimum REAL,
        poison_dps_range_text TEXT,
        reload_time REAL,
        reload_time_html TEXT,
        reload_time_range_average REAL,
        reload_time_range_colour TEXT,
        reload_time_range_maximum REAL,
        reload_time_range_minimum REAL,
        reload_time_range_text TEXT,
        spirit INTEGER,
        spirit_html TEXT,
        spirit_range_average INTEGER,
        spirit_range_colour TEXT,
        spirit_range_maximum INTEGER,
        spirit_range_minimum INTEGER,
        spirit_range_text TEXT,
        weapon_range REAL,
        weapon_range_html TEXT,
        weapon_range_range_average REAL,
        weapon_range_range_colour TEXT,
        weapon_range_range_maximum REAL,
        weapon_range_range_minimum REAL,
        weapon_range_range_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_weaponspageName ON weapons (pageName);
    CREATE INDEX IF NOT EXISTS idx_weaponspageID ON weapons (pageID);
`;

export const SKILL_GEMS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS skill_gems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        awakened_variant_id TEXT,
        dexterity_percent INTEGER,
        gem_description TEXT,
        gem_tags TEXT,
        gem_tier INTEGER,
        intelligence_percent INTEGER,
        is_awakened_support_gem INTEGER,
        is_vaal_skill_gem INTEGER,
        primary_attribute TEXT,
        strength_percent INTEGER,
        vaal_variant_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_skill_gemspageName ON skill_gems (pageName);
    CREATE INDEX IF NOT EXISTS idx_skill_gemspageID ON skill_gems (pageID);
    CREATE INDEX IF NOT EXISTS idx_skill_gems_awakened_variant_id ON skill_gems (awakened_variant_id);
    CREATE INDEX IF NOT EXISTS idx_skill_gems_vaal_variant_id ON skill_gems (vaal_variant_id);
`;

export const LIQUID_EMOTIONS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS liquid_emotions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        modifier TEXT,
        stat_text TEXT,
        tier INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_liquid_emotionspageName ON liquid_emotions (pageName);
    CREATE INDEX IF NOT EXISTS idx_liquid_emotionspageID ON liquid_emotions (pageID);
    CREATE INDEX IF NOT EXISTS idx_liquid_emotions_modifier ON liquid_emotions (modifier);
`;

export const MAP_FRAGMENTS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS map_fragments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        map_fragment_limit INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_map_fragmentspageName ON map_fragments (pageName);
    CREATE INDEX IF NOT EXISTS idx_map_fragmentspageID ON map_fragments (pageID);
`;

export const JEWELS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS jewels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        jewel_limit TEXT,
        radius_html TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_jewelspageName ON jewels (pageName);
    CREATE INDEX IF NOT EXISTS idx_jewelspageID ON jewels (pageID);
`;

export const INHERENT_SKILLS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS inherent_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        inherent_skills_ids TEXT,
        inherent_skills_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_inherent_skillspageName ON inherent_skills (pageName);
    CREATE INDEX IF NOT EXISTS idx_inherent_skillspageID ON inherent_skills (pageID);
`;

export const AREAS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS areas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        act INTEGER,
        adjacent_biomes TEXT,
        area_level INTEGER,
        area_type_tags TEXT,
        biomes TEXT,
        boss_monster_ids TEXT,
        connection_ids TEXT,
        entry_npc TEXT,
        entry_text TEXT,
        flavour_text TEXT,
        has_waypoint INTEGER,
        cargo_id TEXT,
        infobox_html TEXT,
        is_hideout_area INTEGER,
        is_labyrinth_airlock_area INTEGER,
        is_labyrinth_area INTEGER,
        is_labyrinth_boss_area INTEGER,
        is_map_area INTEGER,
        is_town_area INTEGER,
        is_underground INTEGER,
        is_unique_map_area INTEGER,
        is_vaal_area INTEGER,
        level_restriction_max INTEGER,
        loading_screen TEXT,
        main_page TEXT,
        mainpage_categories TEXT,
        modifier_ids TEXT,
        monster_ids TEXT,
        name TEXT,
        parent_area_id TEXT,
        release_version TEXT,
        removal_version TEXT,
        screenshot TEXT,
        stat_text TEXT,
        strongbox_max_count INTEGER,
        strongbox_spawn_chance INTEGER,
        strongbox_weight_magic INTEGER,
        strongbox_weight_normal INTEGER,
        strongbox_weight_rare INTEGER,
        strongbox_weight_unique INTEGER,
        tags TEXT,
        vaal_area_ids TEXT,
        vaal_area_spawn_chance INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_areaspageName ON areas (pageName);
    CREATE INDEX IF NOT EXISTS idx_areaspageID ON areas (pageID);
    CREATE INDEX IF NOT EXISTS idx_areas_cargo_id ON areas (cargo_id);
    CREATE INDEX IF NOT EXISTS idx_areas_name ON areas (name);
    CREATE INDEX IF NOT EXISTS idx_areas_parent_area_id ON areas (parent_area_id);
`;

export const GUIDES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS guides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        date TEXT,
        subject TEXT,
        version TEXT,
        date__precision
    );

    CREATE INDEX IF NOT EXISTS idx_guidespageName ON guides (pageName);
    CREATE INDEX IF NOT EXISTS idx_guidespageID ON guides (pageID);
    CREATE INDEX IF NOT EXISTS idx_guides_version ON guides (version);
`;

export const PASSIVE_SKILL_STATS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS passive_skill_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        cargo_id TEXT,
        value INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_passive_skill_statspageName ON passive_skill_stats (pageName);
    CREATE INDEX IF NOT EXISTS idx_passive_skill_statspageID ON passive_skill_stats (pageID);
    CREATE INDEX IF NOT EXISTS idx_passive_skill_stats_cargo_id ON passive_skill_stats (cargo_id);
`;

export const AUGMENTS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS augments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        augment_limit TEXT,
        stat_text TEXT,
        stat_text_bonded TEXT,
        type_id TEXT,
        type_name TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_augmentspageName ON augments (pageName);
    CREATE INDEX IF NOT EXISTS idx_augmentspageID ON augments (pageID);
    CREATE INDEX IF NOT EXISTS idx_augments_type_id ON augments (type_id);
    CREATE INDEX IF NOT EXISTS idx_augments_type_name ON augments (type_name);
`;

export const PASSIVE_SKILLS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS passive_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageName TEXT,
        pageID INTEGER,
        ascendancy_class TEXT,
        atlas_sub_tree TEXT,
        buff_id TEXT,
        connections TEXT,
        flavour_text TEXT,
        frame TEXT,
        icon TEXT,
        cargo_id TEXT,
        int_id INTEGER,
        is_atlas_passive INTEGER,
        is_attribute INTEGER,
        is_free INTEGER,
        is_icon_only INTEGER,
        is_in_game INTEGER,
        is_jewel_socket INTEGER,
        is_keystone INTEGER,
        is_multiple_choice INTEGER,
        is_multiple_choice_option INTEGER,
        is_notable INTEGER,
        is_starting_node INTEGER,
        main_page TEXT,
        name TEXT,
        reminder_text TEXT,
        skill_points INTEGER,
        stat_text TEXT,
        stat_text_raw TEXT,
        weapon_set_points INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_passive_skillspageName ON passive_skills (pageName);
    CREATE INDEX IF NOT EXISTS idx_passive_skillspageID ON passive_skills (pageID);
    CREATE INDEX IF NOT EXISTS idx_passive_skills_cargo_id ON passive_skills (cargo_id);
    CREATE INDEX IF NOT EXISTS idx_passive_skills_int_id ON passive_skills (int_id);
    CREATE INDEX IF NOT EXISTS idx_passive_skills_name ON passive_skills (name);
    CREATE INDEX IF NOT EXISTS idx_passive_skills_ascendancy_class ON passive_skills (ascendancy_class);
`;