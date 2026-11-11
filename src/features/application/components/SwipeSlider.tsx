"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils/cn";

/** Drag handle hit area (Figma "Drag": 60px), the knob inside it is 52px. */
const HANDLE_SIZE = 60;
/** Share of the track the handle must travel before release confirms. */
const CONFIRM_RATIO = 0.85;

type SwipeSliderProps = {
  label?: string;
  disabled?: boolean;
  onConfirm: () => void;
};

/**
 * Figma component: "SwipeSlider" — drag the white knob to the end of the blue track to confirm.
 * Keyboard users focus the knob and press Enter / Space instead of dragging.
 */
export function SwipeSlider({ label = "Swipe to confirm", disabled = false, onConfirm }: SwipeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ pointerX: number; offset: number } | null>(null);
  // Mirrors `offset` so pointer handlers see the latest position even before React re-renders.
  const offsetRef = useRef(0);
  const [offset, setOffsetState] = useState(0);
  /** Track travel measured when a drag starts; drives the label fade during render. */
  const [travel, setTravel] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const maxOffset = () => (trackRef.current?.clientWidth ?? HANDLE_SIZE) - HANDLE_SIZE;
  const locked = disabled || confirmed;

  function setOffset(value: number) {
    offsetRef.current = value;
    setOffsetState(value);
  }

  function confirm() {
    setOffset(maxOffset());
    setConfirmed(true);
    onConfirm();
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (locked) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { pointerX: event.clientX, offset: offsetRef.current };
    setTravel(maxOffset());
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragStart.current) return;
    const next = dragStart.current.offset + event.clientX - dragStart.current.pointerX;
    setOffset(Math.min(Math.max(next, 0), maxOffset()));
  }

  function handlePointerUp() {
    if (!dragStart.current) return;
    dragStart.current = null;
    setDragging(false);
    if (offsetRef.current >= maxOffset() * CONFIRM_RATIO) confirm();
    else setOffset(0);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (locked || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    confirm();
  }

  const progress = travel > 0 ? Math.min(offset / travel, 1) : 0;

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative h-[60px] w-full overflow-hidden rounded-[30px] bg-linear-[158deg] from-brand-9 from-20% to-brand-light to-84% shadow-swipe transition-opacity",
        disabled && "opacity-50",
      )}
    >
      {!locked && (
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 animate-swipe-shine bg-linear-to-r from-transparent via-white/12 to-transparent motion-reduce:hidden"
        />
      )}
      <p
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-p-sm font-semibold text-white"
        style={{ opacity: 1 - progress }}
      >
        {label}
      </p>
      <button
        type="button"
        aria-label={label}
        aria-disabled={locked}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute top-0 left-0 size-[60px] touch-none rounded-[30px] bg-white/6 select-none focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
          !dragging && "transition-transform duration-300 ease-out",
          locked ? "cursor-default" : "cursor-grab active:cursor-grabbing",
        )}
        style={{ transform: `translateX(${offset}px)` }}
      >
        <span className="absolute top-1 left-1 flex size-[52px] items-center justify-center rounded-[26px] bg-linear-135 from-white to-knob-to drop-shadow-swipe-knob">
          {/* Not draggable: a native image drag would cancel the pointer mid-swipe on desktop. */}
          <Image
            src="/application/arrow-right.svg"
            alt=""
            width={20}
            height={20}
            draggable={false}
            className="pointer-events-none"
          />
        </span>
      </button>
    </div>
  );
}
