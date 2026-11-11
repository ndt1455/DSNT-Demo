import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export type StepState = "done" | "active" | "pending";

export type StepperStep = {
  title: string;
  items: string[];
  state: StepState;
  /** 20px icon inside the circle for active / pending steps (done steps always show a tick). */
  iconSrc?: string;
};

const circleSrc: Record<StepState, string> = {
  done: "/shared/stepper/done-circle.svg",
  active: "/shared/stepper/active-circle.svg",
  pending: "/shared/stepper/pending-circle.svg",
};

const titleStyle: Record<StepState, string> = {
  done: "text-p-lg font-medium text-gray-11",
  active: "text-p-lg font-medium text-brand-9",
  pending: "text-p-md font-semibold text-gray-8",
};

const trailStyle: Record<StepState, string> = {
  done: "bg-success-a10",
  active: "bg-brand-9",
  pending: "bg-gray-8",
};

const itemsStyle: Record<StepState, string> = {
  done: "text-gray-11",
  active: "text-brand-9",
  pending: "text-gray-8",
};

/**
 * Figma component: "Stepper Vertical" (e.g. "Step Status" 1:2320) — 32px step symbols with a title,
 * then a 2px trail next to a bullet list. Colors follow the step state: done (teal), active (blue), pending (grey).
 */
export function StepperVertical({ steps }: { steps: StepperStep[] }) {
  return (
    <ol className="flex flex-col gap-2">
      {steps.map((step) => (
        <li
          key={step.title}
          className="flex flex-col gap-2"
          aria-current={step.state === "active" ? "step" : undefined}
        >
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="relative size-8 shrink-0">
              <Image src={circleSrc[step.state]} alt="" width={32} height={32} className="absolute inset-0" />
              {step.state === "done" ? (
                <Image
                  src="/shared/stepper/tick.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute top-1.5 left-1.5"
                />
              ) : (
                step.iconSrc && (
                  <Image src={step.iconSrc} alt="" width={20} height={20} className="absolute top-1.5 left-1.5" />
                )
              )}
            </span>
            <h2 className={titleStyle[step.state]}>{step.title}</h2>
          </div>
          <div className="flex gap-4">
            <span aria-hidden className="flex w-8 shrink-0 justify-center">
              <span className={cn("w-0.5", trailStyle[step.state])} />
            </span>
            <ul className={cn("list-disc text-p-sm", itemsStyle[step.state])}>
              {step.items.map((item) => (
                <li key={item} className="ms-[21px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
