"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { maskPhone, OTP_LENGTH, OTP_RESEND_SECONDS, sendOtp, verifyOtp } from "@/lib/mock";
import { useApplicationStore } from "@/stores/application";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { OtpInput } from "./components/OtpInput";

const ERROR_ID = "otp-error";

/** Figma "OTP Verification" (1:1785). Needs the phone from Contact Details; redirects there without it. */
export function OtpScreen() {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const phone = useApplicationStore((s) => s.phone);
  const setState = useApplicationStore((s) => s.set);

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (!hydrated) return;
    if (!phone) router.replace("/apply/contact");
    else void sendOtp(phone);
  }, [hydrated, phone, router]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  async function handleVerify() {
    if (code.length < OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code`);
      return;
    }
    setVerifying(true);
    const { ok } = await verifyOtp(code);
    setVerifying(false);
    if (!ok) {
      setError("Incorrect code. Please try again.");
      return;
    }
    setState({ otpVerified: true });
    router.push("/verify/otp/success");
  }

  function handleResend() {
    setResendIn(OTP_RESEND_SECONDS);
    setCode("");
    setError(null);
    void sendOtp(phone);
  }

  return (
    <Screen
      progress={0.25}
      header={<ScreenHeader caption="Verify identity" title="OTP Verification" backHref="/apply/step-status" />}
      footer={
        <Button onClick={handleVerify} disabled={verifying}>
          {verifying ? "Verifying…" : "Verify"}
        </Button>
      }
      className="px-screen-x pt-6"
    >
      <div className="flex flex-col gap-6 rounded-3xl bg-white/60 px-4 py-6 shadow-card backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex size-[70px] items-center justify-center rounded-[20px] border-[1.5px] border-brand-grad-from/10 bg-linear-135 from-brand-grad-from/6 to-brand-grad-from/12">
            <Image src="/otp/shield.svg" alt="" width={30} height={30} />
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-p-lg font-medium text-brand-ink">Enter verification code</h2>
            <p className="text-p-sm text-brand-muted">
              Sent to <span className="font-medium text-brand-ink">{hydrated && phone ? maskPhone(phone) : ""}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[23px]">
          <OtpInput
            length={OTP_LENGTH}
            value={code}
            onChange={(value) => {
              setCode(value);
              setError(null);
            }}
            invalid={Boolean(error)}
            describedBy={error ? ERROR_ID : undefined}
          />
          {error && (
            <p id={ERROR_ID} role="alert" className="-mt-3 text-p-xs text-danger-11">
              {error}
            </p>
          )}
          <p className="flex items-center gap-1 text-p-xs text-gray-9">
            Didn&apos;t get code?
            <button
              type="button"
              onClick={handleResend}
              disabled={resendIn > 0}
              className="relative rounded-full px-0.5 font-button text-button-sm font-bold text-brand-9 after:absolute after:-inset-3 disabled:text-gray-8"
            >
              {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </Screen>
  );
}
