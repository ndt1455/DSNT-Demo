/** Accer logo lockup used in screen headers (Figma: 28px gradient mark + "Accer" wordmark). */
export function BrandLogo() {
  return (
    <div className="flex h-7 items-center gap-2">
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-[9px] bg-linear-135 from-brand-grad-from to-brand-grad-to"
      >
        <span className="size-[9px] rounded-[3px] bg-white/85" />
      </span>
      <span className="text-logo font-bold text-brand-ink">Accer</span>
    </div>
  );
}
