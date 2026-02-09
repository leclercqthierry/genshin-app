"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface AppButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    full?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    type?: "button" | "submit" | "reset";
}

/**
 * AppButton — composant bouton du design system.
 *
 * - Variants : primary, secondary, ghost, danger
 * - Sizes : sm, md, lg
 * - Loading state
 * - Disabled state
 * - Full width
 * - Rend automatiquement <button> ou <Link>
 * - 100% Tailwind + variables CSS
 * - A11y : aria-disabled, aria-busy
 */
export default function AppButton({
    children,
    href,
    onClick,
    disabled = false,
    loading = false,
    full = false,
    variant = "primary",
    size = "md",
    className,
    type = "button",
}: AppButtonProps): React.JSX.Element {
    const isDisabled = disabled || loading;

    const baseStyles =
        "inline-flex items-center justify-center font-semibold rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

    const variantStyles: Record<ButtonVariant, string> = {
        primary:
            "bg-accent text-black hover:bg-accent/90 active:bg-accent/80 disabled:bg-white/10 disabled:text-white/40",
        secondary:
            "bg-primary-60 text-white border border-white/20 hover:bg-primary-50 active:bg-primary-40 disabled:bg-primary-80 disabled:text-white/40",
        ghost:
            "bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20 disabled:text-white/30",
        danger:
            "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 disabled:bg-red-900/40 disabled:text-white/40",
    };

    const sizeStyles: Record<ButtonSize, string> = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
    };

    const classes = cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        full && "w-full",
        isDisabled && "cursor-not-allowed",
        className
    );

    const content = loading ? "Chargement..." : children;

    if (href) {
        return (
            <Link
                href={href}
                aria-disabled={isDisabled}
                aria-busy={loading}
                className={classes}
                onClick={isDisabled ? undefined : onClick}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-busy={loading}
            onClick={isDisabled ? undefined : onClick}
            className={classes}
        >
            {content}
        </button>
    );
}