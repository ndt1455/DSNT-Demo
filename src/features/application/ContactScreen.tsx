"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Screen } from "@/components/layout/Screen";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useApplicationStore } from "@/stores/application";
import { useHasHydrated } from "@/stores/useHasHydrated";

const FORM_ID = "contact-form";
const COUNTRY_CODE = "+971";
/** UAE mobile numbers: 9 digits starting with 5 ("5X XXX XXXX"). */
const MOBILE_PATTERN = /^5\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { phone?: string; email?: string };

/** "501234567" → "50 123 4567", matching the Figma placeholder grouping. */
function formatMobile(digits: string) {
  return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5)].filter(Boolean).join(" ");
}

function validate(digits: string, email: string): Errors {
  return {
    phone: MOBILE_PATTERN.test(digits) ? undefined : "Enter a valid UAE mobile number, e.g. 50 123 4567",
    email: EMAIL_PATTERN.test(email.trim()) ? undefined : "Enter a valid email address",
  };
}

/** Figma "ContactScreen" (1:1774). */
export function ContactScreen() {
  const hydrated = useHasHydrated();

  return (
    <Screen
      progress={0.25}
      header={<ScreenHeader caption="Set up profile" title="Contact Details" backHref="/apply" />}
      footer={
        <Button type="submit" form={FORM_ID}>
          Continue
        </Button>
      }
      className="px-screen-x pt-6"
    >
      {/* Mounted after hydration so the fields start from the persisted values. */}
      {hydrated && <ContactForm />}
    </Screen>
  );
}

function ContactForm() {
  const router = useRouter();
  const storedPhone = useApplicationStore((s) => s.phone);
  const storedEmail = useApplicationStore((s) => s.email);
  const setContact = useApplicationStore((s) => s.setContact);

  const [digits, setDigits] = useState(storedPhone.replace(COUNTRY_CODE, ""));
  const [email, setEmail] = useState(storedEmail);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(digits, email);
    setErrors(nextErrors);
    if (nextErrors.phone || nextErrors.email) return;

    setContact({ phone: `${COUNTRY_CODE}${digits}`, email: email.trim() });
    router.push("/apply/consent");
  }

  return (
    <form
      id={FORM_ID}
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl bg-white/60 px-4 py-6 shadow-card backdrop-blur-[2px]"
    >
      <InputField
        id="mobile"
        label="Mobile Number"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="5X XXX XXXX"
        value={formatMobile(digits)}
        onChange={(e) => {
          setDigits(e.target.value.replace(/\D/g, "").slice(0, 9));
          setErrors((prev) => ({ ...prev, phone: undefined }));
        }}
        error={errors.phone}
        leading={
          <span className="flex h-6 shrink-0 items-center gap-1 text-p-sm text-gray-12">
            {COUNTRY_CODE}
            <Image src="/shared/icons/chevron-down.svg" alt="" width={16} height={16} />
          </span>
        }
      />
      <InputField
        id="email"
        label="Email Address"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
      />
    </form>
  );
}
