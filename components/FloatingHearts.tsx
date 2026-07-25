"use client";

import { useMemo } from "react";
import { Heart } from "lucide-react";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
  colorClass?: string;
}

/**
 * Deterministic pseudo-random generator (mulberry32).
 * Using Math.random() here would produce different values on the
 * server render vs. the client hydration render, causing a React
 * hydration mismatch. Seeding by index keeps output identical on
 * both sides.
 */
function seededRandom(seed: number) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export default function FloatingHearts({
  count = 10,
  className = "",
  colorClass = "text-blush-300/60 dark:text-blush-400/30",
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const r1 = seededRandom(i * 4 + 1);
        const r2 = seededRandom(i * 4 + 2);
        const r3 = seededRandom(i * 4 + 3);
        const r4 = seededRandom(i * 4 + 4);
        return {
          id: i,
          left: Math.round((r1 * 96 + 2) * 100) / 100,
          top: Math.round((r2 * 96 + 2) * 100) / 100,
          size: 12 + Math.round(r3 * 22),
          duration: 5 + r4 * 6,
          delay: seededRandom(i * 4 + 5) * 5,
        };
      }),
    [count]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className={`absolute animate-float ${colorClass}`}
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}
