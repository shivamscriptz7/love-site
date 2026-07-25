"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "blur" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const variantsFor = (direction: Direction) => {
  switch (direction) {
    case "up":
      return { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { opacity: 0, x: -56 }, show: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: 56 }, show: { opacity: 1, x: 0 } };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
        show: { opacity: 1, filter: "blur(0px)", y: 0 },
      };
    default:
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
  }
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const variants = variantsFor(direction);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
