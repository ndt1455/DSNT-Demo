"use client";

import { useRouter } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useApplicationStore } from "@/stores/application";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { Checkbox } from "./components/Checkbox";
import { ConsentCard } from "./components/ConsentCard";
import { SwipeSlider } from "./components/SwipeSlider";

/** Figma "Bureau Consent & T&C" (1:2214). Both boxes must be ticked before the slider unlocks. */
export function ConsentScreen() {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const consents = useApplicationStore((s) => s.consents);
  const setConsents = useApplicationStore((s) => s.setConsents);

  const bureau = hydrated && consents.bureau;
  const terms = hydrated && consents.terms;

  return (
    <Screen
      progress={0.5}
      header={<ScreenHeader caption="Set up profile" title="Bureau Consent & T&C" backHref="/apply/contact" />}
      footer={<SwipeSlider disabled={!bureau || !terms} onConfirm={() => router.push("/apply/marketing")} />}
      className="flex flex-col gap-4 px-screen-x pt-6"
    >
      <ConsentCard
        title="Bureau Consent"
        titleId="bureau-consent"
        body="I authorize Appro to access my credit information from AECB for evaluating my application."
      >
        <Checkbox
          label="I have read the Bureau Consent"
          checked={bureau}
          onChange={(e) => setConsents({ bureau: e.target.checked })}
        />
      </ConsentCard>
      <ConsentCard
        title="Terms & Conditions"
        titleId="terms-conditions"
        body="By proceeding, you agree to Appro's Terms & Conditions governing the use of our products."
      >
        <Checkbox
          label="I accept the Terms & Conditions"
          checked={terms}
          onChange={(e) => setConsents({ terms: e.target.checked })}
        />
      </ConsentCard>
    </Screen>
  );
}
