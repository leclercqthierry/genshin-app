"use client";

import AppSelect from "@/components/ui/form/app-select";

interface SortOption<T extends string> {
    label: string;
    value: T;
}

interface FilterOption<T extends string | number> {
    label: string;
    value: string;   // pour le <select>
    rawValue: T;     // vraie valeur
}

export interface FilterConfig<T extends string | number> {
    key: string;
    value: T;
    onChange: (value: T) => void;
    options: FilterOption<T>[];
}

interface GalleryControlsProps<
    SortKey extends string,
    Filters extends readonly FilterConfig<string | number>[]
> {
    sortBy: SortKey;
    onSortChange: (value: SortKey) => void;
    sortOptions: SortOption<SortKey>[];

    filters: Filters;
}

export default function GalleryControls<
    SortKey extends string,
    Filters extends readonly FilterConfig<string | number>[]
>({
    sortBy,
    onSortChange,
    sortOptions,
    filters
}: GalleryControlsProps<SortKey, Filters>) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">

            {/* Tri */}
            <AppSelect
                className="flex-1 max-w-sm"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortKey)}
                options={sortOptions}
            />

            {/* Filtres */}
            {filters.map((filter) => (
                <AppSelect
                    key={filter.key}
                    className="flex-1 max-w-sm"
                    value={String(filter.value)}
                    onChange={(e) => {
                        const selected = filter.options.find(
                            (o) => o.value === e.target.value
                        );
                        if (!selected) return;
                        filter.onChange(selected.rawValue);
                    }}
                    options={filter.options.map((o) => ({
                        value: o.value,
                        label: o.label,
                    }))}
                />
            ))}
        </div>
    );
}
