import type { WorldBossDrop } from "./types";
import type { WorldBossDropRow } from "./db";

/**
 * DB → Domaine
 */
export function mapRowToWorldBossDrop(row: WorldBossDropRow): WorldBossDrop {
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
export function mapWorldBossDropToRow(worldBossDrop: WorldBossDrop): WorldBossDropRow {
    return {
        id: worldBossDrop.id,
        name: worldBossDrop.name,
        icon_url: worldBossDrop.iconUrl,
        created_at: worldBossDrop.createdAt,
    };
}