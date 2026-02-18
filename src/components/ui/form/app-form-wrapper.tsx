"use client";

import React from "react";

type AppFormWrapperProps = {
    children: React.ReactNode;
    onSubmit?: React.ComponentProps<"form">["onSubmit"];
    action?: (formData: FormData) => void;
    variant?: "default" | "gold" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
};

const variantStyles = {
    default: "bg-[var(--color-primary-80)] border border-[var(--color-gold)]/40 shadow-[0_0_6px_var(--color-gold-glow)]",
    gold: "bg-[var(--color-gold)]/20 border border-[var(--color-gold)] shadow-[0_0_6px_var(--color-gold-glow)]",
    ghost: "bg-transparent border border-white/10",
} as const;

const sizeStyles = {
    sm: "p-4 space-y-3 rounded-md",
    md: "p-6 space-y-4 rounded-lg",
    lg: "p-8 space-y-5 rounded-xl",
} as const;

export default function AppFormWrapper({
    children,
    onSubmit,
    action,
    variant = "default",
    size = "md",
    className = "",
}: AppFormWrapperProps) {
    return (
        <form
            noValidate
            onSubmit={onSubmit}
            action={action}
            className={`
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                transition
                ${className}
            `}
        >
            <p className="text-sm text-white/60 flex items-center gap-1">
                <span className="text-red-400 font-bold">*</span>
                <i>indique un champ obligatoire</i>
            </p>

            {children}
        </form>
    );
}