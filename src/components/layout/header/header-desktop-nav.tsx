import React from "react";
import NavLink from "@/components/ui/navigation/nav-link";
import { logout } from "@/app/auth/actions/logout";
import { NAV_LINKS } from "./header-nav-links";

interface HeaderDesktopNavProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
}

export default function HeaderDesktopNav({
    isAuthenticated,
    isAdmin,
    loading,
}: HeaderDesktopNavProps): React.JSX.Element {
    return (
        <div className="hidden md:flex gap-8 text-lg">
            {NAV_LINKS.map((link) => {
                if (link.adminOnly && !isAdmin) return null;
                if (link.authOnly && !isAuthenticated) return null;
                if (link.guestOnly && isAuthenticated) return null;

                return (
                    <NavLink key={link.href} href={link.href}>
                        {link.label}
                    </NavLink>
                );
            })}

            {!loading && isAuthenticated && (
                <form action={logout}>
                    <button type="submit" className="relative group">
                        <span className="transition group-hover:text-gold group-hover:drop-shadow-[0_0_6px_var(--color-gold-glow)]">
                            Déconnexion
                        </span>
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                    </button>
                </form>
            )}
        </div>
    );
}