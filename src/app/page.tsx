"use client";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 text-center text-white/80">

                <h1 className="text-3xl font-bold text-gold">
                    Bienvenue
                </h1>

                <p className="text-white/60">
                    Ceci est une page d’accueil minimale pour accéder aux pages d’authentification.
                </p>
            </div>
        </div>
    );
}