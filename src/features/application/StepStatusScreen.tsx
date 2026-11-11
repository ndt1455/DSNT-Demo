import Image from "next/image";
import Link from "next/link";
import { Screen } from "@/components/layout/Screen";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { buttonClasses } from "@/components/ui/Button";
import { StepperVertical, type StepperStep } from "@/components/ui/StepperVertical";

const STEPS: StepperStep[] = [
  {
    title: "Set up profile",
    state: "done",
    items: ["Input Mobile Number & Email", "Bureau Consent & T&C", "Marketing and PIA Consent"],
  },
  {
    title: "Verify identity",
    state: "active",
    iconSrc: "/shared/stepper/finger-scan.svg",
    items: ["OTP Verification", "Scan EID", "Take Selfie"],
  },
  {
    title: "Finalize & Offers",
    state: "pending",
    iconSrc: "/shared/stepper/money-send.svg",
    items: ["Additional Information", "Offer Listing", "Bank request info"],
  },
];

/** Figma "Step Status" (1:2320) — step 1 done, step 2 next. */
export function StepStatusScreen() {
  return (
    <Screen
      background="/shared/status-background.svg"
      header={
        <header className="flex shrink-0 flex-col items-start gap-4 p-6">
          <BrandLogo />
          <h1 className="text-h6 text-gray-12">Great! You&apos;ve completed step 1</h1>
        </header>
      }
      footer={
        <Link href="/verify/otp" className={buttonClasses()}>
          Continue
        </Link>
      }
      className="flex flex-col gap-8 px-8 py-6"
    >
      <StepperVertical steps={STEPS} />
      <div
        role="note"
        className="flex items-center gap-3 rounded-xl border border-brand-a3 bg-linear-to-r from-toast-from to-toast-to p-4"
      >
        <Image src="/application/personal-card.svg" alt="" width={24} height={24} />
        <p className="text-p-xs text-gray-12">Please have your ID Card ready</p>
      </div>
    </Screen>
  );
}
