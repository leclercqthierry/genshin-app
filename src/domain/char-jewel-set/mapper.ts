import type { CharJewelSet } from "./types";
import type { CharJewelSetRow } from "./db";

/**
 * DB → Domaine
 */
export function mapRowToCharJewelSet(row: CharJewelSetRow): CharJewelSet {
    return {
        id: row.id,
        name: row.name,
        rarity2Url: row.rarity2_url,
        rarity3Url: row.rarity3_url,
        rarity4Url: row.rarity4_url,
        rarity5Url: row.rarity5_url,
        createdAt: row.created_at,
        elementId: row.element_id,
    };
}

/**
 * Domaine → DB (pour insert/update)
 */
export function mapCharJewelSetToRow(entity: CharJewelSet): CharJewelSetRow {
    return {
        id: entity.id,
        name: entity.name,
        rarity2_url: entity.rarity2Url,
        rarity3_url: entity.rarity3Url,
        rarity4_url: entity.rarity4Url,
        rarity5_url: entity.rarity5Url,
        created_at: entity.createdAt,
        element_id: entity.elementId,
    };
}