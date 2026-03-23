import { describe, it, expect } from "vitest";
import { artifactSetSchema } from "./schema";

const validData = {
    name: "Briseur de glace",
    icon_flower_url: "https://example.com/flower.png",
    icon_plume_url: "https://example.com/plume.png",
    icon_circlet_url: "https://example.com/circlet.png",
    icon_sand_url: "https://example.com/sand.png",
    icon_goblet_url: "https://example.com/goblet.png",
    rarity_max: 5,
    bonus_2P: "Augmente les DGT Cryo de 15%.",
    bonus_4P: "Augmente les DGT infligés aux ennemis affectés par Cryo.",
};

describe("artifactSetSchema", () => {
    it("valide un set d'artéfacts correct", () => {
        const result = artifactSetSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("refuse un nom trop long", () => {
        const data = { ...validData, name: "a".repeat(101) };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse une URL invalide", () => {
        const data = { ...validData, icon_flower_url: "not-an-url" };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse une rareté hors limites", () => {
        const data = { ...validData, rarity_max: 6 };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse un bonus 2P trop long", () => {
        const data = { ...validData, bonus_2P: "a".repeat(501) };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse un bonus 4P trop long", () => {
        const data = { ...validData, bonus_4P: "a".repeat(1501) };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});