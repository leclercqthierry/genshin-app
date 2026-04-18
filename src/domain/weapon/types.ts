import { WEAPON_TYPES } from "@/constants/weapon-types";
import { WEAPON_SUBSTATS } from "@/constants/weapon-substats";
import { SOURCES } from "@/constants/sources";

export type Weapon = {
    id: number;
    name: string;
    imageUrl: string;
    miniUrl: string;
    rarity: number;
    weaponType: typeof WEAPON_TYPES[number];
    subStat: typeof WEAPON_SUBSTATS[number];
    source: typeof SOURCES[number];
    description: string;
    eliteDropSetId: number;
    mobDropSetId: number;
    weaponElevationDungeonDropSetId: number;
    createdAt: string;
};
