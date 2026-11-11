import type { ReactNode } from "react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils/cn";

type ScreenProps = {
  /** Fixed top area (e.g. <ScreenHeader>). Does not scroll. */
  header?: ReactNode;
  /** Fixed bottom bar (Figma "Bottom": 24px padding around the CTA). Does not scroll. */
  footer?: ReactNode;
  /** Completed fraction 0–1. Renders the Figma "Progress bar" at the very top of the device. */
  progress?: number;
  /** Full-bleed background art (Figma "Background" instance). Ignored for dark screens. */
  background?: string;
  /** "dark" = camera screens: solid Blue-Primary/12 background and a white status bar. */
  theme?: "light" | "dark";
  /** Classes for the scrollable content area. */
  className?: string;
  children: ReactNode;
};

/**
 * Standard screen anatomy from Figma: background → (progress) → header → scrollable content → bottom bar.
 *
 * The root is intentionally NOT `relative`: the background and progress bar are positioned against the
 * MobileShell scroll container, so they also cover the area under the desktop status bar like in Figma.
 *
 * The background is a CSS background, not `next/image` `fill`: with `cacheComponents` Next keeps visited
 * routes mounted but hidden (React <Activity>), and a `fill` image that finishes decoding while hidden
 * logs a "height value of 0" warning.
 */
export function Screen({
  header,
  footer,
  progress,
  background = "/shared/screen-background.svg",
  theme = "light",
  className,
  children,
}: ScreenProps) {
  const dark = theme === "dark";

  return (
    <div data-status-bar={dark ? "light" : undefined} className="flex min-h-0 flex-1 flex-col">
      {/* 100% 100% stretches the art like Figma's preserveAspectRatio="none" export. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          dark ? "bg-camera-bg" : "bg-brand-2 bg-size-[100%_100%] bg-no-repeat",
        )}
        style={dark ? undefined : { backgroundImage: `url(${background})` }}
      />
      {progress !== undefined && <ProgressBar value={progress} className="absolute inset-x-0 top-0 z-10" />}

      <div className="relative flex min-h-0 flex-1 flex-col">
        {header}
        <div className={cn("no-scrollbar min-h-0 flex-1 overflow-y-auto", className)}>{children}</div>
        {footer && <div className="shrink-0 p-6">{footer}</div>}
      </div>
    </div>
  );
}
