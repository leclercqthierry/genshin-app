import { describe, it, expect } from "vitest";
import { weaponElevationSetSchema } from "@/domain/weapon-elevation-set/schema";

describe("weaponElevationSetSchema", () => {
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

        expect(() => weaponElevationSetSchema.parse(data)).not.toThrow();
    });

    it("rejette si rarity5Url est manquant", () => {
        expect(() =>
            weaponElevationSetSchema.parse(base)
        ).toThrow();
    });

    it("rejette si rarity5Url n’est pas une URL valide", () => {
        const data = {
            ...base,
            rarity5Url: "not-a-url",
        };

        expect(() =>
            weaponElevationSetSchema.parse(data)
        ).toThrow("URL invalide");
    });
});