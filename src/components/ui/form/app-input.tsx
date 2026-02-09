"use client";

import { forwardRef } from "react";
import AppFieldBase from "./app-field-base";
import { cn } from "@/lib/utils/cn";

const sizeStyles = {
    sm: "text-sm px-2 py-1.5",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
} as const;

type InputSize = keyof typeof sizeStyles;

type NativeInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size"
>;

interface AppInputProps extends NativeInputProps {
    label: string;
    name: string;
    error?: string;
    description?: string;
    size?: InputSize;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
    (
        {
            label,
            name,
            error,
            description,
            size = "md",
            className,
            ...rest
        },
        ref
    ) => {
        return (
            <AppFieldBase
                label={label}
                name={name}
                error={error}
                description={description}
            >
                <input
                    ref={ref}
                    className={cn(
                        "w-full rounded bg-primary-60 text-white border transition",
                        error
                            ? "border-red-500 focus-visible:outline-red-500"
                            : "border-accent focus-visible:outline-accent",
                        sizeStyles[size],
                        className
                    )}
                    {...rest}
                />
            </AppFieldBase>
        );
    }
);

AppInput.displayName = "AppInput";
export default AppInput;