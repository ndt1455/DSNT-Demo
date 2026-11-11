import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  /** Visible label. Omit it only when Figma shows none, and pass `aria-label` instead. */
  label?: string;
  /** Content before the input inside the box, e.g. a country code. */
  leading?: ReactNode;
  /** Shown under the field and linked via aria-describedby. */
  error?: string;
};

/**
 * Figma component: "Input Field" — label, 48px white box with Gray/300 border, 16px radius.
 * Figma pads the box 16px horizontally when it has a leading element and 12px otherwise.
 */
export function InputField({ id, label, leading, error, className, ...inputProps }: InputFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-p-xs font-medium text-gray-12">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border bg-input-bg focus-within:border-brand-9",
          leading ? "px-[15px] py-[11px]" : "p-[11px]",
          error ? "border-danger-11" : "border-input-border",
        )}
      >
        {leading}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent text-p-sm text-gray-12 outline-none placeholder:text-gray-9"
          {...inputProps}
        />
      </div>
      {error && (
        <p id={errorId} className="text-p-xs text-danger-11">
          {error}
        </p>
      )}
    </div>
  );
}
