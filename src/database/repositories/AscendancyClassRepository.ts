
import type { SQLiteDatabase } from 'expo-sqlite';

export type CharResult = {
  character_class: string;
  ascendancy: AscendancyResult[];
}

export type AscendancyResult = {
  name: string;
  passives:AscendancySearchResult[]
}

export type AscendancySearchResult = {
  id: string;
  ascendancy: string;
  character_class: string | null;
  flavour_text: string | null;
  ascendancy_passive: string | null;
  name: string | null;
  connections: string | null;
  icon: string | null;
  cargo_id: string | null;
  is_in_game: boolean | null;
  is_notable: boolean | null;
  stat_text: string | null;
};

export async function getAscendancyClassPassiveSkill(database: SQLiteDatabase): Promise<CharResult[]> {
  const chars = await database.getAllAsync<CharResult>(
    `
        SELECT 
          character_class
        FROM ascendancy_classes
        GROUP BY character_class
      `
  );

  for (let char of chars) {
    const rows = await database.getAllAsync<AscendancySearchResult>(
      `SELECT 
            ac.id,
            ac.pageName as ascendancy,
            ac.character_class,
            ac.flavour_text,
            ps.pageName as ascendancy_passive,
            ps.name,
            ps.connections,
            ps.icon,
            ps.cargo_id,
            ps.is_in_game,
            ps.is_notable,
            ps.stat_text
        FROM ascendancy_classes as ac
        LEFT JOIN passive_skills as ps
            ON ac.pageName = ps.ascendancy_class
        WHERE ac.character_class = ?;`,
        [char.character_class]
    );

    const ascendancyMap: Record<string, any> = {};

    for (const row of rows) {
      const ascName = row.ascendancy;

      if (!ascendancyMap[ascName]) {
        ascendancyMap[ascName] = {
          name: ascName,
          passives: []
        };
      }

      const { ascendancy, character_class, ...passiveData } = row;

      ascendancyMap[ascName].passives.push(passiveData);
    }

    (char as any).ascendancy = Object.values(ascendancyMap);
  }

  return chars;
}

function groupModsByType(rows: AscendancySearchResult[]): AscendancySearchResult[][] {
  const groupedObj = rows.reduce((acc, row) => {
    const modType = row.ascendancy ?? 'unknown';

    if (!acc[modType]) {
      acc[modType] = [];
    }

    acc[modType].push(row);
    return acc;
  }, {} as Record<string, AscendancySearchResult[]>);

  return Object.values(groupedObj);
}
