import type { WeaponElevationDungeonDropSet } from "@/domain/weapon-elevation-dungeon-drop-set/types";
import type { EliteDropSet } from "@/domain/elite-drop-set/types";
import type { MobDropSet } from "@/domain/mob-drop-set/types";
import { getWeaponAscensionRows, itemRarityByLevel } from "@/constants/weapon-ascension-data";
import { returnUrl } from "@/lib/utils/return-url";

import AscensionCell from "./ascension-cell";

type Props = {
    weaponRarity: number;
    elevationSet: WeaponElevationDungeonDropSet;
    eliteSet: EliteDropSet;
    mobSet: MobDropSet;
};

export function WeaponAscensionTable({
    weaponRarity,
    elevationSet,
    eliteSet,
    mobSet,
}: Props) {
    const rows = getWeaponAscensionRows(weaponRarity);

    return (
        <table className="text-center table-fixed border-collapse bg-black">
            <thead>
                <tr className="border">
                    <th className="border-r px-2 py-2 w-20 lg:w-25">Seuil</th>
                    <th className="border-r px-2 py-2 w-20 lg:w-25">Donjon</th>
                    <th className="border-r px-2 py-2 w-20 lg:w-25">Elite</th>
                    <th className="border-r px-2 py-2 w-20 lg:w-25">Mob</th>
                    <th className="px-2 py-2 w-20 lg:w-25">Mora</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => {
                    const rarities = itemRarityByLevel[row.level];

                    return (
                        <tr key={row.level} className="border-b">
                            <td className="border py-2 px-2">{row.level}</td>

                            <AscensionCell
                                src={returnUrl(elevationSet, rarities.dungeon)}
                                count={row.dungeonCount}
                                rarity={rarities.dungeon}
                                setType="de donjon"
                            />

                            <AscensionCell
                                src={returnUrl(eliteSet, rarities.elite)}
                                count={row.eliteCount}
                                rarity={rarities.elite}
                                setType="d'élite"
                            />

                            <AscensionCell
                                src={returnUrl(mobSet, rarities.mob)}
                                count={row.mobCount}
                                rarity={rarities.mob}
                                setType="de mobs"
                            />

                            <td className="border-r py-2 px-2">{row.mora}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
