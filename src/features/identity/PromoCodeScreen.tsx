"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Screen } from "@/components/layout/Screen";
import { Button, buttonClasses } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { applyPromoCode } from "@/lib/mock";
import { useApplicationStore } from "@/stores/application";
import { IconBadge } from "./components/IconBadge";
import { InfoCard } from "./components/InfoCard";
import { useRequiredStep } from "./hooks/useRequiredStep";

const FORM_ID = "promo-code-form";
const NEXT_SCREEN = "/verify/id/front";

/** Figma "Promo Code" (1:2188). Optional step: Apply validates via the mock, Skip goes straight on. */
export function PromoCodeScreen() {
  const router = useRouter();
  const setState = useApplicationStore((s) => s.set);
  useRequiredStep("otpVerified", "/verify/otp");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [applying, setApplying] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApplying(true);
    const { ok, message } = await applyPromoCode(code);
    setApplying(false);
    if (!ok) {
      setError(message);
      return;
    }
    setState({ promoCode: code.trim().toUpperCase() });
    router.push(NEXT_SCREEN);
  }

  return (
    <Screen
      progress={0.5}
      header={<ScreenHeader caption="Verify identity" title="Promo Code" backHref="/verify/id" />}
      footer={
        <div className="flex flex-col gap-2.5">
          <Button type="submit" form={FORM_ID} disabled={!code.trim() || applying} aria-busy={applying}>
            Apply
          </Button>
          <Link href={NEXT_SCREEN} className={buttonClasses({ variant: "link" })}>
            Skip for now
          </Link>
        </div>
      }
      className="px-6 pt-6"
    >
      <InfoCard>
        <IconBadge src="/identity/promo-code.svg" width={32} height={32} />
        <div className="flex flex-col items-center text-center">
          <h2 className="text-p-lg font-medium text-brand-ink">Have a Promo Code?</h2>
          <p className="text-p-sm text-brand-muted">Enter your promo code to unlock exclusive benefits</p>
        </div>
        <form id={FORM_ID} onSubmit={handleSubmit} className="w-full">
          <InputField
            id="promo-code"
            aria-label="Promo code"
            placeholder="Enter promo code"
            autoComplete="off"
            autoCapitalize="characters"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError(undefined);
            }}
            error={error}
          />
        </form>
      </InfoCard>
    </Screen>
  );
}
