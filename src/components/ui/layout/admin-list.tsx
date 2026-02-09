"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type AdminListProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
};

export default function AdminList<T extends { id: string | number }>({
    items,
    renderItem,
    className,
}: AdminListProps<T>) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                className
            )}
        >
            {items.map((item) => (
                <div key={item.id}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}