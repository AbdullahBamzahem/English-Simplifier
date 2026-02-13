"use client";

import { useState } from "react";

interface StreamingResultProps {
    output: string;
    isStreaming: boolean;
}

export default function StreamingResult({ output, isStreaming }: StreamingResultProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = output;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    const hasOutput = output.length > 0;

    return (
        <div className="space-y-2">
            {/* ── Header ──────────────────────────────── */}
            <div className="flex items-center justify-between min-h-[24px]">
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-text-secondary">
                        Simplified Result
                    </label>
                    {isStreaming && (
                        <span className="flex items-center gap-1.5 text-xs text-accent">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Streaming
                        </span>
                    )}
                </div>

                {hasOutput && !isStreaming && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                            bg-surface-light/60 text-text-secondary border border-border
                            hover:border-border-light hover:text-text-primary
                            transition-all duration-200 cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Copied
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                Copy
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* ── Output Area ─────────────────────────── */}
            <div className={`
                rounded-xl px-4 py-3 min-h-[240px] border transition-colors duration-300
                ${hasOutput || isStreaming
                    ? "bg-surface-light/40 border-border"
                    : "bg-surface-light/20 border-border/50"
                }
            `}>
                {hasOutput || isStreaming ? (
                    <p className="text-[15px] leading-relaxed text-text-primary whitespace-pre-wrap animate-fade-in">
                        {output}
                        {isStreaming && (
                            <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-text-bottom animate-pulse" />
                        )}
                    </p>
                ) : (
                    <div className="flex items-center justify-center h-full min-h-[216px]">
                        <p className="text-sm text-text-muted/50 text-center">
                            Simplified text will appear here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
