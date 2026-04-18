import { describe, it, expect } from "vitest";
import { weaponElevationDungeonDropSetSchema } from "@/domain/weapon-elevation-dungeon-drop-set/schema";

describe("weaponElevationDungeonDropSetSchema", () => {
    const base = {
        name: "Test",
        iconUrl: "https://example.com/icon.png",
    };

    it("accepte un schéma valide avec rarity5Url", () => {
        const data = {
            name: "Test",
            iconUrl: "https://example.com/icon.png",

            // champs obligatoires du baseSetSchema
            rarity2Url: "https://example.com/r2.png",
            rarity3Url: "https://example.com/r3.png",
            rarity4Url: "https://example.com/r4.png",

            // champ ajouté dans ce schéma
            rarity5Url: "https://example.com/r5.png",
            farmDaysIndex: 1,
        };

        expect(() => weaponElevationDungeonDropSetSchema.parse(data)).not.toThrow();
    });

    it("rejette si rarity5Url est manquant", () => {
        expect(() =>
            weaponElevationDungeonDropSetSchema.parse(base)
        ).toThrow();
    });

    it("rejette si rarity5Url n’est pas une URL valide", () => {
        const data = {
            ...base,
            rarity5Url: "not-a-url",
        };

        expect(() =>
            weaponElevationDungeonDropSetSchema.parse(data)
        ).toThrow("URL invalide");
    });
});