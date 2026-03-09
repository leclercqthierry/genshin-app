import type { LocalMaterial } from "./types";
import type { LocalMaterialRow } from "./db";

/**
 * DB → Domaine
 */
export function mapRowToLocalMaterial(row: LocalMaterialRow): LocalMaterial {
    return {
        id: row.id,
        name: row.name,
        iconUrl: row.icon_url,
        createdAt: row.created_at,
    };
}

/**
 * Domaine → DB (pour insert/update)
 */
export function mapLocalMaterialToRow(localMaterial: LocalMaterial): LocalMaterialRow {
    return {
        id: localMaterial.id,
        name: localMaterial.name,
        icon_url: localMaterial.iconUrl,
        created_at: localMaterial.createdAt,
    };
}