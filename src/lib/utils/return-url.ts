import type { WeaponElevationDungeonDropSet } from "@/domain/weapon-elevation-dungeon-drop-set/types";
import type { MobDropSet } from "@/domain/mob-drop-set/types";
import type { EliteDropSet } from "@/domain/elite-drop-set/types";

function isMobDropSet(
    set: MobDropSet | EliteDropSet | WeaponElevationDungeonDropSet
): set is MobDropSet {
    return "rarity1Url" in set;
}

function isWeaponElevationDungeonDropSet(
    set: MobDropSet | EliteDropSet | WeaponElevationDungeonDropSet
): set is WeaponElevationDungeonDropSet {
    return "rarity5Url" in set;
}

export function returnUrl(
    set: WeaponElevationDungeonDropSet | MobDropSet | EliteDropSet,
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

    if (rarity === 5 && isWeaponElevationDungeonDropSet(set)) {
        return set.rarity5Url;
    }

    return "";
}
