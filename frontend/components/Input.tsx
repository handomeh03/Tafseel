"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  register?: any; 
}

export const Input = ({label,error,className = "",register = {},id,...props}: InputProps) => {
  
  const baseStyle = "w-full px-4 py-3 rounded-xl border bg-section-light/60 text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all text-right";

  const borderStyle = error ? "border-red-500" : "border-subtle";

  return (
    <div className="space-y-1 text-right w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-brand-dark">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`${baseStyle} ${borderStyle} ${className}`}
        {...register}
        {...props}
      />

      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
};