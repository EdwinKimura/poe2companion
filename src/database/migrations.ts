import type { SQLiteDatabase } from 'expo-sqlite';

import {
    ACQUISITION_RECIPES_PARTS_SCHEMA,
    ACQUISITION_RECIPES_SCHEMA,
    AREAS_SCHEMA,
    ARMOURS_SCHEMA,
    ASCENDANCY_CLASSES_SCHEMA,
    ATLAS_CONNECTIONS_SCHEMA,
    ATLAS_MAPS_SCHEMA,
    AUGMENTS_SCHEMA,
    COSMETIC_ITEMS_SCHEMA,
    DATABASE_VERSION,
    ESSENCES_SCHEMA,
    EVENTS_SCHEMA,
    FLASKS_SCHEMA,
    GUIDES_SCHEMA,
    HIDEOUT_DOODADS_SCHEMA,
    INHERENT_SKILLS_SCHEMA,
    INITIAL_SCHEMA,
    ITEM_BUFFS_SCHEMA,
    ITEM_MODS_SCHEMA,
    ITEM_SCHEMA,
    ITEM_SELL_PRICES_SCHEMA,
    ITEM_STATS_SCHEMA,
    JEWELS_SCHEMA,
    LEGACY_VARIANTS_SCHEMA,
    LIQUID_EMOTIONS_SCHEMA,
    MAPS_SCHEMA,
    MAP_FRAGMENTS_SCHEMA,
    MAP_SERIES_SCHEMA,
    MODS_SCHEMA,
    MOD_GENERATION_WEIGHT_SCHEMA,
    MOD_SELL_PRICES_SCHEMA,
    MOD_SPAWN_WEIGHT_SCHEMA,
    MOD_STATS_SCHEMA,
    MONSTERS_SCHEMA,
    MONSTER_MAP_MULTIPLIERS_SCHEMA,
    MONSTER_RESISTANCES_SCHEMA,
    MONSTER_TYPES_SCHEMA,
    PASSIVE_SKILLS_SCHEMA,
    PASSIVE_SKILL_STATS_SCHEMA,
    QUEST_REWARDS_SCHEMA,
    SHIELDS_SCHEMA,
    SKILL_GEMS_SCHEMA,
    SKILL_LEVELS_SCHEMA,
    SKILL_SCHEMA,
    SKILL_STATS_PER_LEVEL_SCHEMA,
    SKKIASTESTDICTIONARY_SCHEMA,
    STACKABLES_SCHEMA,
    VENDOR_REWARDS_SCHEMA,
    VERSION_SCHEMA,
    WEAPONS_SCHEMA
} from './schema';


/**
 * Faz a migração de toda a base
 * 
 * @param database 
 */
export async function migrateDatabase(
    database: SQLiteDatabase,
): Promise<void> {
    await database.withTransactionAsync(async () => {
        const result = await database.getFirstAsync<{ user_version: number }>(
            'PRAGMA user_version',
        );

        const currentVersion = result?.user_version ?? 0;

        if (currentVersion > DATABASE_VERSION) {
            throw new Error(
                `Banco incompatível: versão ${currentVersion}. ` +
                `Esta versão do aplicativo suporta até ${DATABASE_VERSION}.`,
            );
        }

        if (currentVersion === DATABASE_VERSION) {
            return;
        }

        if (currentVersion < DATABASE_VERSION) {
            await database.execAsync(INITIAL_SCHEMA);
            await database.execAsync(ITEM_SCHEMA);
            await database.execAsync(ITEM_STATS_SCHEMA);
            await database.execAsync(ITEM_MODS_SCHEMA);
            await database.execAsync(MAPS_SCHEMA);
            await database.execAsync(MAP_SERIES_SCHEMA);
            await database.execAsync(MODS_SCHEMA);
            await database.execAsync(MOD_STATS_SCHEMA);
            await database.execAsync(MOD_SPAWN_WEIGHT_SCHEMA);
            await database.execAsync(MOD_GENERATION_WEIGHT_SCHEMA);
            await database.execAsync(MOD_SELL_PRICES_SCHEMA);
            await database.execAsync(ITEM_SELL_PRICES_SCHEMA);
            await database.execAsync(ACQUISITION_RECIPES_SCHEMA);
            await database.execAsync(ACQUISITION_RECIPES_PARTS_SCHEMA);
            await database.execAsync(VENDOR_REWARDS_SCHEMA);
            await database.execAsync(STACKABLES_SCHEMA);
            await database.execAsync(SHIELDS_SCHEMA);
            await database.execAsync(QUEST_REWARDS_SCHEMA);
            await database.execAsync(ITEM_BUFFS_SCHEMA);
            await database.execAsync(HIDEOUT_DOODADS_SCHEMA);
            await database.execAsync(FLASKS_SCHEMA);
            await database.execAsync(ESSENCES_SCHEMA);
            await database.execAsync(COSMETIC_ITEMS_SCHEMA);
            await database.execAsync(ATLAS_MAPS_SCHEMA);
            await database.execAsync(ATLAS_CONNECTIONS_SCHEMA);
            await database.execAsync(SKILL_SCHEMA);
            await database.execAsync(SKILL_STATS_PER_LEVEL_SCHEMA);
            await database.execAsync(SKILL_LEVELS_SCHEMA);
            await database.execAsync(ASCENDANCY_CLASSES_SCHEMA);
            await database.execAsync(MONSTERS_SCHEMA);
            await database.execAsync(MONSTER_TYPES_SCHEMA);
            await database.execAsync(MONSTER_RESISTANCES_SCHEMA);
            await database.execAsync(MONSTER_MAP_MULTIPLIERS_SCHEMA);
            await database.execAsync(SKKIASTESTDICTIONARY_SCHEMA);
            await database.execAsync(EVENTS_SCHEMA);
            await database.execAsync(LEGACY_VARIANTS_SCHEMA);
            await database.execAsync(ARMOURS_SCHEMA);
            await database.execAsync(WEAPONS_SCHEMA);
            await database.execAsync(SKILL_GEMS_SCHEMA);
            await database.execAsync(LIQUID_EMOTIONS_SCHEMA);
            await database.execAsync(MAP_FRAGMENTS_SCHEMA);
            await database.execAsync(JEWELS_SCHEMA);
            await database.execAsync(INHERENT_SKILLS_SCHEMA);
            await database.execAsync(AREAS_SCHEMA);
            await database.execAsync(GUIDES_SCHEMA);
            await database.execAsync(PASSIVE_SKILL_STATS_SCHEMA);
            await database.execAsync(AUGMENTS_SCHEMA);
            await database.execAsync(PASSIVE_SKILLS_SCHEMA);
            await database.execAsync(VERSION_SCHEMA);
        }

        await database.execAsync(
            `PRAGMA user_version = ${DATABASE_VERSION}`,
        );
    });
}
