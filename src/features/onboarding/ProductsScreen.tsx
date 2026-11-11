"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { PRODUCTS, type ProductCategory } from "@/lib/mock";
import { useApplicationStore } from "@/stores/application";
import { useHasHydrated } from "@/stores/useHasHydrated";
import { ProductCard } from "./components/ProductCard";
import { TabButton } from "./components/TabButton";

type Tab = "all" | ProductCategory;

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "conventional", label: "Conventional" },
  { id: "domestic", label: "Domestic" },
];

/** Figma "Product Selecting" — 1:2287 (nothing selected) and 1:2254 (card selected, Continue enabled). */
export function ProductsScreen() {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const storedProductId = useApplicationStore((s) => s.productId);
  const setProduct = useApplicationStore((s) => s.setProduct);
  // Figma shows "Domestic" as the active tab.
  const [tab, setTab] = useState<Tab>("domestic");

  const selectedId = hydrated ? storedProductId : null;
  const products = tab === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(tab));

  return (
    <Screen
      header={
        <header className="flex shrink-0 flex-col items-center gap-4 p-6">
          <BrandLogo />
          <h1 className="text-center text-h5 text-gray-12">Which products are you interested in?</h1>
        </header>
      }
      footer={
        <Button disabled={!selectedId} onClick={() => router.push("/apply")}>
          Continue
        </Button>
      }
      className="flex flex-col gap-6 px-screen-x"
    >
      <div role="tablist" aria-label="Product type" className="flex justify-center gap-2">
        {TABS.map((t) => (
          <TabButton key={t.id} selected={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </TabButton>
        ))}
      </div>
      <ul className="flex flex-col gap-2 pb-2">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              selected={product.id === selectedId}
              onSelect={() => setProduct(product.id)}
            />
          </li>
        ))}
      </ul>
    </Screen>
  );
}
