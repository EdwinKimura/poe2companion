
import type { SQLiteDatabase } from 'expo-sqlite';
import { getDatasetCount, saveDataset } from './DataRepository';

type CargoItem = Record<string, unknown>;

export type ItemSearchResult = {
    id: number;
    pageName: string | null;
    pageTitle: string | null;
    name: string | null;
    class: string | null;
};

export async function saveItems(
    database: SQLiteDatabase,
    cargoItems: CargoItem[],
): Promise<number> {
    return saveDataset(database, 'items', cargoItems);
}

export async function getItemsCount(
    database: SQLiteDatabase,
): Promise<number> {
    return getDatasetCount(database, 'items');
}

export async function searchItems(database: SQLiteDatabase,query: string): Promise<ItemSearchResult[]> {
    const term = `%${query.trim()}%`;

    return database.getAllAsync<ItemSearchResult>(
        `SELECT 
            id, 
            pageName, 
            pageTitle, 
            name, 
            class as category,
            base_item as base_item,
            class_id as subcategoryId,
            rarity,
            required_level as requires_level,
            inventory_icon as itemImage
         FROM items
         WHERE pageName LIKE ?
            OR pageTitle LIKE ?
            OR name LIKE ?
            OR class LIKE ?
         ORDER BY pageName
         LIMIT 30`,
        term,
        term,
        term,
        term,
    );
}

export async function getItemById(database: SQLiteDatabase,id: number): Promise<Record<string, unknown> | null> {
    return database.getFirstAsync<Record<string, unknown>>(
        `SELECT 
            i.id,
            i.pageID,
            i.pageTitle,
            i.name,
            i.base_item,
            i.base_item_page,
            i.class,
            i.description,
            i.drop_areas,
            i.flavour_text,
            i.frame_type,
            i.implicit_stat_text,
            i.explicit_stat_text,
            i.inventory_icon,
            i.rarity,
            i.rarity_id,
            i.required_level,
            i.required_dexterity,
            i.required_intelligence,
            i.required_strength,
            i.drop_text,
            i.tags,
            a.armour_range_text,
            a.energy_shield_range_text,
            a.evasion_range_text,
            a.movement_speed,
            a.ward_range_text,
            w.attack_speed_range_text,
            w.chaos_damage_min_range_text,
            w.cold_dps_range_text,
            w.critical_strike_chance_range_text,
            w.dps_range_text,
            w.elemental_dps_range_text,
            w.fire_dps_range_text,
            w.lightning_dps_range_text,
            w.physical_dps_range_text,
            w.poison_dps_range_text,
            w.reload_time_range_text,
            w.spirit_range_text,
            w.weapon_range_range_text
        FROM items as i
        LEFT JOIN armours as a
            ON i.pageID = a.pageID
        LEFT JOIN weapons as w
            ON i.pageID = w.pageID
        WHERE i.id = ?`,
        id,
    );
}

export async function getItemsByCategory(
    database: SQLiteDatabase, 
    category: string,
    limit = 20, 
    offset = 0,
    searchQuery = ''
): Promise<ItemSearchResult[]> {

    const searchTerm = `%${searchQuery.trim().toLowerCase()}%`;

    let query = `
        SELECT
            items.*
        FROM items
        WHERE 1=1
    `;

    let params: any[] = [];

    if(category && category !== 'all'){
        query += ` AND class = ?`;
        params.push(category);
    }

    if(searchTerm && searchTerm.length > 0){
        query += ` AND (LOWER(name) LIKE ? OR ? = '')`;
        params.push(searchTerm, searchQuery);
    }

    query += ` 
        ORDER BY
            RTRIM(class, '0123456789 ') ASC,
            CAST(SUBSTR(class, LENGTH(RTRIM(class, '0123456789 ')) + 1) AS INTEGER) ASC
            LIMIT ? OFFSET ?;
    `;

    params.push(limit, offset);

    return database.getAllAsync<ItemSearchResult>(query, params);
}

export async function getImagePath(database: SQLiteDatabase): Promise<ItemSearchResult[]> {

    let query = `
        SELECT DISTINCT
            inventory_icon
        FROM items
    `;

    return database.getAllAsync<ItemSearchResult>(
        query
    )
}