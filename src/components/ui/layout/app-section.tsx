"use client";

import React from "react";

type AppSectionProps = {
    title?: string;
    children: React.ReactNode;
    variant?: "default" | "subtle" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
};

const variantStyles = {
    default: `
        bg-[var(--color-primary-80)]
        border border-[var(--color-gold)]
        shadow-[0_0_6px_var(--color-gold-glow)]
    `,
    subtle: `
        bg-[var(--color-primary-80)]/40
        border border-white/10
    `,
    ghost: `
        bg-transparent
        border border-transparent
    `,
} as const;

const sizeStyles = {
    sm: "p-3 rounded-md space-y-3",
    md: "p-4 rounded-lg space-y-4",
    lg: "p-6 rounded-xl space-y-5",
} as const;

export default function AppSection({
    title,
    children,
    variant = "default",
    size = "md",
    className = "",
}: AppSectionProps) {
    return (
        <section aria-label={title}
            className={`
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                transition
                ${className}
            `}
        >
            {title && (
                <h3 className="text-gold text-glow-gold font-semibold text-lg mb-2">
                    {title}
                </h3>
            )}

            {children}
        </section>
    );
}