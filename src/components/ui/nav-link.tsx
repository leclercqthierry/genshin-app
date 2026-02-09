"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import React from "react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function NavLink({
    href,
    children,
    onClick,
    className,
}: NavLinkProps): React.JSX.Element {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={cn("relative group", className)}
        >
            {/* Texte */}
            <span
                className={cn(
                    "transition",
                    "group-hover:text-accent group-hover:drop-shadow-[0_0_6px_var(--color-accent-glow)]",
                    isActive && "text-accent drop-shadow-[0_0_6px_var(--color-accent-glow)]"
                )}
            >
                {children}
            </span>

            {/* Barre animée */}
            <span
                className={cn(
                    "absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                )}
            />
        </Link>
    );
}