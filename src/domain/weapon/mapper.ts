import type { WeaponRow } from "./db";
import type { Weapon } from "./types";
import { WEAPON_TYPES } from '@/constants/weapon-types';
import { WEAPON_SUBSTATS } from "@/constants/weapon-substats";
import { SOURCES } from "@/constants/sources";
import { assertLiteral } from "@/lib/utils/assert-literal";

export function mapRowToWeapon(row: WeaponRow): Weapon {
    return {
        id: row.id,
        name: row.name,
        imageUrl: row.image_url,
        miniUrl: row.mini_url,
        rarity: row.rarity,

        weaponType: assertLiteral(row.weapon_type, WEAPON_TYPES),
        subStat: assertLiteral(row.sub_stat, WEAPON_SUBSTATS),
        source: assertLiteral(row.source, SOURCES),

        description: row.description,
        eliteDropSetId: row.elite_drop_set_id,
        mobDropSetId: row.mob_drop_set_id,
        weaponElevationDungeonDropSetId: row.weapon_elevation_dungeon_drop_set_id,
        createdAt: row.created_at
    };
}

export function mapWeaponToRow(entity: Weapon): WeaponRow {
    return {
        id: entity.id,
        name: entity.name,
        image_url: entity.imageUrl,
        mini_url: entity.miniUrl,
        rarity: entity.rarity,
        weapon_type: entity.weaponType,
        sub_stat: entity.subStat,
        source: entity.source,
        description: entity.description,
        elite_drop_set_id: entity.eliteDropSetId,
        mob_drop_set_id: entity.mobDropSetId,
        weapon_elevation_dungeon_drop_set_id: entity.weaponElevationDungeonDropSetId,
        created_at: entity.createdAt
    }
}