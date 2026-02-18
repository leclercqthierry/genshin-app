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
    default: `
    card-bg-primary
    card-border-gold
    card-shadow-gold
    hover:card-shadow-gold
  `,
    gold: `
    card-bg-gold
    card-border-light
    card-shadow-gold
    hover:card-shadow-gold
  `,
    ghost: `
    bg-transparent
    card-border-light
    hover:bg-white/5
  `,
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