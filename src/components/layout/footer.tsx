export default function Footer() {
    return (
        <footer className="w-full border-t border-border/50 mt-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-muted">
                    <p>
                        Built for clarity. Powered by{" "}
                        <a
                            href="https://ai.google.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-accent transition-colors"
                        >
                            Google Gemini
                        </a>
                    </p>
                    <p className="text-xs">
                        Clear &middot; Concise &middot; Confident
                    </p>
                </div>
            </div>
        </footer>
    );
}
