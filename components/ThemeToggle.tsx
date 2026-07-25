"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light theme"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-blush-200/70 bg-white/60 text-blush-600 shadow-glass backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-blush-300 dark:hover:bg-white/10"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </button>
  );
}
