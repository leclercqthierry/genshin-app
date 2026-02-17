"use client";

import Image from "next/image";

type BasicCardVariant = "default" | "gold" | "ghost";
type BasicCardSize = "compact" | "sm" | "md" | "lg";
type Rarity = 1 | 2 | 3 | 4 | 5;

interface BasicCardProps {
    title: string;
    image: string;
    href?: string;
    variant?: BasicCardVariant;
    size?: BasicCardSize;
    hover?: boolean;
    rarity?: Rarity;
    className?: string;
}

const variantStyles: Record<BasicCardVariant, string> = {
    default: "border border-gold shadow-gold-glow",
    gold: "border border-gold shadow-gold-glow",
    ghost: "border border-white/10",
};

const sizeStyles: Record<BasicCardSize, string> = {
    compact: "p-1 rounded-md text-[10px]",
    sm: "p-2 rounded-md text-xs",
    md: "p-3 rounded-lg text-sm",
    lg: "p-4 rounded-xl text-base",
};

const imageSizes: Record<BasicCardSize, string> = {
    compact: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
};

const rarityStyles: Record<Rarity, string> = {
    1: "bg-rarity-1",
    2: "bg-rarity-2",
    3: "bg-rarity-3",
    4: "bg-rarity-4",
    5: "bg-rarity-5",
};

export default function BasicCard({
    title,
    image,
    href,
    variant = "default",
    size = "md",
    hover = true,
    rarity,
    className,
}: BasicCardProps) {
    const Wrapper = href ? "a" : "div";

    const baseClasses = "flex flex-col items-center text-center transition";

    const rarityClass = rarity ? rarityStyles[rarity] : "bg-primary-60";

    const variantClass = variantStyles[variant];

    const sizeClass = sizeStyles[size];

    const hoverClass = hover ? "hover:-translate-y-1" : "";

    const finalClassName = `${baseClasses} ${rarityClass} ${variantClass} ${sizeClass} ${hoverClass} ${className ?? ""}`;

    return (
        <Wrapper {...(href ? { href } : {})} className={finalClassName}>
            <div className={`relative ${imageSizes[size]}`}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="64px"
                />
            </div>

            <p className="text-white mt-2 line-clamp-2">{title}</p>
        </Wrapper>
    );
}