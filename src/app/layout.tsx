import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { createSupabaseClientReadOnly } from "@/lib/utils/supabase/clientReadOnly";
import { getProfile } from "@/services/supabase/user";

export const metadata: Metadata = {
    title: "Genshin App",
    description: "Application pour la gestion des teams du jeu Genshin Impact",
};

/**
 * Chargement des polices Geist (sans-serif et monospace)
 * via next/font pour une intégration optimisée.
 */
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

interface RootLayoutProps {
    children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const supabase = await createSupabaseClientReadOnly();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const profile = user ? await getProfile(user.id) : null;

    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background flex flex-col`}>

                <Header user={user} profile={profile} />

                <main className="flex-1 container mx-auto py-14">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}