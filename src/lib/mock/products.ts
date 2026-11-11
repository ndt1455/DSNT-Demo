import { delay } from "./delay";

export type ProductCategory = "conventional" | "domestic";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  categories: ProductCategory[];
};

/** Mock catalog (Figma: "Product Selecting" 1:2287). */
export const PRODUCTS: Product[] = [
  { id: "credit-card", name: "Credit Card", tagline: "Premium rewards", categories: ["conventional", "domestic"] },
  { id: "personal-finance", name: "Personal Finance", tagline: "Flexible plans", categories: ["conventional"] },
  { id: "home-finance", name: "Home Finance", tagline: "Flexible plans", categories: ["domestic"] },
  { id: "auto-finance", name: "Auto Finance", tagline: "Flexible plans", categories: ["conventional", "domestic"] },
];

export async function listProducts(category?: ProductCategory): Promise<Product[]> {
  await delay(200);
  return category ? PRODUCTS.filter((p) => p.categories.includes(category)) : PRODUCTS;
}
