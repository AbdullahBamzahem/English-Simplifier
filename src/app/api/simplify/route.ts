import { headers } from "next/headers";
import { simplifyText } from "@/lib/ai/provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateInput, validateMode } from "@/lib/validation";
import type { SimplificationMode } from "@/lib/ai/prompts";

/**
 * Extract client IP from request headers.
 */
async function getClientIP(): Promise<string> {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "anonymous";
    return forwarded.split(",")[0]!.trim();
}

export async function POST(req: Request) {
    try {
        // ── 1. Parse & Validate Input ─────────────────────────
        const body = await req.json();
        const { text, mode } = body;

        const inputResult = validateInput(text);
        if (!inputResult.valid) {
            return Response.json({ error: inputResult.error }, { status: 400 });
        }

        if (!validateMode(mode)) {
            return Response.json({ error: "Invalid simplification mode." }, { status: 400 });
        }

        // ── 2. Rate Limit ────────────────────────────────────
        const ip = await getClientIP();
        const rateLimit = checkRateLimit(ip);
        if (!rateLimit.success) {
            return Response.json(
                {
                    error: rateLimit.message,
                    rateLimit: { remaining: rateLimit.remaining, resetIn: rateLimit.resetIn },
                },
                { status: 429 }
            );
        }

        // ── 3. Stream AI Response ────────────────────────────
        const result = simplifyText(inputResult.sanitized, mode as SimplificationMode);

        const response = result.toTextStreamResponse();

        // Add rate-limit headers to the streaming response
        const headers = new Headers(response.headers);
        headers.set("X-RateLimit-Remaining-Minute", String(rateLimit.remaining.minute));
        headers.set("X-RateLimit-Remaining-Day", String(rateLimit.remaining.day));

        return new Response(response.body, {
            status: response.status,
            headers,
        });
    } catch (err) {
        console.error("[/api/simplify] Error:", err);
        return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
