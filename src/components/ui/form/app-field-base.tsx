"use client";

import React, { ReactElement } from "react";

type FormElementProps =
    React.InputHTMLAttributes<HTMLInputElement> &
    React.SelectHTMLAttributes<HTMLSelectElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface AppFieldBaseProps {
    label: string;
    name: string;
    children: React.ReactNode;
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

    const enhancedChild =
        React.isValidElement(children)
            ? React.cloneElement(children as ReactElement<FormElementProps>, {
                id: name,
                "aria-invalid": !!error,
                "aria-describedby": errorId ?? descriptionId,
            })
            : children;

    return (
        <div className={`${fullWidth ? "w-full" : ""} flex flex-col gap-1`}>
            <label
                htmlFor={name}
                className="text-white font-medium"
                aria-required={required}
            >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {enhancedChild}

            {description && !error && (
                <p id={descriptionId} className="text-white/60 text-sm">
                    {description}
                </p>
            )}

            {error && (
                <p id={errorId} className="text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}