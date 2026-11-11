import { cn } from "@/lib/utils/cn";

/**
 * Figma component: "Progress bar" — 4px gray track with a gradient fill (exported from Figma),
 * stretched to the filled width. `value` is the completed fraction, 0–1.
 */
export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const percent = Math.round(Math.min(1, Math.max(0, value)) * 100);

  return (
    <div
      role="progressbar"
      aria-label="Application progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn("h-1 overflow-hidden rounded-full bg-gray-6", className)}
    >
      <div
        className="h-full rounded-full bg-[url(/shared/progress-fill.png)] bg-size-[100%_100%] bg-no-repeat"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
