"use client";

import AppSelect from "@/components/ui/form/app-select";
export const RARITIES = [1, 2, 3, 4, 5];

interface GalleryControlsProps {
    sortBy: "name" | "rarity";
    onSortChange: (value: "name" | "rarity") => void;

    rarityFilter: number | "all";
    onRarityFilterChange: (value: number | "all") => void;
}

export default function GalleryControls({
    sortBy,
    onSortChange,
    rarityFilter,
    onRarityFilterChange,
}: GalleryControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">

            {/* Tri */}
            <AppSelect
                className="flex-1 max-w-sm"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as "name" | "rarity")}
                options={[
                    { value: "name", label: "Trier par nom" },
                    { value: "rarity", label: "Trier par rareté" },
                ]}
            />

            {/* Filtre par rareté */}
            <AppSelect
                className="flex-1 max-w-sm"
                value={rarityFilter}
                onChange={(e) => {
                    const v = e.target.value;
                    onRarityFilterChange(v === "all" ? "all" : Number(v));
                }}
                options={[
                    { value: "all", label: "Toutes les raretés" },
                    ...RARITIES.map((r) => ({
                        value: String(r),
                        label: `${r}⭐`,
                    })),
                ]}
            />
        </div>
    );
}