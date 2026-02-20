"use client";

import { forwardRef } from "react";

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
    size?: InputSize;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
    ({ size = "md", className = "", ...rest }, ref) => {
        return (
            <input
                ref={ref}
                className={`
                    w-full rounded bg-white text-black border transition
                    border-[--color-gold] focus-visible:outline-[--color-gold]
                    ${sizeStyles[size]}
                    ${className}
                `}
                {...rest}
            />
        );
    }
);

AppInput.displayName = "AppInput";
export default AppInput;