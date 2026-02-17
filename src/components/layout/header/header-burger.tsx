import React from "react";

interface HeaderBurgerProps {
    open: boolean;
    toggleMenu: () => void;
}

export default function HeaderBurger({
    open,
    toggleMenu,
}: HeaderBurgerProps): React.JSX.Element {
    return (
        <button
            className="md:hidden relative w-8 h-8"
            onClick={toggleMenu}
            aria-label="Menu mobile"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="var(--color-gold)"
                className={`absolute inset-0 w-8 h-8 transition-all duration-300 ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
            >
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="var(--color-gold)"
                className={`absolute inset-0 w-8 h-8 transition-all duration-300 ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
            >
                <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
        </button>
    );
}