import Image from "next/image";
import { MOCK_ID_IMAGE, type IdSide } from "@/lib/mock";
import { cn } from "@/lib/utils/cn";
import { ScanLine } from "./ScanLine";

const corner = "absolute size-6 border-brand-accent";

/**
 * EID viewfinder. Empty: blue corner brackets + scan line (Figma 1:2128).
 * Captured: green border, the sample card and a tick (Figma 1:1860 front, 1:2142 back).
 * The sample image holds both sides stacked vertically, so each side is a top/bottom crop.
 * It is mounted (hidden) while scanning so it is already loaded when the "photo" is taken.
 */
export function IdFrame({ side, captured }: { side: IdSide; captured: boolean }) {
  return (
    <div
      className={cn(
        "relative h-64 w-full shrink-0 overflow-hidden rounded-2xl border-2 bg-linear-142 from-brand-ink to-gray-12",
        captured ? "border-success-9" : "border-brand-accent/20",
      )}
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 h-[184px] w-[278px] -translate-1/2 overflow-hidden rounded-2xl",
          !captured && "invisible",
        )}
      >
        <Image
          src={MOCK_ID_IMAGE}
          alt={`Captured ${side} side of your EID`}
          fill
          sizes="278px"
          loading="eager"
          className={cn("object-cover", side === "front" ? "object-top" : "object-bottom")}
        />
      </div>
      {captured ? (
        <Image src="/identity/captured.svg" alt="" width={24} height={24} className="absolute top-2.5 right-2.5" />
      ) : (
        <>
          <span className={cn(corner, "top-3 left-3 border-t-3 border-l-3")} />
          <span className={cn(corner, "top-3 right-3 border-t-3 border-r-3")} />
          <span className={cn(corner, "bottom-3 left-3 border-b-3 border-l-3")} />
          <span className={cn(corner, "right-3 bottom-3 border-r-3 border-b-3")} />
          <ScanLine />
        </>
      )}
    </div>
  );
}
