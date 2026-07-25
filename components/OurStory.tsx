"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Coffee, Camera, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const MILESTONES = [
  {
    icon: Heart,
    title: "We Met",
    date: "Feb 14, 2022",
    desc: "A coincidence that changed everything.",
  },
  {
    icon: MessageCircle,
    title: "First Chat",
    date: "Feb 15, 2022",
    desc: 'That first "Hi" was the start of magic.',
  },
  {
    icon: Coffee,
    title: "Getting To Know You",
    date: "Ever Since",
    desc: "Every conversation made me like you a little more.",
  },
  {
    icon: Camera,
    title: "Today",
    date: "Right Now",
    desc: "Finally working up the courage to ask you out.",
  },
];

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-white py-24 dark:bg-plum-950 lg:py-32"
    >
      <div className="section-container relative grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_2fr] lg:items-start">
        {/* Heading */}
        <Reveal direction="left">
          <p className="mb-3 font-script text-4xl text-blush-500">
            Our Story
          </p>
          <h2 className="max-w-xs font-display text-2xl font-semibold text-ink lg:text-3xl">
            A beautiful journey we&apos;ll cherish forever.
          </h2>
          <button
            onClick={() =>
              document
                .getElementById("memories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-blush-300/70 px-5 py-2.5 text-sm font-semibold text-blush-600 transition-colors hover:bg-blush-50 dark:border-white/15 dark:text-blush-300 dark:hover:bg-white/5"
          >
            Read Full Story <ArrowRight size={14} />
          </button>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-[2px] bg-gradient-to-r from-blush-200 via-blush-400 to-blush-200 dark:from-white/10 dark:via-blush-400/40 dark:to-white/10 lg:block" />
          <motion.div
            className="absolute left-0 top-8 hidden h-[2px] bg-gradient-to-r from-blush-500 to-gold-400 dark:block lg:block"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} direction="up" delay={i * 0.15}>
                  <div className="relative flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blush-50 text-blush-600 shadow-glass ring-4 ring-white dark:bg-plum-800 dark:text-blush-300 dark:ring-plum-950"
                    >
                      <Icon size={24} />
                      <span className="absolute inset-0 -z-10 animate-pulse-soft rounded-full bg-blush-300/40 dark:bg-blush-500/20" />
                    </motion.div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blush-500">
                      {m.date}
                    </p>
                    <p className="mt-2 max-w-[180px] text-sm leading-relaxed text-ink-soft">
                      {m.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom photo strip */}
      <Reveal direction="blur" delay={0.2}>
        <div className="section-container mt-16 flex flex-col items-center justify-between gap-8 rounded-[2rem] bg-gradient-to-br from-blush-50 to-white p-8 dark:from-plum-900 dark:to-plum-950 sm:flex-row">
          <div className="flex -space-x-6">
            <div className="relative h-36 w-28 rotate-[-6deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl dark:border-plum-800 sm:h-44 sm:w-36">
              <Image
                src="/hero/story-1.jpeg"
                alt="Story memory placeholder"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-36 w-28 rotate-[6deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl dark:border-plum-800 sm:h-44 sm:w-36">
              <Image
                src="/hero/story-2.jpeg"
                alt="Story memory placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-center font-script text-3xl text-blush-600 dark:text-blush-300 sm:text-right">
            And the story continues...
          </p>
        </div>
      </Reveal>
    </section>
  );
}
