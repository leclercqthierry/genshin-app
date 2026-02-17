"use client";

import React from "react";

type FormElementProps =
    React.InputHTMLAttributes<HTMLInputElement> &
    React.SelectHTMLAttributes<HTMLSelectElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface AppFieldBaseProps {
    label: string;
    name: string;
    children: React.ReactElement<FormElementProps>;
    fullWidth?: boolean;
    required?: boolean;
    error?: string;
    description?: string;
}

export default function AppFieldBase({
    label,
    name,
    children,
    fullWidth = true,
    required = false,
    error,
    description,
}: AppFieldBaseProps): React.JSX.Element {
    const errorId = error ? `${name}-error` : undefined;
    const descriptionId = description ? `${name}-description` : undefined;

    return (
        <div className={`${fullWidth ? "w-full" : ""} flex flex-col gap-1`}>
            {/* Label */}
            <label
                htmlFor={name}
                className="text-white font-medium"
                aria-required={required}
            >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* Champ (input/select/textarea) */}
            {React.cloneElement(children, {
                id: name,
                name,
                "aria-invalid": !!error,
                "aria-describedby": errorId ?? descriptionId,
            })}

            {/* Description */}
            {description && !error && (
                <p id={descriptionId} className="text-white/60 text-sm">
                    {description}
                </p>
            )}

            {/* Erreur */}
            {error && (
                <p id={errorId} className="text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}