"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col bg-[#0a0a0f] text-[#e4e4e7]">
                <main className="flex-1 flex items-center justify-center px-4 py-16">
                    <div className="p-8 sm:p-10 max-w-md w-full text-center space-y-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-red-400"
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
                        <h2 className="text-xl font-semibold">Something went wrong</h2>
                        <p className="text-sm text-[#a1a1aa]">A critical error occurred. Please try again.</p>
                        <button
                            onClick={() => reset()}
                            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#3b82f6] text-white cursor-pointer hover:bg-[#2563eb] transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}
