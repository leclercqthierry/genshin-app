import { BaseSetRow, BaseSetCreateRow } from "../shared/base-set/db";

export type WeaponElevationSetRow = BaseSetRow & {
    rarity5_url: string;
    farm_days_index: number;
};

export type WeaponElevationSetCreateRow = BaseSetCreateRow & {
    rarity5_url: string;
    farm_days_index: number;
};

export type WeaponElevationSetUpdateRow = Partial<WeaponElevationSetCreateRow>;