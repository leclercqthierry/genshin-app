import { describe, it, expect } from "vitest";
import { mapRowToArtifactSet, mapArtifactSetToRow } from "./mapper";
import type { ArtifactSet } from "./types";
import type { ArtifactSetRow } from "./db";

describe("ArtifactSet mapper", () => {
    it("mapRowToArtifactSet convertit correctement une ligne DB → domaine", () => {
        const row: ArtifactSetRow = {
            id: 1,
            name: "Voyageur",
            icon_flower_url: "flower.png",
            icon_plume_url: "plume.png",
            icon_circlet_url: "circlet.png",
            icon_sand_url: "sand.png",
            icon_goblet_url: "goblet.png",
            rarity_max: 5,
            bonus_2P: "Augmente les DGT Cryo de 15%.",
            bonus_4P: "Augmente les DGT infligés aux ennemis affectés par Cryo.",
            created_at: "2024-01-01T00:00:00Z",
        };

        const result = mapRowToArtifactSet(row);

        expect(result).toEqual({
            id: 1,
            name: "Voyageur",
            iconFlowerUrl: "flower.png",
            iconPlumeUrl: "plume.png",
            iconCircletUrl: "circlet.png",
            iconSandUrl: "sand.png",
            iconGobletUrl: "goblet.png",
            rarityMax: 5,
            bonus2P: "Augmente les DGT Cryo de 15%.",
            bonus4P: "Augmente les DGT infligés aux ennemis affectés par Cryo.",
            createdAt: "2024-01-01T00:00:00Z",
        });
    });

    it("mapArtifactSetToRow convertit correctement domaine → DB", () => {
        const artifactSet: ArtifactSet = {
            id: 1,
            name: "Voyageur",
            iconFlowerUrl: "flower.png",
            iconPlumeUrl: "plume.png",
            iconCircletUrl: "circlet.png",
            iconSandUrl: "sand.png",
            iconGobletUrl: "goblet.png",
            rarityMax: 5,
            bonus2P: "Augmente les DGT Cryo de 15%.",
            bonus4P: "Augmente les DGT infligés aux ennemis affectés par Cryo.",
            createdAt: "2024-01-01T00:00:00Z",
        };

        const result = mapArtifactSetToRow(artifactSet);

        expect(result).toEqual({
            id: 1,
            name: "Voyageur",
            icon_flower_url: "flower.png",
            icon_plume_url: "plume.png",
            icon_circlet_url: "circlet.png",
            icon_sand_url: "sand.png",
            icon_goblet_url: "goblet.png",
            rarity_max: 5,
            bonus_2P: "Augmente les DGT Cryo de 15%.",
            bonus_4P: "Augmente les DGT infligés aux ennemis affectés par Cryo.",
            created_at: "2024-01-01T00:00:00Z",
        });
    });
});