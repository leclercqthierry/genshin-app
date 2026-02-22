import type { BossDrop } from "./types";
import type { BossDropRow } from "./db";

/**
 * DB → Domaine
 */
export function mapRowToBossDrop(row: BossDropRow): BossDrop {
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
export function mapBossDropToRow(bossDrop: BossDrop): BossDropRow {
    return {
        id: bossDrop.id,
        name: bossDrop.name,
        icon_url: bossDrop.iconUrl,
        created_at: bossDrop.createdAt,
    };
}