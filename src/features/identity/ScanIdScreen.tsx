import Image from "next/image";
import Link from "next/link";
import { Screen } from "@/components/layout/Screen";
import { buttonClasses } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { InfoCard } from "./components/InfoCard";
import { StepGuard } from "./components/StepGuard";
import { TipsList } from "./components/TipsList";

const TIPS = ["Ensure good lighting", "Avoid shadows and glare", "Keep all edges visible"];

/** Figma "Scan EID" (1:1803) — first screen of Verify identity, reached after OTP is verified. */
export function ScanIdScreen() {
  return (
    <Screen
      progress={0.5}
      header={<ScreenHeader caption="Verify identity" title="Scan EID" backHref="/apply/step-status" />}
      footer={
        <Link href="/verify/promo" className={buttonClasses()}>
          Verify
        </Link>
      }
      className="px-6 pt-6"
    >
      <StepGuard requires="otpVerified" redirectTo="/verify/otp" />
      <InfoCard>
        <h2 className="text-p-lg font-medium text-brand-ink">Scan your ID</h2>
        <Image
          src="/identity/scan-id-cards.svg"
          alt="Front and back of an ID card"
          width={296}
          height={88}
          loading="eager"
        />
        <p className="w-[253px] text-center text-p-xs text-gray-9">
          We&apos;ll need photos of both the front and back of your Es ID.
        </p>
        <TipsList tips={TIPS} />
      </InfoCard>
    </Screen>
  );
}
