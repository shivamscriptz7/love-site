"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Reveal from "./Reveal";
import Sparkles from "./Sparkles";
import { SITE_CONFIG } from "@/lib/site-config";

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getElapsed(since: string): TimeParts {
  const start = new Date(since).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const UNITS: { key: keyof TimeParts; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function TogetherSince() {
  const [time, setTime] = useState<TimeParts | null>(null);

  useEffect(() => {
    setTime(getElapsed(SITE_CONFIG.togetherSince));
    const id = setInterval(() => {
      setTime(getElapsed(SITE_CONFIG.togetherSince));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#1a0b2e] py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-night-glow" />
      <div className="noise-overlay absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-blush-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
      <Sparkles count={16} />

      <div className="section-container relative">
        <Reveal direction="up" className="text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300">
            <Heart size={12} className="fill-gold-300" />
            Since We First Met
          </p>
          <h2 className="font-display text-2xl italic text-white sm:text-3xl lg:text-4xl">
            Every Second Thinking Of {SITE_CONFIG.partnerName}
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {UNITS.map((unit, i) => (
            <Reveal key={unit.key} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.03 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center shadow-glass backdrop-blur"
              >
                <motion.p
                  key={time ? time[unit.key] : "-"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-display text-4xl font-extrabold text-gradient sm:text-5xl"
                >
                  {time ? String(time[unit.key]).padStart(2, "0") : "--"}
                </motion.p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                  {unit.label}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
