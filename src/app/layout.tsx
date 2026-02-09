import "../styles/variables.css";
import "../styles/animations.css";
import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
    title: "Genshin App",
    description: "Application pour la gestion des teams du jeu Genshin Impact",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <html lang="fr">
            <body className="min-h-screen bg-background text-foreground flex flex-col">
                <Header />

                <main className="flex-1 container mx-auto px-4 py-6">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}