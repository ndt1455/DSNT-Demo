"use client";

import Link from "next/link";
import { useCallback } from "react";
import { Screen } from "@/components/layout/Screen";
import { buttonClasses } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { MOCK_ID_IMAGE, verifyIdImage, type IdSide } from "@/lib/mock";
import { useApplicationStore } from "@/stores/application";
import { IdFrame } from "./components/IdFrame";
import { useMockCapture } from "./hooks/useMockCapture";
import { useRequiredStep, type JourneyStep } from "./hooks/useRequiredStep";

type SideConfig = {
  title: string;
  hint: string;
  backHref: string;
  nextHref: string;
  /** Earlier journey step this side depends on, and where to send the user without it. */
  requires: JourneyStep;
  requiresRedirect: string;
  captured: { idFrontCaptured: true } | { idBackCaptured: true };
};

const SIDES: Record<IdSide, SideConfig> = {
  front: {
    title: "Front of EID",
    hint: "Place front side of your EID in the frame and we’ll take the photo automatically",
    backHref: "/verify/promo",
    nextHref: "/verify/id/back",
    requires: "otpVerified",
    requiresRedirect: "/verify/otp",
    captured: { idFrontCaptured: true },
  },
  back: {
    title: "Back of EID",
    hint: "Place back side of your EID in the frame and we’ll take the photo automatically",
    backHref: "/verify/id/front",
    nextHref: "/verify/selfie",
    requires: "idFrontCaptured",
    requiresRedirect: "/verify/id/front",
    captured: { idBackCaptured: true },
  },
};

/**
 * Figma "Front of EID" (1:2128 empty, 1:1860 captured) and "Back of EID" (1:2142).
 * No real camera: the frame "scans" briefly, then shows the sample card and the Continue button.
 */
export function IdCaptureScreen({ side }: { side: IdSide }) {
  const config = SIDES[side];
  const setState = useApplicationStore((s) => s.set);
  const ready = useRequiredStep(config.requires, config.requiresRedirect);

  const capture = useCallback(async () => {
    await verifyIdImage(side, MOCK_ID_IMAGE);
    setState(config.captured);
  }, [side, config.captured, setState]);
  const captured = useMockCapture(ready, capture);

  return (
    <Screen
      theme="dark"
      progress={0.5}
      header={<ScreenHeader theme="dark" caption="Verify identity" title={config.title} backHref={config.backHref} />}
      footer={
        captured ? (
          <Link href={config.nextHref} className={buttonClasses({ variant: "inverse" })}>
            Continue
          </Link>
        ) : (
          <div aria-hidden className="h-14" />
        )
      }
      className="flex flex-col items-center justify-center gap-5 px-6 pt-6"
    >
      <IdFrame side={side} captured={captured} />
      <p className="text-center text-p-xs text-brand-4">{config.hint}</p>
      <p role="status" className="sr-only">
        {captured ? `${config.title} captured` : "Scanning…"}
      </p>
    </Screen>
  );
}
