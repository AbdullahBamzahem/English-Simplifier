import LogoIcon from "@/components/logo-icon";

export default function Header() {
    return (
        <header className="w-full border-b border-border/50 backdrop-blur-sm bg-surface/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Logo icon — same mark as favicon & apple-icon */}
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center shadow-lg shadow-accent/20">
                        <LogoIcon size={18} />
                    </div>
                    {/* <div>
                        <h1 className="text-lg font-semibold tracking-tight text-text-primary">
                            Translate to Simple<span className="gradient-text"> English</span>
                        </h1>
                    </div> */}
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Google Gemini
                </div>
            </div>
        </header>
    );
}

