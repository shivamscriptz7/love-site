# Will You Go On A Date With Me? 💕

An ultra-premium "asking her out" website for Sanjana, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. No database, no auth. The only server-side piece is a small API route that emails you her answer via Nodemailer — everything else is static.

## ✨ Sections

1. **Navbar** — transparent, sticky, glassmorphic on scroll, active-section highlighting, dark/light toggle, play/pause music button
2. **Hero** — split layout, curved image frame, floating hearts, sparkles, gradient glows
3. **Since We First Met** — a live, ticking days/hours/minutes/seconds counter
4. **Our Story** — animated horizontal timeline with connecting line and milestone icons
5. **Reasons** — glowing glass cards with floating heart micro-interactions
6. **Love Letter** — clickable animated envelope that unfolds a heartfelt letter
7. **Looking Ahead** — a staggered word-reveal section hinting that this could lead to marriage someday
8. **The Question** — candlelit night scene, a real Yes/No date question, confetti celebration on "Yes", every answer emailed to you + logged with a timestamp
9. **Footer** — "Made with ❤️ by Shivam Shakya"

## 🌗 Dark / Light Theme

Toggle lives in the navbar. Preference is remembered in `localStorage` and respects the visitor's system preference on first visit. Both themes are fully designed — no unstyled fallback state.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 📦 Production build & deploying

```bash
npm run build
npm run start
```

This is now a standard Next.js app (not a static export), because the `/api/notify` route needs a Node.js server to send email. **Deploy on Vercel** (recommended — zero config, serverless functions work automatically) or any host that runs Next.js natively (Node server, Docker, etc.). Purely static hosts (GitHub Pages, plain S3) won't work anymore since they can't run the API route — that's the trade-off for real email notifications.

## 🎵 "Our Song" (play/pause button)

There's a play/pause button in the navbar (top right). To activate it:

1. Drop your song file into `public/audio/` (e.g. `our-song.mp3`).
2. Confirm `lib/site-config.ts` points at it: `songSrc: "/audio/our-song.mp3"`.

The song **tries to autoplay** as soon as the site loads. Most browsers block autoplay-with-sound until the visitor interacts with the page at least once — if that happens, playback quietly starts on the very first click/tap/keypress instead, so it never feels broken. The button toggles play/pause any time after that, and it loops automatically.

If you don't add a song (or `songSrc` is left empty), the button **hides itself** — no broken UI either way.

## 💛 The Date Question, Email Notification & Response Log

The final section asks a real Yes/No question ("Are You Ready For A Date?") — both buttons work normally, and every answer is:

1. **Emailed to you instantly** via a small server API route (`app/api/notify/route.ts`) using **Nodemailer** + SMTP.
2. **Logged locally** in a **Response Log** panel on the page itself (timestamped, newest first).

### Setting up email (one-time)

This app is no longer a pure static export — the `/api/notify` route needs a real Node.js server to run, which **Vercel provides automatically** for a normal Next.js project (no extra config needed there).

1. **Get SMTP credentials.** Easiest option: use a Gmail account.
   - Turn on 2-Step Verification: https://myaccount.google.com/security
   - Create an App Password: https://myaccount.google.com/apppasswords
   - Use that 16-character app password (not your normal Gmail password) as `SMTP_PASS`.
   - (Any other SMTP provider — Outlook, Zoho, SendGrid, Resend, etc. — works too; just change `SMTP_HOST`/`SMTP_PORT`.)

2. **Set environment variables.**
   - **Locally:** copy `.env.local.example` → `.env.local` and fill in the values (this file is git-ignored, never commit real credentials).
   - **On Vercel:** Project → Settings → Environment Variables → add the same 5 keys (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL`), then redeploy.

3. That's it — no activation step, no third-party form service. As soon as SMTP env vars are set, `/api/notify` starts sending real emails.

If SMTP isn't configured yet, the route quietly reports "not configured" instead of erroring — the button, celebration, and local Response Log all keep working regardless.

### The local Response Log

Since there's still no traditional database, a copy of every answer is also saved as JSON in the visitor's own browser (`localStorage`, key `date-responses`):

```json
[{ "choice": "yes", "timestamp": "2026-07-23T13:42:10.511Z" }]
```

This **does not sync across devices** — it's just a convenient on-page log for whichever device was used to answer. The **email is what actually reaches you** reliably, since e.g. if Sanjana answers on her phone, you won't see the local log on your laptop.

There's a small trash icon in the corner of the log to clear the local history (handy while testing).

## 🖼️ Replacing photos

- **Hero photo:** replace `public/hero/couple-hero.svg` with your own image (keep the filename, or update the `src` in `components/Hero.tsx`). JPG/PNG/WebP all work.
- **Our Story strip photos:** `public/hero/story-1.svg` and `story-2.svg`.

(There's no separate photo gallery section anymore — it was removed by request.)

## 📝 Personalizing text

- Her name, your name, "our song" path, and notification email — all in one place: `lib/site-config.ts`
- Hero headline/subtext — `components/Hero.tsx`
- Timeline milestones/dates — `components/OurStory.tsx` (`MILESTONES` array)
- Reasons list — `components/Reasons.tsx` (`REASONS` array)
- Love letter content — `components/LoveLetter.tsx` (`LETTER_PARAGRAPHS`)
- "Looking Ahead" (marriage hint) copy — `components/FutureTogether.tsx` (`LINE_1` / `LINE_2`)
- The date question & result messages — `components/Proposal.tsx`
- Footer credit — `components/Footer.tsx`

## 🛠️ Tech Stack

- Next.js 15 (App Router, static export)
- TypeScript
- Tailwind CSS (custom romantic color tokens, dark mode via `class`)
- Framer Motion (reveals, staggered word animations, hover/tap micro-interactions)
- canvas-confetti (celebration burst)
- lucide-react (icon set)
- Nodemailer (SMTP email notification, via `app/api/notify`)
- Self-hosted fonts via `@fontsource` (Playfair Display, Great Vibes, Dancing Script, Poppins) — no external font CDN calls

## 📁 Folder Structure

```
app/
  layout.tsx          Root layout, fonts, theme init script
  page.tsx             Assembles all sections
  globals.css          Design tokens, fonts, utility classes
  api/
    notify/route.ts     Server route — sends email via Nodemailer
components/
  Navbar.tsx
  Hero.tsx
  TogetherSince.tsx
  OurStory.tsx
  Reasons.tsx
  LoveLetter.tsx
  FutureTogether.tsx
  Proposal.tsx
  Footer.tsx
  ThemeToggle.tsx
  AudioPlayer.tsx
  FloatingHearts.tsx / Sparkles.tsx / CursorGlow.tsx / Reveal.tsx   (shared motion primitives)
lib/
  ThemeProvider.tsx
  site-config.ts       Names, dates, song path, default notify email
  date-responses.ts     localStorage log + calls /api/notify
public/
  hero/        hero + story placeholder images
  audio/       drop your song file here
.env.local.example      Copy to .env.local and fill in SMTP credentials
```

Made with ❤️ by Shivam Shakya
