"use client";

import Link from "next/link";
import React from "react";

import { buttonBaseStyles } from "./button-base";
import { buttonVariantStyles } from "./button-variants";
import { buttonSizeStyles } from "./button-sizes";

type ButtonVariant = keyof typeof buttonVariantStyles;
type ButtonSize = keyof typeof buttonSizeStyles;

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

export default function AppButton({
    children,
    href,
    onClick,
    disabled = false,
    loading = false,
    full = false,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
}: AppButtonProps): React.JSX.Element {
    const isDisabled = disabled || loading;

    const classes = `
        ${buttonBaseStyles}
        ${buttonVariantStyles[variant]}
        ${buttonSizeStyles[size]}
        ${full ? "w-full" : ""}
        ${isDisabled ? "cursor-not-allowed" : ""}
        ${className}
    `.trim();

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