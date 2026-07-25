"use client";

/**
 * There's no traditional database here — Sanjana's answer is
 * recorded two ways:
 *
 *  1. A local, per-browser history in localStorage (JSON array),
 *     shown as the "Response Log" on the page itself.
 *  2. A real-time email to you, sent via the /api/notify route
 *     (server-side, using Nodemailer + SMTP credentials from
 *     environment variables — see README for setup).
 *
 * The local log does NOT sync across devices; the email is what
 * actually reaches you no matter which device she answers on.
 */

const STORAGE_KEY = "date-responses";

export interface DateResponse {
  choice: "yes" | "no";
  timestamp: string; // ISO 8601
}

export function getResponses(): DateResponse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addResponse(choice: "yes" | "no"): DateResponse[] {
  const entry: DateResponse = { choice, timestamp: new Date().toISOString() };
  const updated = [...getResponses(), entry];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable (private browsing etc.) — fail silently,
    // the UI still shows the result for this session.
  }
  return updated;
}

export function clearResponses(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Emails the answer the moment it's clicked, via our own /api/notify
 * route (Nodemailer under the hood). Fails silently on network
 * errors or missing SMTP config, so the on-page result and local
 * log still work either way.
 */
export async function notifyByEmail(
  partnerName: string,
  choice: "yes" | "no",
  timestamp: string
): Promise<void> {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerName, choice, timestamp }),
    });
  } catch {
    // No SMTP configured yet, or the visitor is offline — the local
    // Response Log still has this entry either way.
  }
}

export function formatResponseTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
