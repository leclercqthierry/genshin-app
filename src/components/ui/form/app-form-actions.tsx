"use client";

import React from "react";

type AppFormActionsProps = {
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

export default function AppFormActions({
    children,
    align = "right",
    className = "",
}: AppFormActionsProps) {
    return (
        <div
            className={`
                flex gap-3 pt-4 border-top-gold
                ${alignStyles[align]}
                ${className}
            `}
        >
            {children}
        </div>
    );
}