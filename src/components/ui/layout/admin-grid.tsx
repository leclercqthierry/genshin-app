"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type AdminGridVariant = "default" | "compact";

type AdminGridProps = {
    children: React.ReactNode;

    /**
     * Variante de densité :
     * - "default" : cartes normales (QuickLinkCard, BasicCard md)
     * - "compact" : cartes compactes (QuickLinkCard compact, BasicCard compact)
     */
    variant?: AdminGridVariant;

    /**
     * Active un mode plus dense :
     * - réduit le gap
     * - réduit la hauteur globale de la grille
     */
    dense?: boolean;

    /**
     * Permet d’ajuster manuellement le gap (ex: "gap-2", "gap-8").
     * Si défini, écrase le gap par défaut.
     */
    gap?: string;

    /**
     * Permet d’override le nombre de colonnes (ex: 4).
     * Si défini, écrase totalement la logique responsive.
     */
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

    // 2) Gestion des colonnes (override manuel)
    const columnsClass = columns
        ? `grid grid-cols-${columns}`
        : variant === "compact"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    return (
        <div className={cn(columnsClass, gapClass, className)}>
            {children}
        </div>
    );
}