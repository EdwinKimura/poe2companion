
import type { SQLiteDatabase } from 'expo-sqlite';

export type ModsSearchResult = {
    id: string;
    modifier: string | null;
    mod_type: string | null;
    name: string | null;
    required_level: string | null;
    stat_text_raw: string | null;
    tier_text: string | null;
    tag: string | null;
};

export async function getModsByClassItem(database: SQLiteDatabase, classItem: string): Promise<ModsSearchResult[][] | null> {
    const searchTerm = `${classItem.trim().toLowerCase()}`;
    const rows = await database.getAllAsync<ModsSearchResult>(
        `SELECT 
            msw.id,
            m.pageName as modifier,
            m.mod_type,
            m.name,
            m.required_level,
            m.stat_text_raw,
            m.tier_text,
            msw.tag
        FROM mod_spawn_weights as msw
        LEFT JOIN mods as m
            ON msw.pageID = m.pageID
        WHERE msw.tag = ?`,
        [searchTerm]
    );

    const groupedArray = groupModsByType(rows);
    return groupedArray;
}

function groupModsByType(rows: ModsSearchResult[]):ModsSearchResult[][] {
  const groupedObj = rows.reduce((acc, row) => {
    const modType = row.mod_type ?? 'unknown'; 
    
    if (!acc[modType]) {
      acc[modType] = [];
    }
    
    acc[modType].push(row);
    return acc;
  }, {} as Record<string, ModsSearchResult[]>);

  // Converte o objeto agrupado em um array de arrays
  return Object.values(groupedObj);
}
