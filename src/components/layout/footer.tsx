import React from "react";
import NavLink from "../ui/navigation/nav-link";

export default function Footer(): React.JSX.Element {
    return (
        <footer className="w-full h-14 bg-(--color-primary-80) border-top-gold backdrop-blur-md text-white overflow-hidden">
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-6 gap-2 md:gap-0">

                <p className="text-sm text-muted">
                    © 2026 Genshin App — Non officiel
                </p>

                <div className="flex gap-6 text-sm">
                    <NavLink href="/about">À propos</NavLink>
                    <NavLink href="/privacy">Confidentialité</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </div>
            </div>
        </footer>
    );
}