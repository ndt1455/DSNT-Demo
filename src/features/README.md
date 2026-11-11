# Features

One folder per feature. A feature owns its screen components, feature-only components and hooks.
Routes in `src/app/**/page.tsx` stay thin: they import a screen from here and render it.

| Folder        | Screens (see `src/config/screens.ts`)                          |
| ------------- | -------------------------------------------------------------- |
| `onboarding`  | Splash, Product Selecting                                      |
| `application` | Just 3 steps, Contact Details, Consent, Marketing, Step status |
| `otp`         | OTP Verification, Verified Successfully                        |
| `identity`    | Scan EID, Promo, EID front/back camera, Selfie, Done           |
| `finalize`    | Finalize & Offers (not designed yet)                           |

Suggested layout inside a feature:

```
src/features/otp/
  OtpScreen.tsx          # screen component, rendered by src/app/verify/otp/page.tsx
  components/OtpInput.tsx
  hooks/useResendTimer.ts
```

Promote a component to `src/components/ui` only when a second feature needs it.
