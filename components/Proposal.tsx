"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PartyPopper, History, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";
import Reveal from "./Reveal";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  addResponse,
  clearResponses,
  formatResponseTime,
  getResponses,
  notifyByEmail,
  type DateResponse,
} from "@/lib/date-responses";

export default function Proposal() {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const [responses, setResponses] = useState<DateResponse[]>([]);

  // Load any previously recorded answers on mount (client-side only).
  useEffect(() => {
    setResponses(getResponses());
  }, []);

  const runCelebration = () => {
    const duration = 2800;
    const end = Date.now() + duration;
    const colors = ["#f8447a", "#e8a940", "#ff9fbb", "#ffffff", "#c11553"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors,
        shapes: ["circle"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors,
        shapes: ["circle"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({
      particleCount: 140,
      spread: 100,
      startVelocity: 45,
      origin: { y: 0.5 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        startVelocity: 55,
        origin: { x: 0.2, y: 0.4 },
        colors,
      });
      confetti({
        particleCount: 100,
        spread: 120,
        startVelocity: 55,
        origin: { x: 0.8, y: 0.4 },
        colors,
      });
    }, 400);
  };

  const handleChoice = (value: "yes" | "no") => {
    setChoice(value);
    const updated = addResponse(value);
    setResponses(updated);
    const latest = updated[updated.length - 1];
    notifyByEmail(SITE_CONFIG.partnerName, latest.choice, latest.timestamp);
    if (value === "yes") runCelebration();
  };

  const handleReset = () => {
    clearResponses();
    setResponses([]);
    setChoice(null);
  };

  return (
    <section
      id="proposal"
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      {/* Night background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#1a0b2e] via-[#2a1642] to-[#120720]" />
      <div className="absolute inset-0 -z-10 bg-night-glow" />
      <div className="noise-overlay absolute inset-0 -z-10" />

      {/* candle glows at the bottom corners */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 animate-flicker rounded-full bg-gold-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 animate-flicker rounded-full bg-gold-500/25 blur-3xl [animation-delay:1s]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-40 w-40 animate-flicker rounded-full bg-blush-500/20 blur-3xl [animation-delay:0.5s]" />

      <FloatingHearts count={16} colorClass="text-blush-400/40" />
      <Sparkles count={40} />

      <div className="section-container relative flex min-h-[70vh] flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {choice === null && (
            <motion.div
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex w-full flex-col items-center"
            >
              <Reveal direction="blur">
                <div className="mb-6 flex items-center justify-center gap-3 text-blush-300">
                  <Heart size={16} className="fill-blush-400" />
                  <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                    The Question
                  </p>
                  <Heart size={16} className="fill-blush-400" />
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.15}>
                <h2 className="max-w-3xl font-script text-5xl leading-tight text-white drop-shadow-[0_0_25px_rgba(248,68,122,0.5)] sm:text-6xl lg:text-7xl">
                  {SITE_CONFIG.partnerName}, Are You Ready For A Date?
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="mt-6 max-w-md text-sm text-white/70">
                  No pressure at all — just tell me honestly. Either answer is
                  okay with me 💛
                </p>
              </Reveal>

              <div className="mt-12 flex w-full max-w-lg flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <motion.button
                  onClick={() => handleChoice("yes")}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(248,68,122,0.5)",
                      "0 0 40px rgba(248,68,122,0.8)",
                      "0 0 20px rgba(248,68,122,0.5)",
                    ],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="relative z-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-9 py-4 text-base font-bold text-white"
                >
                  <Heart size={18} className="fill-white" />
                  Yes, I&apos;m Ready
                </motion.button>

                <motion.button
                  onClick={() => handleChoice("no")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10"
                >
                  Not Right Now
                </motion.button>
              </div>
            </motion.div>
          )}

          {choice === "yes" && (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 shadow-glow"
              >
                <PartyPopper size={36} className="text-white" />
              </motion.div>
              <h2 className="font-script text-5xl text-white drop-shadow-[0_0_25px_rgba(248,68,122,0.6)] sm:text-6xl">
                She Said Yes! 💛
              </h2>
              <p className="mt-6 max-w-md text-base text-white/80">
                {SITE_CONFIG.partnerName}, you just made my day. I can&apos;t
                wait to plan something special for our first date — talk soon!
              </p>
              <div className="mt-8 flex items-center gap-2 text-blush-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  >
                    <Heart size={20} className="fill-blush-400" />
                  </motion.span>
                ))}
              </div>
              <button
                onClick={() => setChoice(null)}
                className="mt-8 text-xs font-medium uppercase tracking-widest text-white/40 underline-offset-4 hover:text-white/70 hover:underline"
              >
                Ask again
              </button>
            </motion.div>
          )}

          {choice === "no" && (
            <motion.div
              key="declined"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                <Heart size={28} className="text-blush-300" />
              </div>
              <h2 className="font-script text-4xl text-white sm:text-5xl">
                That&apos;s Okay
              </h2>
              <p className="mt-6 max-w-md text-base text-white/70">
                Thank you for being honest with me, {SITE_CONFIG.partnerName}.
                No pressure, no hard feelings — I&apos;m really glad we can
                still talk.
              </p>
              <button
                onClick={() => setChoice(null)}
                className="mt-8 text-xs font-medium uppercase tracking-widest text-white/40 underline-offset-4 hover:text-white/70 hover:underline"
              >
                Change my answer
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response history — a running, timestamped log of every Yes/No pick */}
        {responses.length > 0 && (
          <Reveal direction="up" delay={0.2} className="mt-16 w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                  <History size={13} />
                  Response Log
                </p>
                <button
                  onClick={handleReset}
                  aria-label="Clear response history"
                  title="Clear response history"
                  className="text-white/30 transition-colors hover:text-blush-300"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <ul className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {[...responses].reverse().map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-sm"
                  >
                    <span
                      className={`font-semibold ${
                        r.choice === "yes" ? "text-blush-300" : "text-white/60"
                      }`}
                    >
                      {SITE_CONFIG.partnerName} said{" "}
                      {r.choice === "yes" ? "Yes 💛" : "No"}
                    </span>
                    <span className="text-xs text-white/40">
                      {formatResponseTime(r.timestamp)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
