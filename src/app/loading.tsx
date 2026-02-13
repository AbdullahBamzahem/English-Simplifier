export default function Loading() {
    return (
        <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="glass-card p-10 max-w-sm w-full text-center space-y-5 animate-fade-in">
                {/* Spinner */}
                <div className="mx-auto w-10 h-10 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-border" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
                </div>

                <div className="space-y-1.5">
                    <p className="text-sm font-medium text-text-secondary">Loading</p>
                    <div className="flex justify-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>
            </div>
        </main>
    );
}
