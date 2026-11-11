import Image from "next/image";

/** Figma "List item" group: capture tips with a blue tick, in a light-blue bordered box. */
export function TipsList({ tips }: { tips: string[] }) {
  return (
    <ul className="flex w-full flex-col gap-1 rounded-lg border border-brand-a3 bg-brand-a1 p-4">
      {tips.map((tip) => (
        <li key={tip} className="flex items-center gap-2 font-jakarta text-tab text-brand-9">
          <Image src="/identity/tick.svg" alt="" width={20} height={20} />
          {tip}
        </li>
      ))}
    </ul>
  );
}
