"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#120720] py-10 text-center">
      <div className="section-container flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 font-display text-lg text-blush-200">
          <Heart size={16} className="fill-blush-400 text-blush-400" />
          For Sanjana
        </div>
        <p className="flex items-center gap-1.5 text-sm text-white/50">
          Made with
          <Heart size={13} className="fill-blush-500 text-blush-500" />
          by Shivam Shakya
        </p>
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} · A little corner of the internet, just for us.
        </p>
      </div>
    </footer>
  );
}
