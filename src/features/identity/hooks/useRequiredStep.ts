"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApplicationStore } from "@/stores/application";
import { useHasHydrated } from "@/stores/useHasHydrated";

export type JourneyStep = "otpVerified" | "idFrontCaptured" | "idBackCaptured" | "selfieCaptured";

/**
 * Sends the user back to `redirectTo` when an earlier journey step is missing (e.g. a deep link
 * or a refresh after the session ended). Returns true once the persisted store is restored and the
 * step is done; pass `null` when the screen has no prerequisite but still needs the restored store.
 */
export function useRequiredStep(step: JourneyStep | null, redirectTo: string) {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const done = useApplicationStore((s) => (step ? s[step] : true));

  useEffect(() => {
    if (hydrated && !done) router.replace(redirectTo);
  }, [hydrated, done, redirectTo, router]);

  return hydrated && done;
}
