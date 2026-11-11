"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Cross-screen state for the credit card application journey.
 * Persisted in sessionStorage so a page refresh during a demo keeps progress;
 * closing the tab (or calling reset) starts over.
 *
 * Add fields here only when 2+ screens need them. Screen-local state stays in the component.
 */
type Consents = { bureau: boolean; terms: boolean; marketing: boolean; pia: boolean };

type ApplicationState = {
  productId: string | null;
  phone: string;
  email: string;
  consents: Consents;
  otpVerified: boolean;
  idFrontCaptured: boolean;
  idBackCaptured: boolean;
  selfieCaptured: boolean;
  promoCode: string | null;
};

type ApplicationActions = {
  setProduct: (productId: string) => void;
  setContact: (contact: { phone: string; email: string }) => void;
  setConsents: (consents: Partial<Consents>) => void;
  set: (patch: Partial<ApplicationState>) => void;
  reset: () => void;
};

const initialState: ApplicationState = {
  productId: null,
  phone: "",
  email: "",
  consents: { bureau: false, terms: false, marketing: false, pia: false },
  otpVerified: false,
  idFrontCaptured: false,
  idBackCaptured: false,
  selfieCaptured: false,
  promoCode: null,
};

export const useApplicationStore = create<ApplicationState & ApplicationActions>()(
  persist(
    (set) => ({
      ...initialState,
      setProduct: (productId) => set({ productId }),
      setContact: ({ phone, email }) => set({ phone, email }),
      setConsents: (consents) => set((s) => ({ consents: { ...s.consents, ...consents } })),
      set: (patch) => set(patch),
      reset: () => set(initialState),
    }),
    { name: "dsnt-application", storage: createJSONStorage(() => sessionStorage) },
  ),
);
