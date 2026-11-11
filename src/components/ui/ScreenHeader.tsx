import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Theme = "light" | "dark";

/** 42px round icon button (Figma "Icon L"); the ::after extends the tap target to 46px. */
const iconButton =
  "relative flex shrink-0 items-center justify-center rounded-full border p-2 after:absolute after:-inset-0.5 active:opacity-70";

const themes: Record<Theme, { button: string; caption: string; title: string; iconSuffix: string }> = {
  light: { button: "border-white bg-white", caption: "text-gray-10", title: "text-gray-12", iconSuffix: "" },
  dark: { button: "border-white/10 bg-white/10", caption: "text-gray-4", title: "text-white", iconSuffix: "-light" },
};

type ScreenHeaderProps = {
  /** Small line above the title, e.g. "Set up profile" / "Verify identity". */
  caption: string;
  title: string;
  backHref: string;
  /** "dark" for screens on the dark camera background (Figma: translucent buttons, white text). */
  theme?: Theme;
};

/**
 * Figma component: "Header" (72px) — back arrow, caption + title, kebab menu.
 * The kebab menu has no design yet; it opens the demo hub so testers can restart the journey.
 */
export function ScreenHeader({ caption, title, backHref, theme = "light" }: ScreenHeaderProps) {
  const t = themes[theme];

  return (
    <header className="flex h-18 shrink-0 items-center px-4 py-3">
      <div className="flex w-full items-center gap-6">
        <Link href={backHref} aria-label="Back" className={cn(iconButton, t.button)}>
          <Image src={`/shared/icons/arrow-left${t.iconSuffix}.svg`} alt="" width={24} height={24} />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col text-center">
          <p className={cn("text-p-xs", t.caption)}>{caption}</p>
          <h1 className={cn("text-p-md font-semibold", t.title)}>{title}</h1>
        </div>
        <Link href="/" aria-label="Demo menu" className={cn(iconButton, t.button)}>
          <Image src={`/shared/icons/more${t.iconSuffix}.svg`} alt="" width={24} height={24} />
        </Link>
      </div>
    </header>
  );
}
