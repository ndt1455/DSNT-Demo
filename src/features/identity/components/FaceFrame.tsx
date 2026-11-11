import Image from "next/image";
import { MOCK_SELFIE_IMAGE } from "@/lib/mock";
import { cn } from "@/lib/utils/cn";
import { ScanLine } from "./ScanLine";

/**
 * Selfie oval. Captured: the sample selfie (green ring is part of the image) + tick (Figma 2:873).
 * Figma has no empty state; it mirrors the empty EID viewfinder so both cameras behave the same.
 * The selfie is mounted (hidden) while scanning so it is already loaded when the "photo" is taken.
 */
export function FaceFrame({ captured }: { captured: boolean }) {
  return (
    <div className="relative h-[314px] w-[267px] shrink-0">
      <Image
        src={MOCK_SELFIE_IMAGE}
        alt="Your selfie"
        width={265}
        height={311}
        loading="eager"
        className={cn("absolute top-1/2 left-1/2 -translate-1/2", !captured && "invisible")}
      />
      {captured ? (
        <Image
          src="/identity/captured.svg"
          alt=""
          width={24}
          height={24}
          className="absolute bottom-3.5 left-1/2 -translate-x-1/2"
        />
      ) : (
        <div className="absolute top-1/2 left-1/2 h-[307px] w-[261px] -translate-1/2 overflow-hidden rounded-[50%] border-2 border-brand-accent/20 bg-linear-142 from-brand-ink to-gray-12">
          <ScanLine />
        </div>
      )}
    </div>
  );
}
