"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

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

    return (
        <Link
            href={href}
            className={cn(
                "group bg-primary-60/40 border border-accent rounded-lg transition hover:-translate-y-1 hover:shadow-accent-glow",
                isCompact ? "p-3" : "p-6",
                className
            )}
        >
            <h2
                className={cn(
                    "font-semibold text-white group-hover:text-accent group-hover:drop-shadow-accent-glow",
                    isCompact ? "text-base" : "text-xl"
                )}
            >
                {title}
            </h2>

            <p
                className={cn(
                    "text-white/60 mt-2",
                    isCompact ? "text-xs leading-tight" : "text-sm"
                )}
            >
                {description}
            </p>
        </Link>
    );
}