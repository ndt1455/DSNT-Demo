"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type OtpInputProps = {
  length: number;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

/**
 * Figma component: "OTP" — row of 44 x 52 boxes (Figma "Text input - OTP").
 * One real input sits transparently on top of the boxes, so typing, paste and SMS autofill
 * (autocomplete="one-time-code") all work natively; the boxes only display the digits.
 */
export function OtpInput({ length, value, onChange, invalid = false, describedBy }: OtpInputProps) {
  const [focused, setFocused] = useState(false);
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <div className="relative flex h-[52px] w-full justify-between">
      {Array.from({ length }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "flex h-[52px] w-11 items-center justify-center rounded-xl border-2 bg-white text-p-lg font-medium text-gray-12",
            invalid ? "border-danger-11" : focused && index === activeIndex ? "border-brand-9" : "border-brand-4",
          )}
        >
          {value[index]}
        </span>
      ))}
      <input
        aria-label="Verification code"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, length))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute inset-0 caret-transparent opacity-0"
      />
    </div>
  );
}
