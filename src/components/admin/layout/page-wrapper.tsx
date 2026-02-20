"use client";

import React from "react";

type AdminPageWrapperProps = {
    children: React.ReactNode;
    maxWidth?: string;
    className?: string;
};

export default function AdminPageWrapper({
    children,
    maxWidth = "max-w-4xl",
    className = "",
}: AdminPageWrapperProps) {
    return (
        <div
            className={`pt-6 px-6 mx-auto ${maxWidth} ${className}`}
        >
            {children}
        </div>
    );
}