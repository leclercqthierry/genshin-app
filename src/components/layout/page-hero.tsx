"use client";

import React from "react";

type PageHeroProps = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

export default function PageHero({ title, children, className }: PageHeroProps) {
    return (
        <section className={`p-6 text-center bg-(--color-primary)/40 border-bottom-gold ${className ?? ""}`}>
            <h1 className="text-3xl font-bold text-gold text-glow-gold">
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