/**
 * In-memory sliding-window rate limiter keyed by IP address.
 *
 * Limits:
 *  - RATE_LIMIT_PER_MINUTE (default: 3)
 *  - RATE_LIMIT_PER_DAY (default: 30)
 *
 * For multi-instance deployments (e.g., Vercel serverless),
 * swap this with a Redis-backed implementation.
 */

interface RateLimitEntry {
    timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 10 minutes
const CLEANUP_INTERVAL = 10 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

if (typeof globalThis !== "undefined") {
    // Prevent multiple intervals in dev mode (HMR)
    const g = globalThis as unknown as { __rateLimitCleanup?: ReturnType<typeof setInterval> };
    if (!g.__rateLimitCleanup) {
        g.__rateLimitCleanup = setInterval(() => {
            const now = Date.now();
            for (const [key, entry] of store) {
                entry.timestamps = entry.timestamps.filter((t) => now - t < DAY_MS);
                if (entry.timestamps.length === 0) {
                    store.delete(key);
                }
            }
        }, CLEANUP_INTERVAL);
    }
}

export interface RateLimitResult {
    success: boolean;
    remaining: {
        minute: number;
        day: number;
    };
    resetIn: number; // seconds until next minute-window slot opens
    message?: string;
}

/**
 * Check rate limit for a given IP address.
 * @param ip - Client IP address
 */
export function checkRateLimit(ip: string): RateLimitResult {
    const now = Date.now();

    const perMinute = parseInt(process.env.RATE_LIMIT_PER_MINUTE || "3", 10);
    const perDay = parseInt(process.env.RATE_LIMIT_PER_DAY || "30", 10);

    let entry = store.get(ip);
    if (!entry) {
        entry = { timestamps: [] };
        store.set(ip, entry);
    }

    // Clean old timestamps
    entry.timestamps = entry.timestamps.filter((t) => now - t < DAY_MS);

    // Check daily limit
    const dayCount = entry.timestamps.length;
    if (dayCount >= perDay) {
        const oldestToday = entry.timestamps[0]!;
        const resetIn = Math.ceil((oldestToday + DAY_MS - now) / 1000);
        return {
            success: false,
            remaining: { minute: 0, day: 0 },
            resetIn,
            message: `Daily limit reached (${perDay}/day). Try again later.`,
        };
    }

    // Check per-minute limit
    const oneMinuteAgo = now - 60_000;
    const minuteTimestamps = entry.timestamps.filter((t) => t > oneMinuteAgo);
    if (minuteTimestamps.length >= perMinute) {
        const oldestMinute = minuteTimestamps[0]!;
        const resetIn = Math.ceil((oldestMinute + 60_000 - now) / 1000);
        return {
            success: false,
            remaining: { minute: 0, day: perDay - dayCount },
            resetIn,
            message: `Rate limit reached (${perMinute}/min). Wait ${resetIn}s.`,
        };
    }

    // Allow — record timestamp
    entry.timestamps.push(now);

    return {
        success: true,
        remaining: {
            minute: perMinute - minuteTimestamps.length - 1,
            day: perDay - dayCount - 1,
        },
        resetIn: 0,
    };
}
