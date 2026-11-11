"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SPLASH_DURATION_MS = 2000;

/** Figma "Loading Screen" (1:2387): blue radial gradient with two blurred light ellipses. */
export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace("/products"), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div data-status-bar="light" className="flex flex-1 flex-col">
      {/* Positioned against the shell so the art also fills the area under the status bar. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden bg-radial-[closest-side] from-splash-1 via-splash-2 to-splash-3"
      >
        <Image
          src="/onboarding/splash-glow.svg"
          alt=""
          width={684}
          height={1354}
          loading="eager"
          className="absolute top-[calc(50%-689px)] left-[calc(50%-336.5px)] max-w-none"
        />
      </div>
      <h1 className="sr-only">Accer is loading</h1>
    </div>
  );
}
