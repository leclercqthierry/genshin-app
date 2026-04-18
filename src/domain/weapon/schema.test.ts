import { describe, it, expect } from "vitest";
import { weaponSchema } from "./schema";
import { RARITIES } from "@/constants/rarities";
import { WEAPON_TYPES } from "@/constants/weapon-types";
import { WEAPON_SUBSTATS } from "@/constants/weapon-substats";
import { SOURCES } from "@/constants/sources";

describe("weaponSchema", () => {
    const validData = {
        name: "Absolution",
        imageUrl: "https://example.com/weapon.png",
        miniUrl: "https://example.com/mini.png",
        rarity: RARITIES[2],
        weaponType: WEAPON_TYPES[0],
        subStat: WEAPON_SUBSTATS[0],
        source: SOURCES[0],
        mobDropSetId: 1,
        eliteDropSetId: 1,
        weaponElevationDungeonDropSetId: 1,
        description: "Une arme légendaire.",
    };

    it("valide un objet correct", () => {
        const result = weaponSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("refuse un nom vide", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            name: "",
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("Le nom est requis.");
    });

    it("refuse une imageUrl invalide", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            imageUrl: "not-a-url",
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("URL d'image d'arme invalide.");
    });

    it("refuse une miniUrl invalide", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            miniUrl: "invalid",
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("URL d'image miniature d'arme invalide.");
    });

    it("refuse une rareté hors bornes", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            rarity: Math.max(...RARITIES) + 1,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("rareté maximale invalide");
    });

    it("refuse un weaponType invalide", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            weaponType: "INVALID",
        });
        expect(result.success).toBe(false);
    });

    it("refuse une description vide", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            description: "",
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("description requise");
    });

    it("refuse une description trop longue", () => {
        const result = weaponSchema.safeParse({
            ...validData,
            description: "a".repeat(1001),
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("La description ne peut pas dépasser 1000 caractères");
    });
});
