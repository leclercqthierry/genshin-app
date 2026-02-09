import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne proprement des classes Tailwind.
 * - clsx gère les conditions
 * - twMerge résout les conflits Tailwind
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(...inputs));
}