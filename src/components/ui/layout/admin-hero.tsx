"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type AdminHeroProps = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

export default function AdminHero({ title, children, className }: AdminHeroProps) {
    return (
        <section
            className={cn(
                "px-6 py-12 text-center bg-primary-60/40 border-b border-white/10",
                className
            )}
        >
            <h1 className="text-3xl font-bold text-accent drop-shadow-accent-glow">
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