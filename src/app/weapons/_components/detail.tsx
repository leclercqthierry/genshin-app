import Image from "next/image";
import PageHero from "@/components/layout/page-hero";
import AppCard from "@/components/ui/card/app-card";
import AppSection from "@/components/ui/layout/app-section";

import type { Weapon } from "@/domain/weapon/types";
import { weaponElevationDungeonDropSetService } from '@/services/supabase/weapon-elevation-dungeon-drop-set';
import { FARM_DAYS } from '@/constants/farm-days';
import { eliteDropSetService } from "@/services/supabase/elite-drop-set";
import { mobDropSetService } from '@/services/supabase/mob-drop-set';
import { WeaponAscensionTable } from "./ascension-table";

export default async function WeaponDetail({ weapon }: { weapon: Weapon }) {

    const elevationDropSet = await weaponElevationDungeonDropSetService.getOne(weapon.weaponElevationDungeonDropSetId);
    const eliteDropSet = await eliteDropSetService.getOne(weapon.eliteDropSetId);
    const mobDropSet = await mobDropSetService.getOne(weapon.mobDropSetId);
    const farmDays = elevationDropSet !== null ? FARM_DAYS[elevationDropSet.farmDaysIndex] : "inconnu";

    if (elevationDropSet !== null && eliteDropSet !== null && mobDropSet !== null) {

        return (
            <div>
                <PageHero title={weapon.name}>

                </PageHero>

                <AppCard
                    variant="default"
                    size="lg"
                    disableFloat={true}
                    className="lg:w-7/10 w-9/10 mx-auto my-6 text-white flex flex-col gap-4"
                >
                    <AppSection
                        variant="ghost"
                        className="flex flex-col lg:flex-row gap-6 items-center"
                    >
                        <div className="flex">
                            <Image
                                src={weapon.imageUrl}
                                alt={weapon.name}
                                height={352}
                                width={120}
                                className={`rounded-bl-lg rounded-tl-lg bg-rarity-${weapon.rarity} h-88 w-auto mb-0`}
                            />
                            <AppSection
                                className="rounded-none rounded-br-lg rounded-tr-lg flex flex-col justify-center bg-black"
                            >
                                <p>
                                    Rareté :{" "}
                                    <span className="text-yellow-400">
                                        {"⭐".repeat(weapon.rarity)}
                                    </span>
                                </p>

                                <p>
                                    Type :{` ${weapon.weaponType}`}
                                </p>

                                <p>
                                    Sous-stat :{` ${weapon.subStat}`}
                                </p>

                                <p>
                                    Obtention :{` ${weapon.source}`}
                                </p>

                                <p>
                                    Jours de farm :{` ${farmDays}`}
                                </p>
                            </AppSection>
                        </div>
                        <AppSection
                            title="Description:"
                            className="bg-black lg:flex-1 lg:h-fit flex flex-col justify-center"
                        >
                            <p className="">{weapon.description}</p>
                        </AppSection>
                    </AppSection>

                    <AppSection
                        title="Coût d'élévation :"
                        variant="ghost"
                        className="flex flex-col lg:w-6/10 mx-auto text-center"
                    >
                        <WeaponAscensionTable
                            weaponRarity={weapon.rarity}
                            elevationSet={elevationDropSet}
                            eliteSet={eliteDropSet}
                            mobSet={mobDropSet}
                        >
                        </WeaponAscensionTable>
                    </AppSection>
                </AppCard>
            </div >
        );
    }
}