import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
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
    <html lang="en" className={`${sora.variable} ${manrope.variable} h-full antialiased`}>
      <body>
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
