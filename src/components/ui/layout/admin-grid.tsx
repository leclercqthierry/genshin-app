"use client";

import React from "react";

type AdminGridVariant = "default" | "compact";

type AdminGridProps = {
    children: React.ReactNode;
    variant?: AdminGridVariant;
    dense?: boolean;
    gap?: string;
    columns?: number;
    className?: string;
};

export default function AdminGrid({
    children,
    variant = "default",
    dense = false,
    gap,
    columns,
    className,
}: AdminGridProps) {
    // 1) Gestion du gap
    const gapClass = gap
        ? gap
        : dense
            ? "gap-3"
            : "gap-6";

    // 2) Gestion des colonnes
    const columnsClass = columns
        ? `grid grid-cols-${columns}`
        : variant === "compact"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    return (
        <div
            className={`${columnsClass} ${gapClass} ${className ?? ""} text-center`}
        >
            {children}
        </div>
    );
}