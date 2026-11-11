"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { buttonClasses } from "@/components/ui/Button";
import { StepCard } from "./components/StepCard";

/** How long all three steps stay expanded before the screen focuses on step 1. */
const OVERVIEW_MS = 1500;

/*
 * Copy is verbatim from Figma; "Finalize & Offers" reuses the identity items there as placeholder text.
 * Icon offsets reproduce the Figma "Icon-Custom" insets inside its 40px box.
 */
const STEPS = [
  {
    title: "Set up profile",
    items: ["Input Mobile Number & Email", "Bureau Consent & T&C", "Marketing and PIA Consent"],
    icon: (
      <Image
        src="/application/step-setup-profile.svg"
        alt=""
        width={32}
        height={36}
        className="mx-1 my-0.5 max-w-none"
      />
    ),
  },
  {
    title: "Verify identity",
    items: ["OTP Verification", "Scan EID", "Take Selfie"],
    icon: <Image src="/application/step-verify-identity.svg" alt="" width={36} height={36} className="m-0.5" />,
  },
  {
    title: "Finalize & Offers",
    items: ["OTP Verification", "Scan EID", "Take Selfie"],
    icon: <Image src="/application/step-finalize-offers.svg" alt="" width={36} height={36} className="m-0.5" />,
  },
];

/**
 * Figma "Just 3 steps": opens on the full overview (1:2368), then auto-animates to the focused state
 * (1:2352) where only the current step ("Set up profile") stays expanded.
 */
export function ApplyIntroScreen() {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFocused(true), OVERVIEW_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen
      header={
        <header className="flex shrink-0 flex-col items-center gap-4 p-6">
          <BrandLogo />
          <h1 className="text-center text-p-sm text-brand-9">Just 3 steps to get your credit card</h1>
        </header>
      }
      footer={
        <Link href="/apply/contact" className={buttonClasses()}>
          Start Now
        </Link>
      }
      className="flex flex-col gap-4 p-6"
    >
      {STEPS.map((step, index) => (
        <StepCard key={step.title} {...step} collapsed={focused && index > 0} />
      ))}
    </Screen>
  );
}
