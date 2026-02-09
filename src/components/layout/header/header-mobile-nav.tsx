import React from "react";
import Link from "next/link";
import { logout } from "@/app/actions/logout";
import { NAV_LINKS } from "./header-nav-links";

interface HeaderMobileNavProps {
    open: boolean;
    closing: boolean;
    toggleMenu: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
}

export default function HeaderMobileNav({
    open,
    closing,
    toggleMenu,
    isAuthenticated,
    isAdmin,
    loading,
}: HeaderMobileNavProps): React.JSX.Element {
    if (!open) return <></>;

    return (
        <div
            className={`
        md:hidden flex flex-col bg-primary border-t border-accent p-4 gap-4
        ${closing ? "animate-fadeSlideOut" : "animate-fadeSlide"}
      `}
        >
            {NAV_LINKS.map((link) => {
                if (link.adminOnly && !isAdmin) return null;
                if (link.authOnly && !isAuthenticated) return null;
                if (link.guestOnly && isAuthenticated) return null;

                return (
                    <Link key={link.href} href={link.href} onClick={toggleMenu}>
                        {link.label}
                    </Link>
                );
            })}

            {!loading && isAuthenticated && (
                <form action={logout}>
                    <button type="submit">Déconnexion</button>
                </form>
            )}
        </div>
    );
}