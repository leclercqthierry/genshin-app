"use client";

import { forwardRef } from "react";

const sizeStyles = {
    sm: "text-sm px-2 py-1.5",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
} as const;

type TextAreaSize = keyof typeof sizeStyles;

type NativeTextAreaProps = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "size"
>;

interface AppTextAreaProps extends NativeTextAreaProps {
    size?: TextAreaSize;
}

const AppTextArea = forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
    ({ size = "md", className = "", ...rest }, ref) => {
        return (
            <textarea
                ref={ref}
                className={`
                    w-full rounded bg-white text-black border transition
                    border-[--color-gold] focus-visible:outline-[--color-gold]
                    resize-none
                    ${sizeStyles[size]}
                    ${className}
                `}
                {...rest}
            />
        );
    }
);

AppTextArea.displayName = "AppTextArea";
export default AppTextArea;