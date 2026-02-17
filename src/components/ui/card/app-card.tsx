"use client";

import React from "react";

type CardVariant = "default" | "gold" | "ghost";
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
        "bg-primary-60 border border-gold shadow-gold-glow hover:shadow-gold-glow/80",
    gold:
        "bg-gold text-black border border-black/20 shadow-gold-glow hover:shadow-gold-glow/80",
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

    const baseClasses = "group transition-all duration-300 ease-out";
    const variantClass = variantStyles[variant];
    const sizeClass = sizeStyles[size];
    const floatClass = disableFloat ? "" : "hover:-translate-y-1";

    const finalClassName = `${baseClasses} ${variantClass} ${sizeClass} ${floatClass} ${className ?? ""}`;

    return (
        <Wrapper
            {...(href ? { href, role: "link", tabIndex: 0 } : {})}
            className={finalClassName}
        >
            {children}
        </Wrapper>
    );
}