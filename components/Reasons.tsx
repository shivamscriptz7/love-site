"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Smile,
  Sparkles as SparkleIcon,
  Shield,
  Sun,
  Music,
} from "lucide-react";
import Reveal from "./Reveal";

const REASONS = [
  {
    icon: Smile,
    title: "Your Smile",
    desc: "It lights up every room you walk into.",
  },
  {
    icon: Shield,
    title: "You Make Me Better",
    desc: "Just talking to you brings out a calmer, kinder version of me.",
  },
  {
    icon: Sun,
    title: "Your Warmth",
    desc: "Being around you feels like standing in the sun.",
  },
  {
    icon: SparkleIcon,
    title: "Your Spark",
    desc: "The way your eyes light up when you talk about your dreams.",
  },
  {
    icon: Music,
    title: "Little Moments",
    desc: "Every conversation with you ends too soon.",
  },
  {
    icon: Heart,
    title: "You're Simply You",
    desc: "No big reason needed — I just really like who you are.",
  },
];

export default function Reasons() {
  return (
    <section
      id="reasons"
      className="relative overflow-hidden bg-white py-24 dark:bg-plum-950 lg:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blush-200/30 blur-3xl dark:bg-blush-500/10" />

      <div className="section-container relative">
        <Reveal direction="up" className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-script text-4xl text-blush-500">
            Reasons I&apos;d Love To Get To Know You Better
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Every little thing that made me notice you
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} direction="up" delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card group relative h-full overflow-hidden rounded-3xl p-7 shadow-glass"
                >
                  {/* glow border on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-glow transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blush-300/30 blur-2xl transition-transform duration-500 group-hover:scale-150 dark:bg-blush-500/20" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow">
                    <Icon size={20} />
                  </div>
                  <h3 className="relative mt-5 font-display text-lg font-semibold text-ink">
                    {r.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">
                    {r.desc}
                  </p>

                  <motion.div
                    className="absolute bottom-4 right-4 text-blush-300 dark:text-blush-500/40"
                    animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 3 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart size={16} fill="currentColor" />
                  </motion.div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
