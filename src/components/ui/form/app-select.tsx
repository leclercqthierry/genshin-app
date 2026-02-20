"use client";

import { forwardRef } from "react";
import AppFieldBase from "./app-field-base";

// Styles de tailles, cohérents avec AppInput et AppButton
const sizeStyles = {
    sm: "text-sm px-2 py-1.5",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
} as const;

type SelectSize = keyof typeof sizeStyles;

// On retire la prop native "size" pour éviter le conflit
type NativeSelectProps = Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size"
>;

interface AppSelectProps extends NativeSelectProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    error?: string;
    description?: string;
    size?: SelectSize;
}

const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
    (
        {
            label,
            name,
            options,
            error,
            description,
            size = "md",
            className,
            ...rest
        },
        ref
    ) => {
        const baseClasses =
            "w-full rounded bg-white text-black border transition";

        const borderClasses = error
            ? "border-red-500 focus-visible:outline-red-500"
            : "border-gold focus-visible:outline-gold";

        const sizeClass = sizeStyles[size];

        return (
            <AppFieldBase
                label={label}
                name={name}
                error={error}
                description={description}
            >
                <select
                    ref={ref}
                    className={`${baseClasses} ${borderClasses} ${sizeClass} ${className ?? ""}`}
                    {...rest}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </AppFieldBase>
        );
    }
);

AppSelect.displayName = "AppSelect";
export default AppSelect;