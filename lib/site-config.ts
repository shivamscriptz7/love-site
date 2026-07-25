/**
 * Central place to personalize the site.
 * Change these values — no other files need to be touched.
 */
export const SITE_CONFIG = {
  /** Her name */
  partnerName: "Sanjana",
  /** Your name — used to sign the love letter */
  authorName: "Shivam",
  /**
   * She isn't officially your girlfriend yet — this site is asking her
   * out. Kept here in case future copy wants to branch on it.
   */
  isGirlfriend: false,
  /** ISO date-time string of when you first met her, used by the live counter */
  togetherSince: "2022-02-14T00:00:00",
  /**
   * "Our song" — drop an mp3/ogg file into /public/audio/ and point this
   * at it (e.g. "/audio/our-song.mp3"). Leave empty to hide the music
   * button entirely.
   */
  songSrc: "/audio/our-song.mp3",
  /**
   * Where her Yes/No answer gets emailed the moment she clicks, via
   * the /api/notify route (Nodemailer + SMTP under the hood — see
   * README for setup). This value is only the *default recipient*;
   * the actual SMTP sender credentials live in environment variables
   * (never commit real credentials here).
   */
  notifyEmail: "shivamshakya2277@gmail.com",
};
