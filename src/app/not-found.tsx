import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="glass-card p-8 sm:p-10 max-w-md w-full text-center space-y-5 animate-fade-in">
                {/* 404 Badge */}
                <div className="mx-auto w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-accent">404</span>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-text-primary">
                        Page not found
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium
                        bg-gradient-to-r from-accent to-cyan-500 text-white
                        shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30
                        hover:scale-[1.01] active:scale-[0.99]
                        transition-all duration-200"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to home
                </Link>
            </div>
        </main>
    );
}
