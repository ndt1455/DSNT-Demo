import { cn } from "@/lib/utils/cn";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** id of the visible text that names this switch. */
  labelledBy: string;
};

/**
 * Figma component: "Toggle" — 48 x 28 track, 22px white knob. Figma only has "Off";
 * "On" uses the brand blue track with the knob moved to the right.
 */
export function Toggle({ checked, onChange, labelledBy }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-[14px] p-[3px] transition-colors after:absolute after:-inset-2 focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2 focus-visible:outline-none",
        checked ? "bg-brand-9" : "bg-toggle-off",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block h-[22px] w-[22px] rounded-[11px] bg-white shadow-toggle-knob transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}
