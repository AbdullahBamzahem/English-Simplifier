"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[App Error]", error);
    }, [error]);

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="glass-card p-8 sm:p-10 max-w-md w-full text-center space-y-5 animate-fade-in">
                {/* Icon */}
                <div className="mx-auto w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center">
                    <svg
                        className="w-7 h-7 text-error"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-text-primary">
                        Something went wrong
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        An unexpected error occurred. Please try again.
                    </p>
                </div>

                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium
                        bg-gradient-to-r from-accent to-cyan-500 text-white
                        shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30
                        hover:scale-[1.01] active:scale-[0.99]
                        transition-all duration-200 cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                        />
                    </svg>
                    Try again
                </button>
            </div>
        </main>
    );
}
