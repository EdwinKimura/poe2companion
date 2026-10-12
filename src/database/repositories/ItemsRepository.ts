
import type { SQLiteDatabase } from 'expo-sqlite';
import { saveDataset, getDatasetCount } from './DataRepository';

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
            id,
            pageID,
            pageTitle,
            name,
            base_item,
            base_item_page,
            class,
            description,
            drop_areas,
            flavour_text,
            frame_type,
            implicit_stat_text,
            explicit_stat_text,
            inventory_icon,
            rarity,
            rarity_id,
            required_level,
            required_dexterity,
            required_intelligence,
            required_strength,
            drop_text,
            tags
        FROM items 
        WHERE id = ?`,
        id,
    );
}