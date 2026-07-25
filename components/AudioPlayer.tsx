"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Floating "our song" control.
 *
 * - Tries to autoplay as soon as the site loads.
 * - Most browsers block autoplay-with-sound until the visitor has
 *   interacted with the page at least once — so if the first attempt
 *   is blocked, we quietly start playback on the very first
 *   click/tap/keypress anywhere on the site instead.
 * - The button toggles play/pause any time after that.
 * - If `SITE_CONFIG.songSrc` is empty, or the file fails to load
 *   (e.g. you haven't added one yet), the button hides itself
 *   automatically — no broken UI.
 */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(Boolean(SITE_CONFIG.songSrc));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !SITE_CONFIG.songSrc) return;

    const attemptPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    attemptPlay();

    const onFirstInteraction = () => {
      if (audio.paused) attemptPlay();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("touchstart", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    return cleanupListeners;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (!available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={SITE_CONFIG.songSrc}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause our song" : "Play our song"}
        title={playing ? "Pause our song" : "Play our song"}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-blush-200/70 bg-white/60 text-blush-600 shadow-glass backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-blush-300 dark:hover:bg-white/10"
      >
        {playing ? (
          <>
            <span className="absolute inset-0 -z-10 animate-pulse-soft rounded-full bg-blush-300/40 dark:bg-blush-500/20" />
            <Pause size={16} className="fill-current" />
          </>
        ) : (
          <Music size={17} />
        )}
      </button>
    </>
  );
}
