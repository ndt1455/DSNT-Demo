import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { MobileShell } from "@/components/layout/MobileShell";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accer — DSNT Demo",
  description: "DSNT MVP: credit card onboarding & identity verification demo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body>
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
