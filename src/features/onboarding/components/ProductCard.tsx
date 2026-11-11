import Image from "next/image";
import type { Product } from "@/lib/mock";
import { cn } from "@/lib/utils/cn";
import { ProductIllustration } from "./ProductIllustration";

type ProductCardProps = {
  product: Product;
  selected: boolean;
  onSelect: () => void;
};

/**
 * Figma component: "Product Card" — default (1:2287) and selected (1:2254: 2px blue border, blue title).
 * Border + 16px padding = Figma's 17.5px / 18px content inset, keeping the card 87 / 88px tall.
 */
export function ProductCard({ product, selected, onSelect }: ProductCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "relative w-full overflow-hidden rounded-[18px] bg-white p-4 text-left shadow-card active:opacity-90",
        selected ? "border-2 border-brand-9" : "border-[1.5px] border-gray-a2",
      )}
    >
      <Image
        src="/onboarding/product-card-glow.svg"
        alt=""
        width={225}
        height={225}
        className="pointer-events-none absolute top-[-39.5px] left-[202.5px] max-w-none"
      />
      <span className="relative flex flex-col gap-1">
        <ProductIllustration productId={product.id} />
        <span className="relative text-p-xs text-gray-9">{product.tagline}</span>
        <span className={cn("relative text-h6", selected ? "text-brand-9" : "text-label-primary")}>{product.name}</span>
      </span>
    </button>
  );
}
