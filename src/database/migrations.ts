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

export async function migrateDatabase(
    database: SQLiteDatabase,
): Promise<void> {
    await database.withExclusiveTransactionAsync(async (transaction) => {
        const result = await transaction.getFirstAsync<{ user_version: number }>(
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
            await transaction.execAsync(INITIAL_SCHEMA);
            await transaction.execAsync(ITEM_SCHEMA);
            await transaction.execAsync(ITEM_STATS_SCHEMA);
            await transaction.execAsync(ITEM_MODS_SCHEMA);
            await transaction.execAsync(MAPS_SCHEMA);
            await transaction.execAsync(MAP_SERIES_SCHEMA);
            await transaction.execAsync(MODS_SCHEMA);
            await transaction.execAsync(MOD_STATS_SCHEMA);
            await transaction.execAsync(MOD_SPAWN_WEIGHT_SCHEMA);
            await transaction.execAsync(MOD_GENERATION_WEIGHT_SCHEMA);
            await transaction.execAsync(MOD_SELL_PRICES_SCHEMA);
            await transaction.execAsync(ITEM_SELL_PRICES_SCHEMA);
            await transaction.execAsync(ACQUISITION_RECIPES_SCHEMA);
            await transaction.execAsync(ACQUISITION_RECIPES_PARTS_SCHEMA);
            await transaction.execAsync(VENDOR_REWARDS_SCHEMA);
            await transaction.execAsync(STACKABLES_SCHEMA);
            await transaction.execAsync(SHIELDS_SCHEMA);
            await transaction.execAsync(QUEST_REWARDS_SCHEMA);
            await transaction.execAsync(ITEM_BUFFS_SCHEMA);
            await transaction.execAsync(HIDEOUT_DOODADS_SCHEMA);
            await transaction.execAsync(FLASKS_SCHEMA);
            await transaction.execAsync(ESSENCES_SCHEMA);
            await transaction.execAsync(COSMETIC_ITEMS_SCHEMA);
            await transaction.execAsync(ATLAS_MAPS_SCHEMA);
            await transaction.execAsync(ATLAS_CONNECTIONS_SCHEMA);
            await transaction.execAsync(SKILL_SCHEMA);
            await transaction.execAsync(SKILL_STATS_PER_LEVEL_SCHEMA);
            await transaction.execAsync(SKILL_LEVELS_SCHEMA);
            await transaction.execAsync(ASCENDANCY_CLASSES_SCHEMA);
            await transaction.execAsync(MONSTERS_SCHEMA);
            await transaction.execAsync(MONSTER_TYPES_SCHEMA);
            await transaction.execAsync(MONSTER_RESISTANCES_SCHEMA);
            await transaction.execAsync(MONSTER_MAP_MULTIPLIERS_SCHEMA);
            await transaction.execAsync(SKKIASTESTDICTIONARY_SCHEMA);
            await transaction.execAsync(EVENTS_SCHEMA);
            await transaction.execAsync(LEGACY_VARIANTS_SCHEMA);
            await transaction.execAsync(ARMOURS_SCHEMA);
            await transaction.execAsync(WEAPONS_SCHEMA);
            await transaction.execAsync(SKILL_GEMS_SCHEMA);
            await transaction.execAsync(LIQUID_EMOTIONS_SCHEMA);
            await transaction.execAsync(MAP_FRAGMENTS_SCHEMA);
            await transaction.execAsync(JEWELS_SCHEMA);
            await transaction.execAsync(INHERENT_SKILLS_SCHEMA);
            await transaction.execAsync(AREAS_SCHEMA);
            await transaction.execAsync(GUIDES_SCHEMA);
            await transaction.execAsync(PASSIVE_SKILL_STATS_SCHEMA);
            await transaction.execAsync(AUGMENTS_SCHEMA);
            await transaction.execAsync(PASSIVE_SKILLS_SCHEMA);
            await transaction.execAsync(VERSION_SCHEMA);
        }

        await transaction.execAsync(
            `PRAGMA user_version = ${DATABASE_VERSION}`,
        );
    });
}
