import { delay } from "./delay";

/** Demo OTP. Any screen asking for an OTP accepts exactly this code. Shown as a hint in demo builds. */
export const MOCK_OTP_CODE = "123456";
export const OTP_LENGTH = MOCK_OTP_CODE.length;
export const OTP_RESEND_SECONDS = 30;

export async function sendOtp(phone: string): Promise<{ sentTo: string }> {
  await delay();
  return { sentTo: maskPhone(phone) };
}

export async function verifyOtp(code: string): Promise<{ ok: boolean }> {
  await delay();
  return { ok: code === MOCK_OTP_CODE };
}

/** "+971 501234567" → "+971 5X XXX XXXX" style masking used in Figma. */
export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  return `+${digits.slice(0, 3)} ${digits[3]}X XXX XXXX`;
}
