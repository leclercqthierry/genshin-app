"use client";

import Link from "next/link";

type QuickLinkCardVariant = "default" | "compact";

type QuickLinkCardProps = {
    href: string;
    title: string;
    description: string;
    variant?: QuickLinkCardVariant;
    className?: string;
};

export default function QuickLinkCard({
    href,
    title,
    description,
    variant = "default",
    className,
}: QuickLinkCardProps) {
    const isCompact = variant === "compact";

    const baseClasses = `
        group 
        transition 
        rounded-lg 
        hover:-translate-y-1 
        hover-float
        shadow-[0_0_12px_var(--color-gold-glow)]
        hover:shadow-[0_0_18px_var(--color-gold-glow)]
        bg-[var(--color-primary)]/40
        border border-[var(--color-gold)]
    `;

    const paddingClass = isCompact ? "p-3" : "p-6";
    const titleClass = isCompact ? "text-base" : "text-xl";
    const descriptionClass = isCompact ? "text-xs leading-tight" : "text-sm";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${paddingClass} ${className ?? ""}`}
        >
            <h2
                className={`
                    font-semibold 
                    text-gold 
                    text-glow-gold
                    group-hover:text-gold
                    ${titleClass}
                `}
            >
                {title}
            </h2>

            <p className={`mt-2 text-white/70 ${descriptionClass}`}>
                {description}
            </p>
        </Link>
    );
}