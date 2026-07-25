"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { SITE_CONFIG } from "@/lib/site-config";

const LETTER_PARAGRAPHS = [
  "I don't know where to begin, because every time I try to put you into words, they feel too small for what I actually feel.",
  "You walked into my life and made it softer, brighter, and so much more mine. Every memory we've made together — the silly fights, the long calls, the quiet moments — they're the things I hold onto on my hardest days.",
  "I'm not perfect, and I don't have it all figured out. But I know one thing for certain: I want to keep choosing you, today and every day after this.",
  "So here I am, laying my heart out on a page, hoping it makes you smile the way you make me smile every single day.",
];

export default function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="love-letter"
      className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-white to-blush-50 py-24 dark:from-plum-900 dark:via-plum-950 dark:to-plum-900 lg:py-32"
    >
      <div className="section-container">
        <Reveal direction="up" className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-script text-4xl text-blush-500">
            A Special Letter
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Words straight from my heart
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            Tap the envelope to open it, love.
          </p>
        </Reveal>

        <Reveal direction="blur" delay={0.15}>
          <div className="mx-auto mt-14 flex max-w-md flex-col items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open the love letter"
              className="group relative h-56 w-full max-w-sm cursor-pointer focus:outline-none"
            >
              {/* envelope back */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blush-300 to-blush-500 shadow-glow" />
              {/* paper peeking out */}
              <motion.div
                className="absolute inset-x-4 top-2 h-40 rounded-lg bg-white shadow-md dark:bg-plum-50"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              {/* envelope flap */}
              <div
                className="absolute inset-x-0 top-0 h-28 origin-top bg-gradient-to-br from-blush-400 to-blush-600 shadow-md transition-transform duration-500 group-hover:-translate-y-1"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 65%)" }}
              />
              {/* envelope front pocket */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-br from-blush-500 to-blush-700"
                style={{
                  clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)",
                }}
              />
              <motion.div
                className="absolute inset-x-0 top-[58%] flex -translate-y-1/2 items-center justify-center"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <Heart size={24} className="fill-blush-500 text-blush-500" />
                </div>
              </motion.div>

              <span className="absolute -bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blush-500">
                <Mail size={12} /> Click to Open
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Modal with the letter card */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rose-950/60 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl rounded-[1.75rem] bg-[#fdf6ee] p-8 shadow-2xl dark:bg-[#fdf6ee] sm:p-11"
            >
              {/* decorative hearts poking out the sides, like a pinned note */}
              <Heart
                size={22}
                className="absolute -left-3 top-1/3 fill-blush-400 text-blush-400 drop-shadow-md sm:-left-4"
              />
              <Heart
                size={16}
                className="absolute -right-2 top-16 fill-blush-300 text-blush-300 drop-shadow-md sm:-right-3"
              />

              <p className="font-script text-4xl text-blush-500 sm:text-[42px]">
                My Dearest,
              </p>

              <div className="mt-6 space-y-5">
                {LETTER_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed text-[#4a3b3f] sm:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <p className="mt-8 font-script text-3xl text-blush-500">
                Yours, always and forever.
              </p>
              <p className="mt-1 text-sm text-[#6b5a5e]">
                — {SITE_CONFIG.authorName}
              </p>

              <button
                onClick={() => setOpen(false)}
                className="mt-8 rounded-full border border-blush-300 px-6 py-2.5 text-sm font-medium text-blush-600 transition-colors hover:bg-blush-50"
              >
                Close letter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
