"use client";

import React from "react";

type PageWrapperProps = {
    children: React.ReactNode;
    maxWidth?: string;
    className?: string;
};

export default function PageWrapper({
    children,
    maxWidth = "max-w-4xl",
    className = "",
}: PageWrapperProps) {
    return (
        <div
            className={`pt-6 px-6 mx-auto ${maxWidth} ${className}`}
        >
            {children}
        </div>
    );
}