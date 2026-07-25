"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles as SparkleIcon } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-24"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blush-50 via-white to-blush-50 dark:from-plum-950 dark:via-plum-900 dark:to-plum-950" />
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="noise-overlay absolute inset-0 -z-10" />

      {/* Decorative floating petals / hearts */}
      <FloatingHearts count={14} />
      <Sparkles count={16} />

      <motion.div
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blush-300/30 blur-3xl dark:bg-blush-500/10"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl dark:bg-gold-400/10"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-container relative grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: text */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-blush-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-blush-300"
          >
            Hey {SITE_CONFIG.partnerName} <Heart size={14} className="fill-blush-500 text-blush-500" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Will You
            <br />
            <span className="relative inline-block font-script text-6xl font-normal leading-tight text-gradient sm:text-7xl lg:text-8xl">
              Go On A Date?
              <motion.span
                className="absolute -right-10 -top-6 hidden text-blush-500 sm:block"
                animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart size={40} className="fill-blush-500" />
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft lg:mx-0"
          >
            I&apos;ve been wanting to ask you this for a while now — so I
            built you something a little more special than a text message.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollTo("our-story")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-lg"
            >
              <Heart size={16} className="fill-white" />
              Start Our Journey
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo("proposal")}
              className="inline-flex items-center gap-2 rounded-full border border-blush-300/70 bg-white/50 px-6 py-3.5 text-sm font-semibold text-blush-600 backdrop-blur transition-all hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-blush-300 dark:hover:bg-white/10"
            >
              <SparkleIcon size={15} />
              See The Question
            </button>
          </motion.div>
        </div>

        {/* Right: image with curved frame + note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-white/40 dark:ring-white/10">
            <Image
              src="/hero/couple-hero.svg"
              alt="A romantic portrait placeholder — replace with your own photo"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 via-transparent to-transparent" />
          </div>

          {/* floating note card — always visible, repositioned for small screens */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [3, 5, 3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card absolute -right-2 top-6 z-20 w-32 rotate-3 rounded-2xl p-3 text-center shadow-glass sm:-right-4 sm:top-8 sm:w-40 sm:p-4 lg:-right-10"
          >
            <p className="font-script text-lg text-blush-600 dark:text-blush-300 sm:text-2xl">
              You
            </p>
            <p className="font-script text-base text-ink-soft sm:text-xl">&amp;</p>
            <p className="font-script text-lg text-blush-600 dark:text-blush-300 sm:text-2xl">
              Me
            </p>
            <Heart
              size={14}
              className="mx-auto mt-2 fill-blush-500 text-blush-500 sm:h-4 sm:w-4"
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-3 bottom-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 shadow-glass backdrop-blur sm:-left-6 sm:bottom-10 sm:h-16 sm:w-16 dark:bg-white/10"
          >
            <Heart size={18} className="fill-blush-500 text-blush-500 sm:h-[22px] sm:w-[22px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-soft/70 sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <span className="h-8 w-[1px] bg-gradient-to-b from-blush-400 to-transparent" />
      </motion.div>
    </section>
  );
}
