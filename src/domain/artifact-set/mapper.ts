import type { ArtifactSet } from "./types";
import type { ArtifactSetRow } from "./db";

/**
 * DB → Domaine
 */
export function mapRowToArtifactSet(row: ArtifactSetRow): ArtifactSet {
    return {
        id: row.id,
        name: row.name,
        iconFlowerUrl: row.icon_flower_url,
        iconPlumeUrl: row.icon_plume_url,
        iconCircletUrl: row.icon_circlet_url,
        iconSandUrl: row.icon_sand_url,
        iconGobletUrl: row.icon_goblet_url,
        rarityMax: row.rarity_max,
        bonus2P: row.bonus_2P,
        bonus4P: row.bonus_4P,
        createdAt: row.created_at,
    };
}

/**
 * Domaine → DB (pour insert/update)
 */
export function mapArtifactSetToRow(artifactSet: ArtifactSet): ArtifactSetRow {
    return {
        id: artifactSet.id,
        name: artifactSet.name,
        icon_flower_url: artifactSet.iconFlowerUrl,
        icon_plume_url: artifactSet.iconPlumeUrl,
        icon_circlet_url: artifactSet.iconCircletUrl,
        icon_sand_url: artifactSet.iconSandUrl,
        icon_goblet_url: artifactSet.iconGobletUrl,
        rarity_max: artifactSet.rarityMax,
        bonus_2P: artifactSet.bonus2P,
        bonus_4P: artifactSet.bonus4P,
        created_at: artifactSet.createdAt,
    };
}