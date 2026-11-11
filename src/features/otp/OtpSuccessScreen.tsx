"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Screen } from "@/components/layout/Screen";

const NEXT_SCREEN_DELAY_MS = 2500;

/** Figma "OTP Verification" success (1:2205). Moves on to Scan EID (Flow 2) automatically. */
export function OtpSuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace("/verify/id"), NEXT_SCREEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Screen progress={0.25} className="flex flex-col items-center justify-center gap-8 px-screen-x">
      {/* Figma exports the tick with its glow, so the 184px art overflows the 100px slot. */}
      <div className="relative size-[100px] shrink-0">
        <Image
          src="/otp/verify-tick.svg"
          alt=""
          width={184}
          height={184}
          loading="eager"
          className="absolute top-[-16.67px] left-[-26.67px] size-[153.33px] max-w-none"
        />
      </div>
      <div role="status" className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-p-xl font-semibold text-brand-12">Verified Successfully</h1>
        <p className="w-[253px] text-p-xs text-gray-9">
          Phone number verified! Now, let&apos;s scan your ID. Please have it ready.
        </p>
      </div>
    </Screen>
  );
}
