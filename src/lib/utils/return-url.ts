import type { WeaponElevationSet } from "@/domain/weapon-elevation-set/types";
import type { MobDropSet } from "@/domain/mob-drop-set/types";
import type { EliteDropSet } from "@/domain/elite-drop-set/types";

function isMobDropSet(
    set: MobDropSet | EliteDropSet | WeaponElevationSet
): set is MobDropSet {
    return "rarity1Url" in set;
}

function isWeaponElevationSet(
    set: MobDropSet | EliteDropSet | WeaponElevationSet
): set is WeaponElevationSet {
    return "rarity5Url" in set;
}

export function returnUrl(
    set: WeaponElevationSet | MobDropSet | EliteDropSet,
    rarity: 1 | 2 | 3 | 4 | 5
): string {

    if (rarity === 1 && isMobDropSet(set)) {
        return set.rarity1Url;
    }

    if (rarity === 2) return set.rarity2Url;
    if (rarity === 3) return set.rarity3Url;

    if (rarity === 4 && !isMobDropSet(set)) {
        return set.rarity4Url;
    }

    if (rarity === 5 && isWeaponElevationSet(set)) {
        return set.rarity5Url;
    }

    return "";
}
