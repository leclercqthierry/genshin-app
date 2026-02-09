"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type CardVariant = "default" | "accent" | "ghost";
type CardSize = "sm" | "md" | "lg";

interface AppCardProps {
    children: React.ReactNode;
    href?: string;
    variant?: CardVariant;
    size?: CardSize;
    disableFloat?: boolean;
    className?: string;
}

const variantStyles: Record<CardVariant, string> = {
    default:
        "bg-primary-60 border border-accent shadow-accent-glow hover:shadow-accent-glow/80",
    accent:
        "bg-accent text-black border border-black/20 shadow-accent-glow hover:shadow-accent-glow/80",
    ghost:
        "bg-transparent border border-white/10 hover:bg-white/5 shadow-none",
};

const sizeStyles: Record<CardSize, string> = {
    sm: "p-2 rounded-md",
    md: "p-3 rounded-lg",
    lg: "p-4 rounded-xl",
};

export default function AppCard({
    children,
    href,
    variant = "default",
    size = "md",
    disableFloat = false,
    className,
}: AppCardProps) {
    const Wrapper = href ? "a" : "div";

    return (
        <Wrapper
            {...(href ? { href, role: "link", tabIndex: 0 } : {})}
            className={cn(
                "group transition-all duration-300 ease-out",
                variantStyles[variant],
                sizeStyles[size],
                !disableFloat && "hover:-translate-y-1",
                className
            )}
        >
            {children}
        </Wrapper>
    );
}