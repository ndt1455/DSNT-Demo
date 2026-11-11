import Image from "next/image";

/**
 * Product art from the Figma "Product Card" instances, positioned relative to the card's content box
 * (exact offsets from Figma). The card clips whatever overflows its rounded edge.
 */
export function ProductIllustration({ productId }: { productId: string }) {
  switch (productId) {
    case "credit-card":
      return (
        <span aria-hidden className="absolute top-[-9.5px] left-[184.5px] size-[123px] overflow-hidden">
          <Image
            src="/onboarding/credit-card.svg"
            alt=""
            width={110}
            height={103}
            className="absolute top-[6.65px] left-[6.43px] max-w-none"
          />
        </span>
      );
    case "personal-finance":
      return (
        <span aria-hidden className="absolute top-[-19.5px] left-[202.5px] size-[123px] overflow-hidden">
          <Image
            src="/onboarding/personal-finance-hand.svg"
            alt=""
            width={102}
            height={50}
            className="absolute top-[62.29px] left-[10.8px] max-w-none -scale-x-100"
          />
          <Image
            src="/onboarding/personal-finance-coin.svg"
            alt=""
            width={62}
            height={62}
            className="absolute top-[9.98px] left-[10.8px] max-w-none"
          />
        </span>
      );
    case "home-finance":
      return (
        <span aria-hidden className="absolute top-[-12.5px] left-[206.5px] size-24 overflow-hidden">
          <Image
            src="/onboarding/home-finance.svg"
            alt=""
            width={96}
            height={90}
            className="absolute top-[2.99px] left-0 max-w-none"
          />
        </span>
      );
    case "auto-finance":
      return (
        <span aria-hidden className="absolute top-[-19.5px] left-[202.5px] size-[123px]">
          <Image src="/onboarding/auto-finance.svg" alt="" width={123} height={123} className="max-w-none" />
        </span>
      );
    default:
      return null;
  }
}
