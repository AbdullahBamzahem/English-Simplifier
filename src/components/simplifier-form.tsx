"use client";

import { useState, useRef } from "react";
import StreamingResult from "./streaming-result";

const MAX_INPUT_LENGTH = 3000;

export default function SimplifierForm() {
    const [text, setText] = useState("");
    const [output, setOutput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [remaining, setRemaining] = useState<{ minute: number; day: number } | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const charCount = text.length;
    const isOverLimit = charCount > MAX_INPUT_LENGTH;
    const canSubmit = text.trim().length > 0 && !isOverLimit && !isStreaming;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;

        // Cancel any ongoing request
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setError(null);
        setOutput("");
        setIsStreaming(true);

        try {
            const res = await fetch("/api/simplify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
                signal: controller.signal,
            });

            // Read rate limit headers
            const minuteRemaining = res.headers.get("X-RateLimit-Remaining-Minute");
            const dayRemaining = res.headers.get("X-RateLimit-Remaining-Day");
            if (minuteRemaining && dayRemaining) {
                setRemaining({
                    minute: parseInt(minuteRemaining, 10),
                    day: parseInt(dayRemaining, 10),
                });
            }

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Something went wrong.");
                if (data.rateLimit) {
                    setRemaining(data.rateLimit.remaining);
                }
                setIsStreaming(false);
                return;
            }

            // Stream the response
            const reader = res.body?.getReader();
            if (!reader) {
                setError("Failed to read response stream.");
                setIsStreaming(false);
                return;
            }

            const decoder = new TextDecoder();
            let accumulated = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulated += chunk;
                setOutput(accumulated);
            }
        } catch (err) {
            if ((err as Error).name !== "AbortError") {
                console.error(err);
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsStreaming(false);
        }
    }

    return (
        <div className="w-full space-y-5">

            {/* ── Side-by-Side Panels ────────────────────────── */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* ── LEFT: Input Panel ───────────────────── */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="input-text"
                                className="block text-sm font-medium text-text-secondary"
                            >
                                Your Text
                            </label>
                            <span
                                className={`text-xs tabular-nums ${isOverLimit ? "text-error font-medium" : "text-text-muted"
                                    }`}
                            >
                                {charCount.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()}
                            </span>
                        </div>
                        <textarea
                            id="input-text"
                            name="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste or type text here (English or any language)..."
                            rows={10}
                            className={`
                                w-full px-4 py-3 rounded-xl resize-none
                                bg-surface-light/60 border text-text-primary
                                placeholder:text-text-muted/60
                                transition-all duration-200
                                text-[15px] leading-relaxed min-h-[240px]
                                ${isOverLimit ? "border-error/60 focus:border-error" : "border-border hover:border-border-light"}
                            `}
                        />
                    </div>

                    {/* ── RIGHT: Output Panel ────────────────── */}
                    <StreamingResult output={output} isStreaming={isStreaming} />
                </div>

                {/* ── Error Message ──────────────────────────────── */}
                {error && (
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-error-bg border border-error/20 animate-fade-in">
                        <svg
                            className="w-5 h-5 text-error shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-sm text-error/90">{error}</p>
                    </div>
                )}

                {/* ── Submit Button ──────────────────────────────── */}
                <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`
                        w-full py-3.5 rounded-xl text-sm font-semibold
                        transition-all duration-200 cursor-pointer
                        ${canSubmit
                            ? "bg-gradient-to-r from-accent to-cyan-500 text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.01] active:scale-[0.99]"
                            : "bg-surface-light text-text-muted cursor-not-allowed"
                        }
                    `}
                >
                    {isStreaming ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Simplifying...
                        </span>
                    ) : (
                        "Translate"
                    )}
                </button>

                {/* ── Rate Limit Info ────────────────────────────── */}
                {remaining && (
                    <p className="text-xs text-text-muted text-center tabular-nums">
                        {remaining.minute} left this minute &middot;{" "}
                        {remaining.day} left today
                    </p>
                )}
            </form>
        </div>
    );
}
