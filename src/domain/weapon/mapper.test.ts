import { describe, it, expect } from "vitest";
import { mapRowToWeapon, mapWeaponToRow } from "./mapper";
import { WEAPON_TYPES } from "@/constants/weapon-types";
import { WEAPON_SUBSTATS } from "@/constants/weapon-substats";
import { SOURCES } from "@/constants/sources";

describe("Weapon mappers", () => {
    const row = {
        id: 1,
        name: "Absolution",
        image_url: "https://example.com/weapon.png",
        mini_url: "https://example.com/mini.png",
        rarity: 5,
        weapon_type: WEAPON_TYPES[0],
        sub_stat: WEAPON_SUBSTATS[0],
        source: SOURCES[0],
        description: "Une arme légendaire.",
        elite_drop_set_id: 10,
        mob_drop_set_id: 20,
        weapon_elevation_set_id: 30,
        created_at: "2024-01-01T00:00:00Z",
    };

    const entity = {
        id: 1,
        name: "Absolution",
        imageUrl: "https://example.com/weapon.png",
        miniUrl: "https://example.com/mini.png",
        rarity: 5,
        weaponType: WEAPON_TYPES[0],
        subStat: WEAPON_SUBSTATS[0],
        source: SOURCES[0],
        description: "Une arme légendaire.",
        eliteDropSetId: 10,
        mobDropSetId: 20,
        weaponElevationSetId: 30,
        createdAt: "2024-01-01T00:00:00Z",
    };

    it("mapRowToWeapon transforme correctement un WeaponRow en Weapon", () => {
        const result = mapRowToWeapon(row);

        expect(result).toEqual(entity);
    });

    it("mapWeaponToRow transforme correctement un Weapon en WeaponRow", () => {
        const result = mapWeaponToRow(entity);

        expect(result).toEqual(row);
    });

    it("mapRowToWeapon throw si weapon_type est invalide", () => {
        const invalidRow = { ...row, weapon_type: "INVALID" };

        expect(() => mapRowToWeapon(invalidRow)).toThrow();
    });

    it("mapRowToWeapon throw si sub_stat est invalide", () => {
        const invalidRow = { ...row, sub_stat: "WRONG" };

        expect(() => mapRowToWeapon(invalidRow)).toThrow();
    });

    it("mapRowToWeapon throw si source est invalide", () => {
        const invalidRow = { ...row, source: "UNKNOWN" };

        expect(() => mapRowToWeapon(invalidRow)).toThrow();
    });
});
