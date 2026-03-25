import { WeaponElevationDungeonDropSet } from "./types";
import { WeaponElevationDungeonDropSetRow } from "./db";
import { mapBaseSetToRow, mapRowToBaseSet } from "../shared/base-set/mapper";

export const mapRowToWeaponElevationDungeonDropSet = (row: WeaponElevationDungeonDropSetRow): WeaponElevationDungeonDropSet =>
    mapRowToBaseSet(row, (r) => ({
        rarity5Url: r.rarity5_url,
    }));

export const mapWeaponElavationDungeonDropSetToRow = (entity: WeaponElevationDungeonDropSet): WeaponElevationDungeonDropSetRow =>
    mapBaseSetToRow(entity, (e) => ({
        rarity5_url: e.rarity5Url,
    }));

