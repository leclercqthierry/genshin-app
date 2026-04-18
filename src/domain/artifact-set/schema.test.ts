import { describe, it, expect } from "vitest";
import { artifactSetSchema } from "./schema";

const validData = {
    name: "Briseur de glace",
    iconFlowerUrl: "https://example.com/flower.png",
    iconPlumeUrl: "https://example.com/plume.png",
    iconCircletUrl: "https://example.com/circlet.png",
    iconSandUrl: "https://example.com/sand.png",
    iconGobletUrl: "https://example.com/goblet.png",
    rarityMax: 5,
    bonus2P: "Augmente les DGT Cryo de 15%.",
    bonus4P: "Augmente les DGT infligés aux ennemis affectés par Cryo.",
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
        const data = { ...validData, iconFlowerUrl: "not-an-url" };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse une rareté hors limites", () => {
        const data = { ...validData, rarityMax: 6 };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse un bonus2P trop long", () => {
        const data = { ...validData, bonus2P: "a".repeat(501) };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("refuse un bonus4P trop long", () => {
        const data = { ...validData, bonus4P: "a".repeat(1501) };
        const result = artifactSetSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});