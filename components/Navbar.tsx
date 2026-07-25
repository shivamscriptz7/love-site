"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AudioPlayer from "./AudioPlayer";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "our-story", label: "Our Story" },
  { id: "reasons", label: "Reasons" },
  { id: "love-letter", label: "Love Letter" },
  { id: "proposal", label: "Proposal" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 shadow-glass backdrop-blur-xl dark:bg-plum-900/70"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex h-[76px] items-center justify-between">
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-blush-700 dark:text-blush-200"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <Heart
              size={20}
              className="fill-blush-500 text-blush-500 animate-pulse-soft"
            />
          </span>
          For Sanjana
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="relative">
              <button
                onClick={() => handleNavClick(link.id)}
                className={`font-medium text-sm tracking-wide transition-colors ${
                  active === link.id
                    ? "text-blush-600 dark:text-blush-300"
                    : "text-ink-soft/80 hover:text-blush-500 dark:text-white/70 dark:hover:text-blush-300"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-blush-500 to-gold-400"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("proposal")}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:inline-flex"
          >
            <Heart size={14} className="fill-white" />
            For You
          </button>
          <ThemeToggle />
          <AudioPlayer />

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-blush-200/70 bg-white/60 dark:border-white/10 dark:bg-white/5 lg:hidden"
          >
            <span
              className={`h-[2px] w-4 bg-blush-600 transition-transform dark:bg-blush-200 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-4 bg-blush-600 transition-opacity dark:bg-blush-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-4 bg-blush-600 transition-transform dark:bg-blush-200 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-blush-100 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-plum-900/95 lg:hidden"
        >
          <ul className="section-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    active === link.id
                      ? "bg-blush-50 text-blush-600 dark:bg-white/5 dark:text-blush-300"
                      : "text-ink-soft dark:text-white/70"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
