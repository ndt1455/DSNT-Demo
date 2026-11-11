import type { ReactNode } from "react";

type ConsentCardProps = {
  title: string;
  titleId: string;
  /** Rendered next to the title (e.g. a Toggle). */
  action?: ReactNode;
  body: string;
  /** Rendered under the body (e.g. a Checkbox). */
  children?: ReactNode;
};

/** Frosted card from "Bureau Consent & T&C" (1:2214) and "Marketing & PIA" (1:2234). */
export function ConsentCard({ title, titleId, action, body, children }: ConsentCardProps) {
  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col gap-4 rounded-3xl bg-white/60 p-4 shadow-card backdrop-blur-[2px]"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id={titleId} className="text-p-md font-semibold text-brand-12">
          {title}
        </h2>
        {action}
      </div>
      <div className="rounded-lg border border-brand-a3 bg-brand-a1 p-3">
        {/* Figma fixes the text box at 253px, which sets the line breaks. */}
        <p className="max-w-[253px] text-p-xs text-gray-9">{body}</p>
      </div>
      {children}
    </section>
  );
}
