import Image from "next/image";
import Link from "next/link";

/** White 42px round icon button (Figma "Icon L"); the ::after extends the tap target to 46px. */
const iconButton =
  "relative flex shrink-0 items-center justify-center rounded-full border border-white bg-white p-2 after:absolute after:-inset-0.5 active:opacity-70";

type ScreenHeaderProps = {
  /** Small line above the title, e.g. "Set up profile" / "Verify identity". */
  caption: string;
  title: string;
  backHref: string;
};

/**
 * Figma component: "Header" (72px) — back arrow, caption + title, kebab menu.
 * The kebab menu has no design yet; it opens the demo hub so testers can jump between screens.
 */
export function ScreenHeader({ caption, title, backHref }: ScreenHeaderProps) {
  return (
    <header className="flex h-18 shrink-0 items-center px-4 py-3">
      <div className="flex w-full items-center gap-6">
        <Link href={backHref} aria-label="Back" className={iconButton}>
          <Image src="/shared/icons/arrow-left.svg" alt="" width={24} height={24} />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col text-center">
          <p className="text-p-xs text-gray-10">{caption}</p>
          <h1 className="text-p-md font-semibold text-gray-12">{title}</h1>
        </div>
        <Link href="/" aria-label="Demo menu" className={iconButton}>
          <Image src="/shared/icons/more.svg" alt="" width={24} height={24} />
        </Link>
      </div>
    </header>
  );
}
