export interface HeaderLink {
    label: string;
    href: string;
    adminOnly?: boolean;
    authOnly?: boolean;
    guestOnly?: boolean;
}

export const NAV_LINKS: HeaderLink[] = [
    { label: "Personnages", href: "/characters" },
    { label: "Armes", href: "/weapons" },
    { label: "Artéfacts", href: "/artifacts" },
    { label: "Équipes", href: "/teams" },

    // Liens invités
    { label: "Se connecter", href: "/login", guestOnly: true },
    { label: "S'inscrire", href: "/register", guestOnly: true },

    // Liens connectés
    { label: "Mon compte", href: "/account", authOnly: true },

    // Admin
    { label: "Admin", href: "/admin", adminOnly: true },
];