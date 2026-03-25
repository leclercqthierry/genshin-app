"use client";

import React from "react";

type PageHeroProps = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

export default function PageHero({ title, children, className }: PageHeroProps) {
    return (
        // on doit annuler le max-width et le padding interne donné par container dans le RootLayout pour retrouver un hero full-width
        <section className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] p-6 text-center bg-(--color-primary)/40 border-bottom-gold ${className ?? ""}`}>
            <h1 className="text-3xl font-bold text-gold text-glow-gold pt-2">
                {title}
            </h1>

            {children && (
                <div className="mt-4 text-white/70">
                    {children}
                </div>
            )}
        </section>
    );
}