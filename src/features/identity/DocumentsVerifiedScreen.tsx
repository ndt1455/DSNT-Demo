import Link from "next/link";
import { Screen } from "@/components/layout/Screen";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { buttonClasses } from "@/components/ui/Button";
import { StepperVertical, type StepperStep } from "@/components/ui/StepperVertical";
import { StepGuard } from "./components/StepGuard";

const STEPS: StepperStep[] = [
  {
    title: "Set up profile",
    state: "done",
    items: ["Input Mobile Number & Email", "Bureau Consent & T&C", "Marketing and PIA Consent"],
  },
  {
    title: "Verify identity",
    state: "done",
    items: ["OTP Verification", "Scan ID", "Take Selfie"],
  },
  {
    title: "Finalize & Offers",
    state: "active",
    iconSrc: "/shared/stepper/money-send-active.svg",
    items: ["Additional Information", "Offer Listing", "Bank request info"],
  },
];

/**
 * Figma "Step Status" (2:886) — steps 1 and 2 done.
 * "Finalize & Offers" is not designed yet, so Continue returns to the demo hub for now.
 */
export function DocumentsVerifiedScreen() {
  return (
    <Screen
      background="/shared/status-background.svg"
      header={
        <header className="flex shrink-0 flex-col items-start gap-4 p-6">
          <BrandLogo />
          <h1 className="text-h6 text-gray-12">Great! Your documents have been successfully verified.</h1>
        </header>
      }
      footer={
        <Link href="/" className={buttonClasses()}>
          Continue
        </Link>
      }
      className="px-8 py-6"
    >
      <StepGuard requires="selfieCaptured" redirectTo="/verify/selfie/camera" />
      <StepperVertical steps={STEPS} />
    </Screen>
  );
}
