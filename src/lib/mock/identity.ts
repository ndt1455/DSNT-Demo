import { delay } from "./delay";

export type IdSide = "front" | "back";

/** Demo promo code accepted by applyPromoCode (case-insensitive). Any other code is rejected. */
export const MOCK_PROMO_CODE = "DSNT2026";

/** Sample captures from Figma, used instead of a real camera (see public/mock). */
export const MOCK_ID_IMAGE = "/mock/eid-sample.png";
export const MOCK_SELFIE_IMAGE = "/mock/selfie-sample.png";

/** How long the mock camera "looks" before taking the photo automatically. */
export const MOCK_CAPTURE_MS = 1500;

/**
 * Mock identity checks. The demo never opens the camera: capture screens simulate a scan
 * and show the sample images above.
 */
export async function verifyIdImage(_side: IdSide, _image: Blob | string): Promise<{ ok: boolean }> {
  await delay(MOCK_CAPTURE_MS);
  return { ok: true };
}

export async function verifySelfie(_image: Blob | string): Promise<{ ok: boolean; matchScore: number }> {
  await delay(1500);
  return { ok: true, matchScore: 0.97 };
}

export async function applyPromoCode(code: string): Promise<{ ok: boolean; message: string }> {
  await delay();
  const ok = code.trim().toUpperCase() === MOCK_PROMO_CODE;
  return { ok, message: ok ? "Promo code applied" : "Invalid promo code" };
}
