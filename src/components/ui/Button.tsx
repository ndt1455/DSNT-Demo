import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Figma component: "Button" (327 x 56 inside the 24px-padded "Bottom" bar).
 * - primary: black bg, white text (button/secondary/* tokens in Figma) — main CTA on light screens
 * - inverse: white bg, dark-blue text — main CTA on dark camera screens
 * - link:    no bg, brand-blue text — e.g. "Skip for now"
 * Disabled state follows the Figma "Continue" disabled look (light gray).
 */
type Variant = "primary" | "inverse" | "link";

const variants: Record<Variant, string> = {
  primary: "bg-button-primary-bg text-button-primary-text disabled:bg-gray-2 disabled:text-gray-8",
  inverse: "bg-white text-brand-9 disabled:bg-white/40 disabled:text-white",
  link: "bg-transparent text-brand-9 disabled:text-gray-8",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

export function Button({ variant = "primary", fullWidth = true, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-14 items-center justify-center rounded-full px-6 font-button text-button font-bold transition-opacity active:opacity-80 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
