"use client";

import { useSyncExternalStore } from "react";
import { useApplicationStore } from "./application";

/**
 * True once the persisted application store has been restored from sessionStorage.
 * It is always false during SSR and the hydration render, so screens that render stored values
 * (or redirect when data is missing) don't cause hydration mismatches.
 */
export function useHasHydrated() {
  return useSyncExternalStore(
    (onChange) => useApplicationStore.persist.onFinishHydration(onChange),
    () => useApplicationStore.persist.hasHydrated(),
    () => false,
  );
}
