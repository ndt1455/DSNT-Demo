/**
 * Screen registry — single source of truth mapping app routes to Figma frames.
 *
 * - Before building a screen, open its Figma node (figmaUrl(nodeId)) via the Figma MCP / browser.
 * - When you finish a screen, flip `status` to "done" in the same PR.
 * - Keep the order identical to the order on the Figma canvas.
 */

export const FIGMA_FILE_KEY = "dcN7QgL7L0HSpOuKC9UZA2";

export function figmaUrl(nodeId: string) {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}/Demo-DSNT?node-id=${nodeId.replace(":", "-")}`;
}

export type ScreenStatus = "todo" | "in-progress" | "done";

export type Screen = {
  /** App route (App Router path under src/app). */
  route: string;
  title: string;
  /** Figma node IDs of the frame(s) — the first is the default state, others are variants. */
  figmaNodes: string[];
  /** Feature folder under src/features that owns this screen. */
  feature: "onboarding" | "application" | "otp" | "identity" | "finalize";
  status: ScreenStatus;
  notes?: string;
};

export type Flow = { id: string; title: string; figmaSection: string; screens: Screen[] };

export const FLOWS: Flow[] = [
  {
    id: "flow-1",
    title: "Flow 1 — Product selection & set up profile",
    figmaSection: "6:1048",
    screens: [
      { route: "/splash", title: "Loading Screen", figmaNodes: ["1:2387"], feature: "onboarding", status: "todo" },
      {
        route: "/products",
        title: "Product Selecting",
        figmaNodes: ["1:2287", "1:2254"],
        feature: "onboarding",
        status: "todo",
        notes: "1:2254 = card selected + Continue enabled. Tabs: All / Conventional / Domestic.",
      },
      {
        route: "/apply",
        title: "Just 3 steps (overview)",
        figmaNodes: ["1:2352", "1:2368"],
        feature: "application",
        status: "todo",
        notes: "1:2352 = collapsed/animated state, 1:2368 = all 3 step cards expanded.",
      },
      {
        route: "/apply/contact",
        title: "Contact Details",
        figmaNodes: ["1:1774"],
        feature: "application",
        status: "todo",
      },
      {
        route: "/apply/consent",
        title: "Bureau Consent & T&C",
        figmaNodes: ["1:2214"],
        feature: "application",
        status: "todo",
        notes: "Bottom CTA is a SwipeSlider ('Swipe to confirm').",
      },
      {
        route: "/apply/marketing",
        title: "Marketing & PIA",
        figmaNodes: ["1:2234"],
        feature: "application",
        status: "todo",
      },
      {
        route: "/apply/step-status",
        title: "Step 1 completed",
        figmaNodes: ["1:2320"],
        feature: "application",
        status: "todo",
      },
      { route: "/verify/otp", title: "OTP Verification", figmaNodes: ["1:1785"], feature: "otp", status: "todo" },
      {
        route: "/verify/otp/success",
        title: "Verified Successfully",
        figmaNodes: ["1:2205"],
        feature: "otp",
        status: "todo",
      },
    ],
  },
  {
    id: "flow-2",
    title: "Flow 2 — Verify identity",
    figmaSection: "6:1049",
    screens: [
      {
        route: "/verify/id",
        title: "Scan EID (intro)",
        figmaNodes: ["1:1803"],
        feature: "identity",
        status: "done",
      },
      {
        route: "/verify/promo",
        title: "Have a Promo Code?",
        figmaNodes: ["1:2188"],
        feature: "identity",
        status: "done",
        notes: "Follows the canvas order: Scan EID intro → Promo Code → EID camera (confirmed with the team).",
      },
      {
        route: "/verify/id/front",
        title: "Front of EID (camera)",
        figmaNodes: ["1:2128", "1:1860"],
        feature: "identity",
        status: "done",
        notes: "1:2128 = empty viewfinder, 1:1860 = captured. Use webcam or mock image.",
      },
      {
        route: "/verify/id/back",
        title: "Back of EID (camera)",
        figmaNodes: ["1:2142"],
        feature: "identity",
        status: "done",
      },
      {
        route: "/verify/selfie",
        title: "Selfie Verification (intro)",
        figmaNodes: ["1:1842"],
        feature: "identity",
        status: "done",
      },
      {
        route: "/verify/selfie/camera",
        title: "Take a Selfie (camera)",
        figmaNodes: ["2:873"],
        feature: "identity",
        status: "done",
      },
      {
        route: "/verify/done",
        title: "Documents verified",
        figmaNodes: ["2:886"],
        feature: "identity",
        status: "done",
      },
    ],
  },
];
