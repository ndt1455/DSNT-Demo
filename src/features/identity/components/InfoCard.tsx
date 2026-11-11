import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Figma "Content Container" on the light identity screens: frosted white card, 24px radius. */
export function InfoCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-6 rounded-3xl bg-white/60 px-4 py-6 shadow-card backdrop-blur-[2px]",
        className,
      )}
    >
      {children}
    </section>
  );
}
