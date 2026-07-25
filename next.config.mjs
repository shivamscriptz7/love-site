/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // NOTE: "output: export" was removed because the /api/notify route
  // (used to send email via Nodemailer) needs a real Node.js server
  // runtime to run — Vercel provides this automatically for a normal
  // Next.js app, no extra config needed there.
};

export default nextConfig;
