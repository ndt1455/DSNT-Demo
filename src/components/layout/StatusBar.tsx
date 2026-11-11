import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Fake iOS status bar (Figma: "Status Bar - iPhone", 375x50). Only shown in the desktop frame. */
export function StatusBar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-[50px] shrink-0 items-center justify-between px-8 pt-1 text-[15px] font-semibold text-black",
        className,
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <Signal className="size-4" strokeWidth={2.5} />
        <Wifi className="size-4" strokeWidth={2.5} />
        <BatteryFull className="size-6" strokeWidth={1.75} />
      </span>
    </div>
  );
}
