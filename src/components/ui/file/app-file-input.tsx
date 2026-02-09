"use client";

import React, { useRef } from "react";
import AppButton from "../button/app-button";
import { cn } from "@/lib/utils/cn";

type AppFileInputProps = {
    /**
     * Callback déclenché lorsque l’utilisateur sélectionne un ou plusieurs fichiers.
     */
    onSelect: (files: File[]) => void;

    /**
     * Texte du bouton (par défaut : "Choisir un fichier").
     */
    label?: string;

    /**
     * Accepte un type MIME (ex: "image/*").
     */
    accept?: string;

    /**
     * Permet d’ajouter des classes supplémentaires.
     */
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
        <div className={cn("flex flex-col gap-2", className)}>
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