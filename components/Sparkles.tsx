"use client";

import { useMemo } from "react";

interface SparklesProps {
  count?: number;
  className?: string;
}

/** Deterministic PRNG — see FloatingHearts.tsx for why this matters. */
function seededRandom(seed: number) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export default function Sparkles({ count = 18, className = "" }: SparklesProps) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const r1 = seededRandom(i * 4 + 101);
        const r2 = seededRandom(i * 4 + 102);
        const r3 = seededRandom(i * 4 + 103);
        const r4 = seededRandom(i * 4 + 104);
        return {
          id: i,
          left: Math.round(r1 * 100 * 100) / 100,
          top: Math.round(r2 * 100 * 100) / 100,
          size: 2 + r3 * 3,
          duration: 2 + r4 * 3,
          delay: seededRandom(i * 4 + 105) * 4,
        };
      }),
    [count]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-white animate-pulse-soft"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}
