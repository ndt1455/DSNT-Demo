import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type TabButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean };

/**
 * Figma component: "Tab button" — 36px pill. Selected: blue gradient fill; default: frosted outline.
 * Horizontal padding compensates for the border so the label sits 24px from the edge like Figma.
 * The ::after extends the tap target to 44px tall.
 */
export function TabButton({ selected, className, ...props }: TabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={cn(
        "relative flex h-9 shrink-0 items-center justify-center rounded-full font-jakarta text-tab font-semibold whitespace-nowrap after:absolute after:inset-x-0 after:-inset-y-1 active:opacity-80",
        selected
          ? "border border-white/20 bg-linear-[162deg] from-brand-9 to-brand-grad-to px-[23px] text-white"
          : "border-[1.5px] border-brand-a5 bg-gray-a1 px-[22.5px] text-brand-9 backdrop-blur-[8px]",
        className,
      )}
      {...props}
    />
  );
}
