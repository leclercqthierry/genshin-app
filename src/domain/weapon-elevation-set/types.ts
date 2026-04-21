import type { BaseSet } from "@/domain/shared/base-set/types";

export type WeaponElevationSet = BaseSet & {
    rarity5Url: string;
    farmDaysIndex: number;
};