"use client";

import { useState, useMemo } from "react";
import type { Weapon } from "@/domain/weapon/types";
import { RARITIES } from "@/constants/rarities";
import { WEAPON_TYPES } from "@/constants/weapon-types";

import Link from "next/link";
import GalleryPage from "@/components/layout/gallery-page";
import WeaponCard from "@/domain/weapon/card";
import GalleryControls from "@/components/ui/gallery-controls";

export default function WeaponsGalleryClient({
    weapons,
}: {
    weapons: Weapon[];
}) {
    const [sortBy, setSortBy] = useState<"name" | "rarity" | "weaponType">("name");
    const [rarityFilter, setRarityFilter] = useState<string | number>("all");
    const [weaponTypeFilter, setWeaponTypeFilter] = useState<string | number>("all");

    const allowedRarities = useMemo(() => [...RARITIES], []);


    // 1) Filtrage
    const filteredWeapons = useMemo(() => {
        let result = weapons;

        if (rarityFilter !== "all") {
            const rarity = Number(rarityFilter);
            result = result.filter((w) => w.rarity === rarity);
        }


        if (weaponTypeFilter !== "all") {
            const type = String(weaponTypeFilter);
            result = result.filter((w) => w.weaponType === type);
        }

        return result;
    }, [weapons, rarityFilter, weaponTypeFilter]);


    // 2) Tri
    const sortedWeapons = useMemo(() => {
        const copy = [...filteredWeapons];

        if (sortBy === "name") {
            return copy.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (sortBy === "rarity") {
            return copy.sort((a, b) => b.rarity - a.rarity);
        }

        if (sortBy === "weaponType") {
            return copy.sort((a, b) => a.weaponType.localeCompare(b.weaponType));
        }

        return copy;
    }, [filteredWeapons, sortBy]);

    return (
        <GalleryPage
            title="Gallerie d'armes"
            count={`Il y a actuellement ${weapons.length} arme${weapons.length > 1 ? "s" : ""} dans l'application.`}
            variant="compact"
            items={sortedWeapons}
            emptyState={
                <p>Aucune arme ne correspond à vos filtres.</p>
            }
            extra={
                <GalleryControls
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    sortOptions={[
                        { value: "name", label: "Trier par nom" },
                        { value: "rarity", label: "Trier par rareté" },
                        { value: "weaponType", label: "Trier par type d'arme" }
                    ]}
                    filters={[
                        {
                            key: "rarity",
                            value: rarityFilter,
                            onChange: setRarityFilter,
                            options: [
                                { value: "all", rawValue: "all", label: "Toutes les raretés" },
                                ...allowedRarities.map((r) => ({
                                    value: String(r),
                                    rawValue: r,
                                    label: "⭐".repeat(r),
                                })),
                            ],
                        },
                        {
                            key: "weaponType",
                            value: weaponTypeFilter,
                            onChange: setWeaponTypeFilter,
                            options: [
                                { value: "all", rawValue: "all", label: "Tous les types" },
                                ...WEAPON_TYPES.map((t) => ({
                                    value: t,
                                    rawValue: t,
                                    label: t,
                                })),
                            ],
                        },
                    ]}
                />
            }
            renderItem={(weapon) => (
                <Link
                    key={weapon.id}
                    href={`/weapons/${weapon.id}/`}
                    className="block"
                >
                    <WeaponCard
                        weapon={weapon}
                        rarityBgClass={weapon.rarity.toString()}
                    />
                </Link>
            )}
        />

    );
}