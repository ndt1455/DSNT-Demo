import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FLOWS, figmaUrl, type ScreenStatus } from "@/config/screens";
import { cn } from "@/lib/utils/cn";

/**
 * Demo hub — lists every screen from the Figma file with its build status.
 * Used for showcase navigation and to see team progress. Data: src/config/screens.ts
 */
const statusStyle: Record<ScreenStatus, string> = {
  todo: "bg-gray-4 text-gray-10",
  "in-progress": "bg-brand-4 text-brand-9",
  done: "bg-success-10/15 text-success-10",
};

export default function Home() {
  const total = FLOWS.reduce((n, f) => n + f.screens.length, 0);
  const done = FLOWS.reduce((n, f) => n + f.screens.filter((s) => s.status === "done").length, 0);

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
        <p className="text-p-sm text-gray-10">
          {done}/{total} screens built. Tap a screen to open it.
        </p>
      </header>

      {FLOWS.map((flow) => (
        <section key={flow.id} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-p-sm font-semibold">{flow.title}</h2>
            <a
              href={figmaUrl(flow.figmaSection)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-p-xs text-brand-9"
            >
              Figma <ExternalLink className="size-3" />
            </a>
          </div>
          <ul className="flex flex-col divide-y divide-gray-4 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(5,41,112,0.06)]">
            {flow.screens.map((screen) => {
              const body = (
                <>
                  <span className="flex flex-col">
                    <span className="text-p-sm font-medium">{screen.title}</span>
                    <span className="text-p-xs text-gray-9">{screen.route}</span>
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-p-xs", statusStyle[screen.status])}>
                    {screen.status}
                  </span>
                </>
              );
              return (
                <li key={screen.route}>
                  {screen.status === "todo" ? (
                    <div className="flex items-center justify-between px-4 py-3 opacity-70">{body}</div>
                  ) : (
                    <Link href={screen.route} className="flex items-center justify-between px-4 py-3 active:bg-gray-2">
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
