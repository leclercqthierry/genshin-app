import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToWeaponElevationDungeonDropSet } from "@/domain/weapon-elevation-dungeon-drop-set/mapper";
import { WeaponElevationDungeonDropSet } from "@/domain/weapon-elevation-dungeon-drop-set/types";
import { WeaponElevationDungeonDropSetCreateRow, WeaponElevationDungeonDropSetRow } from "@/domain/weapon-elevation-dungeon-drop-set/db";

export const weaponElevationDungeonDropSetService = createBaseSetCrud<
    WeaponElevationDungeonDropSet,
    WeaponElevationDungeonDropSetRow,
    WeaponElevationDungeonDropSetCreateRow
>("weapon_elevation_dungeon_drop_sets", mapRowToWeaponElevationDungeonDropSet);
