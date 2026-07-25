"use client";

import { motion } from "framer-motion";
import { Gem, Heart } from "lucide-react";
import Sparkles from "./Sparkles";
import { SITE_CONFIG } from "@/lib/site-config";

const LINE_1 = "This isn't just about one date.";
const LINE_2 = `If things go well between us, I'd love for it to lead all the way to marriage someday.`;

function WordReveal({
  text,
  className,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            delay: startDelay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function FutureTogether() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2a1642] via-[#1a0b2e] to-[#2a1642] py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-night-glow" />
      <div className="noise-overlay absolute inset-0 -z-10" />
      <Sparkles count={26} />

      {/* Slowly pulsing glow rings behind the ring icon */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-blush-500/20 blur-3xl" />

      <div className="section-container relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-gold-500 shadow-glow-gold"
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-gold-300/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <Gem size={30} className="text-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-4 text-xs font-semibold uppercase text-gold-300"
        >
          Looking Ahead
        </motion.p>

        <WordReveal
          text={LINE_1}
          className="max-w-2xl font-display text-2xl font-medium text-white/80 sm:text-3xl"
        />

        <div className="mt-4 max-w-2xl">
          <WordReveal
            text={LINE_2}
            startDelay={0.4}
            className="font-script text-3xl leading-snug text-gradient sm:text-4xl lg:text-5xl"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-8 flex items-center gap-2 text-sm text-white/60"
        >
          <Heart size={13} className="fill-blush-400 text-blush-400" />
          One step at a time, {SITE_CONFIG.partnerName} — starting with a
          simple date.
        </motion.p>
      </div>
    </section>
  );
}
