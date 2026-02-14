import { headers as getHeaders } from "next/headers";
import { simplifyText } from "@/lib/ai/provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateInput } from "@/lib/validation";

/**
 * Extract client IP from request headers.
 */
async function getClientIP(): Promise<string> {
    const headersList = await getHeaders();
    const forwarded = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "anonymous";
    return forwarded.split(",")[0]!.trim();
}

export async function POST(req: Request) {
    try {
        // ── 1. Parse & Validate Input ─────────────────────────
        const body = await req.json();
        const { text } = body;

        const inputResult = validateInput(text);
        if (!inputResult.valid) {
            return Response.json({ error: inputResult.error }, { status: 400 });
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
        const result = simplifyText(inputResult.sanitized);
        const streamResponse = result.toTextStreamResponse();

        // Add rate-limit headers to the streaming response
        const responseHeaders = new Headers(streamResponse.headers);
        responseHeaders.set("X-RateLimit-Remaining-Minute", String(rateLimit.remaining.minute));
        responseHeaders.set("X-RateLimit-Remaining-Day", String(rateLimit.remaining.day));

        return new Response(streamResponse.body, {
            status: streamResponse.status,
            headers: responseHeaders,
        });
    } catch (err) {
        console.error("[/api/simplify] Error:", err);
        return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
