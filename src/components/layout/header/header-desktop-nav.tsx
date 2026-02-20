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
                    <button type="submit" className="navlink-base navlink-group">
                        <span className="navlink-text">Déconnexion</span>
                        <span className="navlink-underline" />
                    </button>
                </form>
            )}
        </div>
    );
}