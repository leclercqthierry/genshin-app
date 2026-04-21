import { WeaponElevationSet } from "./types";
import { WeaponElevationSetRow } from "./db";
import { mapBaseSetToRow, mapRowToBaseSet } from "../shared/base-set/mapper";

export const mapRowToWeaponElevationSet = (row: WeaponElevationSetRow): WeaponElevationSet =>
    mapRowToBaseSet(row, (r) => ({
        rarity5Url: r.rarity5_url,
        farmDaysIndex: r.farm_days_index,
    }));

export const mapWeaponElavationSetToRow = (entity: WeaponElevationSet): WeaponElevationSetRow =>
    mapBaseSetToRow(entity, (e) => ({
        rarity5_url: e.rarity5Url,
        farm_days_index: e.farmDaysIndex,
    }));

