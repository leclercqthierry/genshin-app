import { BaseSetRow, BaseSetCreateRow } from "../shared/base-set/db";

export type WeaponElevationDungeonDropSetRow = BaseSetRow & {
    rarity5_url: string;
    farm_days_index: number;
};

export type WeaponElevationDungeonDropSetCreateRow = BaseSetCreateRow & {
    rarity5_url: string;
    farm_days_index: number;
};