import type { MobDropSet } from "./types";
import type { MobDropSetRow } from "./db";

export function mapRowToMobDropSet(row: MobDropSetRow): MobDropSet {
    return {
        id: row.id,
        name: row.name,
        rarity1Url: row.rarity1_url,
        rarity2Url: row.rarity2_url,
        rarity3Url: row.rarity3_url,
        createdAt: row.created_at,
    };
}

export function mapMobDropSetToRow(entity: MobDropSet): MobDropSetRow {
    return {
        id: entity.id,
        name: entity.name,
        rarity1_url: entity.rarity1Url,
        rarity2_url: entity.rarity2Url,
        rarity3_url: entity.rarity3Url,
        created_at: entity.createdAt,
    };
}