import type { ReactNode } from "react";
import { StatusBar } from "./StatusBar";

/**
 * Renders the app as a mobile device.
 * - Phone / narrow viewport (< 640px): full screen, real device chrome, safe-area aware.
 * - Desktop / showcase (>= 640px): centered 375x812 phone frame with a fake iOS status bar.
 *
 * Every screen renders INSIDE this shell — never set page widths yourself.
 * The scroll container is the shell, not <body>. It is `relative` and starts at the very top of the
 * device, so full-bleed art positioned against it (see <Screen>) also fills the area under the fake
 * status bar, like the Figma frames. Dark screens set `data-status-bar="light"` to get white status bar text.
 */
export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center sm:py-8">
      <div
        id="device"
        className="group/device relative flex h-dvh w-full flex-col overflow-hidden bg-white sm:h-[min(var(--height-device),calc(100dvh-4rem))] sm:w-(--width-device) sm:rounded-[44px] sm:shadow-[0_0_0_10px_#07080a,0_24px_60px_rgba(0,0,0,0.25)]"
      >
        <div className="relative no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:pt-[50px] sm:pb-0">
          {children}
        </div>
        <StatusBar className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden sm:flex" />
      </div>
    </div>
  );
}
