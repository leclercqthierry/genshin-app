"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type AppFormSectionProps = {
    title?: string;
    children: React.ReactNode;
    variant?: "default" | "subtle" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
};

const variantStyles = {
    default: "bg-primary-60/40 border border-accent/20 shadow-accent-glow/20",
    subtle: "bg-primary-60/20 border border-white/10",
    ghost: "bg-transparent border border-transparent",
} as const;

const sizeStyles = {
    sm: "p-3 rounded-md space-y-3",
    md: "p-4 rounded-lg space-y-4",
    lg: "p-6 rounded-xl space-y-5",
} as const;

export default function AppFormSection({
    title,
    children,
    variant = "default",
    size = "md",
    className,
}: AppFormSectionProps) {
    return (
        <section
            className={cn(
                variantStyles[variant],
                sizeStyles[size],
                "transition",
                className
            )}
        >
            {title && (
                <h3 className="text-white font-semibold text-lg mb-2">
                    {title}
                </h3>
            )}

            {children}
        </section>
    );
}