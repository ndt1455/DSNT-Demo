import Image from "next/image";

type IconBadgeProps = { src: string; width: number; height: number };

/** 70px rounded square with a soft blue gradient around an illustration icon (Promo Code, Selfie). */
export function IconBadge({ src, width, height }: IconBadgeProps) {
  return (
    <span
      aria-hidden
      className="flex size-[70px] shrink-0 items-center justify-center rounded-[18px] border-[1.5px] border-brand-accent/15 bg-linear-135 from-brand-accent/10 to-brand-accent/20"
    >
      <Image src={src} alt="" width={width} height={height} loading="eager" />
    </span>
  );
}
