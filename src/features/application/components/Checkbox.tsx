import Image from "next/image";
import type { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string };

/**
 * Figma component: "Checkbox" — 22px rounded box with the blue gradient + white tick when checked.
 * Unchecked look isn't in Figma: white box with the input border color.
 * A visually hidden native checkbox keeps keyboard and screen reader support.
 */
export function Checkbox({ label, ...inputProps }: CheckboxProps) {
  return (
    <label className="flex min-h-[26px] cursor-pointer items-center gap-3 py-px">
      <input type="checkbox" className="peer sr-only" {...inputProps} />
      <span
        aria-hidden
        className="grid size-[22px] shrink-0 place-items-center rounded-[7px] border border-input-border bg-white peer-checked:border-0 peer-checked:bg-linear-135 peer-checked:from-brand-grad-from peer-checked:to-brand-grad-to peer-focus-visible:ring-2 peer-focus-visible:ring-brand-9 peer-focus-visible:ring-offset-2 [&>img]:invisible peer-checked:[&>img]:visible"
      >
        <Image src="/application/checkbox-tick.svg" alt="" width={12} height={12} />
      </span>
      <span className="text-p-sm font-medium text-gray-12">{label}</span>
    </label>
  );
}
