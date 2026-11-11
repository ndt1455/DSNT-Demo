"use client";

import { useRequiredStep, type JourneyStep } from "../hooks/useRequiredStep";

/** Drop-in guard for server-rendered screens; renders nothing. */
export function StepGuard({ requires, redirectTo }: { requires: JourneyStep; redirectTo: string }) {
  useRequiredStep(requires, redirectTo);
  return null;
}
