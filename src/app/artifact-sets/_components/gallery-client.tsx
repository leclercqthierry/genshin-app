"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import GalleryPage from "@/components/layout/gallery-page";
import MiniArtifactSetCard from "@/domain/artifact-set/mini-card";
import GalleryControls from "@/components/ui/gallery-controls";
import type { ArtifactSet } from "@/domain/artifact-set/types";

export default function ArtifactSetsGalleryClient({
    artifactSets,
}: {
    artifactSets: ArtifactSet[];
}) {
    const [sortBy, setSortBy] = useState<"name" | "rarity">("name");
    const [rarityFilter, setRarityFilter] = useState<string | number>("all");
    const allowedRarities = useMemo(() => [3, 4, 5], []);


    // 1) Filtrage
    const filteredSets = useMemo(() => {
        if (rarityFilter === "all") return artifactSets;

        const rarity = Number(rarityFilter);
        return artifactSets.filter((s) => s.rarityMax === rarity);
    }, [artifactSets, rarityFilter]);


    // 2) Tri
    const sortedSets = useMemo(() => {
        const copy = [...filteredSets];

        if (sortBy === "name") {
            return copy.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (sortBy === "rarity") {
            return copy.sort((a, b) => b.rarityMax - a.rarityMax);
        }

        return copy;
    }, [filteredSets, sortBy]);

    return (
        <GalleryPage
            title="Gallerie de sets d'artéfacts"
            count={`Il y a actuellement ${artifactSets.length} set${artifactSets.length > 1 ? "s" : ""} d'artéfacts dans l'application.`}
            variant="compact"
            items={sortedSets}
            emptyState={
                <p>Aucun set ne correspond à vos filtres.</p>
            }
            extra={
                <GalleryControls
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    sortOptions={[
                        { value: "name", label: "Trier par nom" },
                        { value: "rarity", label: "Trier par rareté" },
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
                    ]}
                />

            }
            renderItem={(artifactSet) => (
                <Link
                    key={artifactSet.id}
                    href={`/artifact-sets/${artifactSet.id}/`}
                    className="block"
                >
                    <MiniArtifactSetCard
                        artifactSet={artifactSet}
                        rarityBgClass={`bg-rarity-${artifactSet.rarityMax}`}
                    />
                </Link>
            )}
        />

    );
}