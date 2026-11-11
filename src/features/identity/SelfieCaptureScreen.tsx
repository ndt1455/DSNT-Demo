"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { delay, MOCK_CAPTURE_MS, MOCK_SELFIE_IMAGE, verifySelfie } from "@/lib/mock";
import { useApplicationStore } from "@/stores/application";
import { FaceFrame } from "./components/FaceFrame";
import { useMockCapture } from "./hooks/useMockCapture";
import { useRequiredStep } from "./hooks/useRequiredStep";

const takeSelfie = () => delay(MOCK_CAPTURE_MS);

/**
 * Figma "Take a Selfie" (2:873). No real camera: the oval "scans" briefly, then shows the sample
 * selfie; Verify runs the mock face match and moves on to Documents verified.
 */
export function SelfieCaptureScreen() {
  const router = useRouter();
  const setState = useApplicationStore((s) => s.set);
  const ready = useRequiredStep("idBackCaptured", "/verify/id/back");
  const captured = useMockCapture(ready, takeSelfie);
  const [verifying, setVerifying] = useState(false);

  async function handleVerify() {
    setVerifying(true);
    const { ok } = await verifySelfie(MOCK_SELFIE_IMAGE);
    if (!ok) {
      setVerifying(false);
      return;
    }
    setState({ selfieCaptured: true });
    router.push("/verify/done");
  }

  return (
    <Screen
      theme="dark"
      progress={0.8}
      header={<ScreenHeader theme="dark" caption="Verify identity" title="Take a Selfie" backHref="/verify/selfie" />}
      footer={
        captured ? (
          <Button variant="inverse" onClick={handleVerify} disabled={verifying} aria-busy={verifying}>
            Verify
          </Button>
        ) : (
          <div aria-hidden className="h-14" />
        )
      }
      className="flex flex-col items-center justify-center gap-5 px-6 pt-6"
    >
      <FaceFrame captured={captured} />
      <p className="text-center text-p-xs text-brand-4">
        Position your face in the circle and we’ll take the photo automatically
      </p>
      <p role="status" className="sr-only">
        {verifying ? "Verifying your selfie…" : captured ? "Selfie taken" : "Scanning…"}
      </p>
    </Screen>
  );
}
