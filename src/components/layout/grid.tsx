"use client";

import React from "react";

export type GridVariant = "default" | "compact";

export type GridProps = {
    children: React.ReactNode;
    variant?: GridVariant;
    dense?: boolean;
    gap?: string;
    columns?: number;
    className?: string;
};

export default function Grid({
    children,
    variant = "default",
    dense = false,
    gap,
    columns,
    className,
}: GridProps) {
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