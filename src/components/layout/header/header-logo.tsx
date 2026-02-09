import React from "react";
import Link from "next/link";

export default function HeaderLogo(): React.JSX.Element {
    return (
        <Link href="/" className="text-xl font-semibold text-accent">
            Genshin App
        </Link>
    );
}