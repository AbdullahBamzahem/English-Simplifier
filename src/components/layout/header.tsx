export default function Header() {
    return (
        <header className="w-full border-b border-border/50 backdrop-blur-sm bg-surface/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Logo icon */}
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center shadow-lg shadow-accent/20">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 7V4h16v3" />
                            <path d="M9 20h6" />
                            <path d="M12 4v16" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-text-primary">
                            English<span className="gradient-text"> Simplifier</span>
                        </h1>
                    </div>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Gemini Flash
                </div>
            </div>
        </header>
    );
}
