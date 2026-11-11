import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

/**
 * Demo hub — the showcase entry point. It only starts the full journey (Flow 1 → Flow 2);
 * the screen registry with build status lives in src/config/screens.ts.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-6 bg-brand-1 px-screen-x py-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-brand-9">
            <span className="size-2.5 rounded-sm bg-white" />
          </span>
          <span className="text-h6 font-semibold">Accer</span>
        </div>
        <h1 className="mt-3 text-h5">DSNT Demo</h1>
      </header>

      <Link href="/splash" className={buttonClasses()}>
        Start the full journey
      </Link>
    </main>
  );
}
