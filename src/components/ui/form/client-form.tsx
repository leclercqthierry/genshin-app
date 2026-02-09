"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type AppFormProps = {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    variant?: "default" | "accent" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
};

const variantStyles = {
    default:
        "bg-primary-60/70 border border-accent/40 shadow-accent-glow",
    accent:
        "bg-accent/20 border border-accent shadow-accent-glow",
    ghost:
        "bg-transparent border border-white/10",
} as const;

const sizeStyles = {
    sm: "p-4 space-y-3 rounded-md",
    md: "p-6 space-y-4 rounded-lg",
    lg: "p-8 space-y-5 rounded-xl",
} as const;

export default function AppForm({
    children,
    onSubmit,
    variant = "default",
    size = "md",
    className,
}: AppFormProps) {
    return (
        <form
            onSubmit={onSubmit}
            className={cn(
                variantStyles[variant],
                sizeStyles[size],
                "transition",
                className
            )}
        >
            <p className="text-sm text-white/60 flex items-center gap-1">
                <span className="text-red-400 font-bold">*</span>
                <span>indique un champ obligatoire</span>
            </p>

            {children}
        </form>
    );
}