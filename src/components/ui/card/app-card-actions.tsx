"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

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
    return (
        <div
            className={cn(
                "flex gap-2 mt-3",
                alignStyles[align],
                className
            )}
        >
            {children}
        </div>
    );
}