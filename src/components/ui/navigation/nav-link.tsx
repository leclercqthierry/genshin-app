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
            className={`navlink-base navlink-group ${className}`}
        >
            <span
                className={`navlink-text ${isActive ? "text-gold text-glow-gold" : ""}`}
            >
                {children}
            </span>

            <span
                className={`navlink-underline ${isActive ? "w-full" : ""}`}
            />
        </Link>
    );
}