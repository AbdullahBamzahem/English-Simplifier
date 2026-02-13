import { type NextRequest, NextResponse } from "next/server";

/**
 * Security middleware — applies hardened headers to all responses.
 */
export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // ── Security Headers ──────────────────────────────────────
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), browsing-topics=()"
    );
    response.headers.set("X-DNS-Prefetch-Control", "on");

    // Content Security Policy
    response.headers.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join("; ")
    );

    // Strict Transport Security (HTTPS only in production)
    if (request.nextUrl.protocol === "https:") {
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );
    }

    return response;
}

export const config = {
    matcher: [
        // Apply to all routes except static files and Next internals
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
