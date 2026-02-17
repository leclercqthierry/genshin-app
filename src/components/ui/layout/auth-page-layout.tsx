"use client";

import React from "react";

type AuthPageLayoutProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};

export default function AuthPageLayout({
    title,
    children,
    className = "",
}: AuthPageLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className={`w-full max-w-md space-y-6 ${className}`}>
                <h1 className="w-full text-2xl font-bold text-center text-gold text-glow-gold">
                    {title}
                </h1>

                {children}
            </div>
        </div>
    );
}