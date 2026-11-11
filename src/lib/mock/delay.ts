/** Simulated network latency for mock services (ms). Keep it short so demos feel snappy. */
export const MOCK_LATENCY_MS = 600;

export function delay(ms: number = MOCK_LATENCY_MS) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
