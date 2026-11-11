"use client";

import { useRouter } from "next/navigation";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useApplicationStore } from "@/stores/application";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { ConsentCard } from "./components/ConsentCard";
import { SwipeSlider } from "./components/SwipeSlider";
import { Toggle } from "./components/Toggle";

/** Figma "Marketing & PIA" (1:2234). Both consents are optional (off by default). */
export function MarketingScreen() {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const consents = useApplicationStore((s) => s.consents);
  const setConsents = useApplicationStore((s) => s.setConsents);

  return (
    <Screen
      progress={0.5}
      header={<ScreenHeader caption="Set up profile" title="Marketing & PIA" backHref="/apply/consent" />}
      footer={<SwipeSlider onConfirm={() => router.push("/apply/step-status")} />}
      className="flex flex-col gap-4 px-screen-x pt-6"
    >
      <ConsentCard
        title="Marketing Communications"
        titleId="marketing-consent"
        body="Receive notifications about loan approval status and special offers"
        action={
          <Toggle
            labelledBy="marketing-consent"
            checked={hydrated && consents.marketing}
            onChange={(marketing) => setConsents({ marketing })}
          />
        }
      />
      <ConsentCard
        title="Personal Information Access"
        titleId="pia-consent"
        body="Collect and process personal data"
        action={
          <Toggle
            labelledBy="pia-consent"
            checked={hydrated && consents.pia}
            onChange={(pia) => setConsents({ pia })}
          />
        }
      />
    </Screen>
  );
}
