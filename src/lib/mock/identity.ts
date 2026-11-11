import { delay } from "./delay";

export type IdSide = "front" | "back";

/**
 * Mock identity checks. Real camera capture (getUserMedia) is optional —
 * screens must also work without a camera by falling back to the sample images in /public/mock.
 */
export async function verifyIdImage(_side: IdSide, _image: Blob | string): Promise<{ ok: boolean }> {
  await delay(1200);
  return { ok: true };
}

export async function verifySelfie(_image: Blob | string): Promise<{ ok: boolean; matchScore: number }> {
  await delay(1500);
  return { ok: true, matchScore: 0.97 };
}

export async function applyPromoCode(code: string): Promise<{ ok: boolean; message: string }> {
  await delay();
  const ok = code.trim().toUpperCase() === "DSNT2026";
  return { ok, message: ok ? "Promo code applied" : "Invalid promo code" };
}
