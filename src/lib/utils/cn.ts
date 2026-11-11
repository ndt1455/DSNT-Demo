import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom font-size tokens (globals.css `--text-*`),
 * otherwise `text-p-sm` is mistaken for a text COLOR and dropped next to `text-gray-11`.
 * Add new `--text-*` tokens here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["h5", "h6", "p-xl", "p-lg", "p-md", "p-sm", "p-xs", "button", "button-sm", "logo", "tab"] },
      ],
    },
  },
});

/** Merge Tailwind class names; later classes win over earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
