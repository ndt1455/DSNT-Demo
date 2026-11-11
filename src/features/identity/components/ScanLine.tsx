/** Glowing line that sweeps the viewfinder while the mock camera is "looking" (Figma: scan line on 1:2128). */
export function ScanLine() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-4 top-3/4 h-0.5 animate-scan-line bg-linear-to-r from-transparent via-brand-accent to-transparent opacity-60 motion-reduce:animate-none"
    />
  );
}
