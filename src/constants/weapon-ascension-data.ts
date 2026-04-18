export type ItemRarity = 1 | 2 | 3 | 4 | 5;
export type WeaponRarity = 3 | 4 | 5;
export type Level = "20" | "40" | "50" | "60" | "70" | "80";
export type MaterialKind = "dungeon" | "elite" | "mob";

export interface AscensionRow {
    level: Level;
    dungeonCount: number;
    eliteCount: number;
    mobCount: number;
    mora: string;
}

export const itemRarityByLevel: Record<Level, Record<MaterialKind, ItemRarity>> = {
    "20": { dungeon: 2, elite: 2, mob: 1 },
    "40": { dungeon: 3, elite: 2, mob: 1 },
    "50": { dungeon: 3, elite: 3, mob: 2 },
    "60": { dungeon: 4, elite: 3, mob: 2 },
    "70": { dungeon: 4, elite: 4, mob: 3 },
    "80": { dungeon: 5, elite: 4, mob: 3 },
};

export const weaponAscensionCosts: Record<number, AscensionRow[]> = {
    5: [
        { level: "20", dungeonCount: 5, eliteCount: 5, mobCount: 3, mora: "10 000" },
        { level: "40", dungeonCount: 5, eliteCount: 18, mobCount: 12, mora: "20 000" },
        { level: "50", dungeonCount: 9, eliteCount: 9, mobCount: 9, mora: "30 000" },
        { level: "60", dungeonCount: 5, eliteCount: 18, mobCount: 14, mora: "45 000" },
        { level: "70", dungeonCount: 9, eliteCount: 14, mobCount: 9, mora: "55 000" },
        { level: "80", dungeonCount: 6, eliteCount: 27, mobCount: 18, mora: "65 000" },
    ],

    4: [
        { level: "20", dungeonCount: 3, eliteCount: 3, mobCount: 2, mora: "5 000" },
        { level: "40", dungeonCount: 3, eliteCount: 12, mobCount: 8, mora: "15 000" },
        { level: "50", dungeonCount: 6, eliteCount: 6, mobCount: 6, mora: "20 000" },
        { level: "60", dungeonCount: 3, eliteCount: 12, mobCount: 9, mora: "30 000" },
        { level: "70", dungeonCount: 6, eliteCount: 9, mobCount: 6, mora: "35 000" },
        { level: "80", dungeonCount: 4, eliteCount: 18, mobCount: 12, mora: "45 000" },
    ],

    3: [
        { level: "20", dungeonCount: 2, eliteCount: 2, mobCount: 1, mora: "5 000" },
        { level: "40", dungeonCount: 2, eliteCount: 8, mobCount: 5, mora: "10 000" },
        { level: "50", dungeonCount: 4, eliteCount: 4, mobCount: 4, mora: "15 000" },
        { level: "60", dungeonCount: 2, eliteCount: 8, mobCount: 6, mora: "20 000" },
        { level: "70", dungeonCount: 4, eliteCount: 6, mobCount: 4, mora: "25 000" },
        { level: "80", dungeonCount: 3, eliteCount: 12, mobCount: 8, mora: "30 000" },
    ],
};

export const getWeaponAscensionRows = (rarity: number): AscensionRow[] => {
    return weaponAscensionCosts[rarity] ?? [];
};