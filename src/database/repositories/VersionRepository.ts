
import type { SQLiteDatabase } from 'expo-sqlite';
import { getDatasetCount } from './DataRepository';

type CargoItem = Record<string, unknown>;

export type VersionSearchResult = {
    id: number;
    pageName: string | null;
    version: string
};

export async function getVersionsCount(
    database: SQLiteDatabase,
): Promise<number> {
    return getDatasetCount(database, 'versions');
}

export async function searchVersions(database: SQLiteDatabase,query: string): Promise<VersionSearchResult[]> {
    const term = `%${query.trim()}%`;

    return database.getAllAsync<VersionSearchResult>(
        `SELECT 
            id, 
            pageName, 
            version
         FROM versions
         WHERE pageName LIKE ?
            OR version LIKE ?
         ORDER BY id
         LIMIT 30`,
        term,
        term,
    );
}

export async function getVersions(
    database: SQLiteDatabase, 
    version: string = '',
    limit = 1, 
    offset = 0,
    searchQuery = ''
): Promise<VersionSearchResult | null> {

    const searchTerm = `%${searchQuery.trim().toLowerCase()}%`;

    let query = `
        SELECT
            versions.*
        FROM versions
        WHERE 1=1
    `;

    let params: any[] = [];

    if(version && version.length > 0){
        query += ` AND version = ?`;
        params.push(version);
    }

    if(searchTerm && searchTerm.length > 2){
        query += ` AND (LOWER(version) LIKE ? OR ? = '')`;
        params.push(searchTerm, searchQuery);
    }

    query += ` 
        ORDER BY
            ID DESC
        LIMIT ? OFFSET ?;
    `;

    params.push(limit, offset);

    return database.getFirstAsync<VersionSearchResult>(query, params);
}
