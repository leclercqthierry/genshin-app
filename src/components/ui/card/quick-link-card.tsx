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

    const paddingClass = isCompact ? "p-3" : "p-6";
    const titleClass = isCompact ? "text-base" : "text-xl";
    const descriptionClass = isCompact ? "text-xs leading-tight" : "text-sm";

    return (
        <Link
            href={href}
            className={`card-base card-hover ${paddingClass} ${className ?? ""} flex flex-col justify-center`}
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