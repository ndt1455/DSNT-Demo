import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StepCardProps = {
  title: string;
  icon: ReactNode;
  items: string[];
  /** Collapsed = Figma 1:2352 look for upcoming steps: grey title only. */
  collapsed: boolean;
};

/**
 * Overview card on "Just 3 steps" (Figma "Set up" / "Identity" / "Offers" instances).
 * Expanded: icon, 20px title, item list. Collapsed: 18px grey title only.
 * Height animates with the grid-rows 1fr → 0fr technique.
 */
export function StepCard({ title, icon, items, collapsed }: StepCardProps) {
  const transition = "transition-all duration-500 ease-in-out motion-reduce:transition-none";

  return (
    <section className="flex shrink-0 flex-col items-center overflow-hidden rounded-2xl bg-linear-to-r from-white to-white/0 p-4">
      <div className={cn("grid w-full", transition, collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]")}>
        <div className="flex min-h-0 justify-center overflow-hidden">
          <div className="pb-2">{icon}</div>
        </div>
      </div>
      <h2
        className={cn(
          "text-center font-medium",
          transition,
          collapsed ? "text-p-lg text-gray-8" : "text-p-xl text-gray-12",
        )}
      >
        {title}
      </h2>
      <div className={cn("grid w-full", transition, collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]")}>
        <ul className="min-h-0 overflow-hidden text-center text-p-sm text-gray-11">
          {items.map((item, index) => (
            <li key={item} className={cn(index === 0 && "pt-2")}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
