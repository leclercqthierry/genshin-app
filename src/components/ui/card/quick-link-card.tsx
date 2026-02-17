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

    const baseClasses =
        "group bg-primary-60/40 border border-gold rounded-lg transition hover:-translate-y-1 hover:shadow-gold-glow";

    const paddingClass = isCompact ? "p-3" : "p-6";

    const titleClass = isCompact ? "text-base" : "text-xl";

    const descriptionClass = isCompact
        ? "text-xs leading-tight"
        : "text-sm";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${paddingClass} ${className ?? ""}`}
        >
            <h2
                className={`font-semibold text-white group-hover:text-gold group-hover:drop-shadow-gold-glow ${titleClass}`}
            >
                {title}
            </h2>

            <p className={`text-white/60 mt-2 ${descriptionClass}`}>
                {description}
            </p>
        </Link>
    );
}