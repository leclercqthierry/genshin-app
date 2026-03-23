export interface HeaderLink {
    label: string;
    href: string;
    adminOnly?: boolean;
    userOnly?: boolean;
    guestOnly?: boolean;
}

export const NAV_LINKS: HeaderLink[] = [
    { label: "Personnages", href: "/characters" },
    { label: "Armes", href: "/weapons" },
    { label: "Artéfacts", href: "/artifact-sets" },
    { label: "Équipes", href: "/teams" },

    // Liens invités
    { label: "Se connecter", href: "/auth/login", guestOnly: true },
    { label: "S'inscrire", href: "/auth/register", guestOnly: true },

    // Liens connectés
    { label: "Mon compte", href: "/my-account", userOnly: true },

    // Admin
    { label: "Admin", href: "/admin", adminOnly: true },
];