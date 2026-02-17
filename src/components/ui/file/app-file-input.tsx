"use client";

import React, { useRef } from "react";
import AppButton from "../button/app-button";

type AppFileInputProps = {
    onSelect: (files: File[]) => void;
    label?: string;
    accept?: string;
    className?: string;
};

export default function AppFileInput({
    onSelect,
    label = "Choisir un fichier",
    accept = "*",
    className,
}: AppFileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={`flex flex-col gap-2 ${className ?? ""}`}>
            {/* Input file masqué */}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        onSelect(Array.from(files));
                    }
                }}
            />

            {/* Bouton stylisé */}
            <AppButton type="button" onClick={() => inputRef.current?.click()}>
                {label}
            </AppButton>
        </div>
    );
}