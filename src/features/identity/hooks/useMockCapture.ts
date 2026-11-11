"use client";

import { useEffect, useState } from "react";

/**
 * Simulates the camera taking a photo automatically: once `ready`, runs `capture` (a mock service
 * call) and flips to captured. `capture` must be stable (module-level or useCallback).
 */
export function useMockCapture(ready: boolean, capture: () => Promise<unknown>) {
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    void capture().then(() => {
      if (!cancelled) setCaptured(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ready, capture]);

  return captured;
}
