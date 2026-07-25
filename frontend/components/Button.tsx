"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
    children,
    className = "",
    isLoading = false,
    icon,
    onClick,
    disabled,
    type = "button",
    ...props
}: ButtonProps) => {

    const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-primary-accent hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyle} ${className}`}
            {...props}
        >

            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            ) : (

                icon && <span className="shrink-0">{icon}</span>
            )}

            <span>{children}</span>
        </button>
    );
};