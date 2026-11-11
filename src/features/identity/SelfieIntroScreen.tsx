import Link from "next/link";
import { Screen } from "@/components/layout/Screen";
import { buttonClasses } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { IconBadge } from "./components/IconBadge";
import { InfoCard } from "./components/InfoCard";
import { StepGuard } from "./components/StepGuard";
import { TipsList } from "./components/TipsList";

const TIPS = [
  "Look directly at the camera",
  "Remove glasses and face coverings",
  "Ensure good lighting",
  "Keep a neutral expression",
];

/** Figma "Selfie Verification" (1:1842). The selfie is matched against the ID, so both sides must be captured. */
export function SelfieIntroScreen() {
  return (
    <Screen
      progress={0.8}
      header={<ScreenHeader caption="Verify identity" title="Take a Selfie" backHref="/verify/id/back" />}
      footer={
        <Link href="/verify/selfie/camera" className={buttonClasses()}>
          Verify
        </Link>
      }
      className="px-6 pt-6"
    >
      <StepGuard requires="idBackCaptured" redirectTo="/verify/id/back" />
      <InfoCard>
        <h2 className="text-p-lg font-medium text-brand-ink">Selfie Verification</h2>
        <IconBadge src="/identity/selfie-scan.svg" width={29} height={29} />
        <p className="w-[253px] text-center text-p-xs text-gray-9">
          We need to verify that you&apos;re the person on the ID.
        </p>
        <TipsList tips={TIPS} />
      </InfoCard>
    </Screen>
  );
}
