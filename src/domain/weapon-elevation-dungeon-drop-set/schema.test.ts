import { describe, it, expect } from "vitest";
import { weaponElevationDungeonDropSetSchema } from "@/domain/weapon-elevation-dungeon-drop-set/schema";

describe("weaponElevationDungeonDropSetSchema", () => {
    const base = {
        name: "Test",
        rarityMin: 3,
        rarityMax: 5,
        icon_url: "https://example.com/icon.png",
    };

    it("accepte un schéma valide avec rarity5_url", () => {
        const data = {
            name: "Test",
            rarityMin: 3,
            rarityMax: 5,
            icon_url: "https://example.com/icon.png",

            // champs obligatoires du baseSetSchema
            rarity2_url: "https://example.com/r2.png",
            rarity3_url: "https://example.com/r3.png",
            rarity4_url: "https://example.com/r4.png",

            // champ ajouté dans ce schéma
            rarity5_url: "https://example.com/r5.png",
        };

        expect(() => weaponElevationDungeonDropSetSchema.parse(data)).not.toThrow();
    });

    it("rejette si rarity5_url est manquant", () => {
        expect(() =>
            weaponElevationDungeonDropSetSchema.parse(base)
        ).toThrow();
    });

    it("rejette si rarity5_url n’est pas une URL valide", () => {
        const data = {
            ...base,
            rarity5_url: "not-a-url",
        };

        expect(() =>
            weaponElevationDungeonDropSetSchema.parse(data)
        ).toThrow("URL invalide");
    });
});