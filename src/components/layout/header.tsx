"use client";

import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/domain/user/types";

import { useUserRole } from "@/hooks/useUserRole";

import HeaderLogo from "./header/header-logo";
import HeaderDesktopNav from "./header/header-desktop-nav";
import HeaderMobileNav from "./header/header-mobile-nav";
import HeaderBurger from "./header/header-burger";

interface HeaderProps {
    user: User | null;
    profile: Profile | null;
}

export default function Header({ user, profile }: HeaderProps): React.JSX.Element {
    const { isAdmin, isAuthenticated, loading } = useUserRole(user, profile);

    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    const toggleMenu = (): void => {
        if (open) {
            setClosing(true);
            setTimeout(() => {
                setOpen(false);
                setClosing(false);
            }, 300);
        } else {
            setOpen(true);
        }
    };

    return (
        <nav className="w-full bg-(--color-primary-80) backdrop-blur-md border-bottom-gold text-white fixed top-0 left-0 z-50">
            <div className="container mx-auto flex items-center justify-between h-14 px-6">

                <HeaderLogo />

                <HeaderDesktopNav
                    isAuthenticated={isAuthenticated}
                    isAdmin={isAdmin}
                    loading={loading}
                />

                <HeaderBurger open={open} toggleMenu={toggleMenu} />
            </div>

            <HeaderMobileNav
                open={open}
                closing={closing}
                toggleMenu={toggleMenu}
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                loading={loading}
            />
        </nav>
    );
}