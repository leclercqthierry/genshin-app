"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    className = "",
}: NavLinkProps): React.JSX.Element {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={`relative navlink-group ${className}`}
        >
            <span
                className={`navlink-text transition ${isActive ? "text-gold text-glow-gold" : "text-white"
                    }`}
            >
                {children}
            </span>

            <span
                className={`navlink-underline absolute left-0 -bottom-1 h-0.5 bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0"
                    }`}
            />
        </Link>
    );
}