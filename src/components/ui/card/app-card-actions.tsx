"use client";

import React from "react";

type AppCardActionsProps = {
    children: React.ReactNode;
    align?: "left" | "center" | "right" | "between";
    className?: string;
};

const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
} as const;

export default function AppCardActions({
    children,
    align = "right",
    className,
}: AppCardActionsProps) {
    const baseClasses = "flex gap-2 mt-3";
    const alignClass = alignStyles[align];

    return (
        <div className={`${baseClasses} ${alignClass} ${className ?? ""}`}>
            {children}
        </div>
    );
}