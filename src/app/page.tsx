import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SimplifierForm from "@/components/simplifier-form";

export default function Home() {
    return (
        <>
            <Header />

            <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-8 sm:py-12">
                {/* ── Hero Section ──────────────────────────── */}
                <div className="text-center mb-8 sm:mb-10 space-y-3 max-w-xl animate-fade-in">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Translate to Simple{" "}
                        <span className="gradient-text">English</span>
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                        Paste complex text and get a corrected, clear, concise version instantly.
                        <br className="hidden sm:inline" />{" "}
                        Perfect for job applications, travel, and daily communication.
                    </p>
                </div>

                {/* ── Main Card ─────────────────────────────── */}
                <div className="w-full max-w-5xl glass-card p-5 sm:p-7 animate-fade-in">
                    <SimplifierForm />
                </div>

                {/* ── Feature Pills ─────────────────────────── */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-in">
                    {[
                        { icon: "⚡", label: "Real-time streaming" },
                        { icon: "🔒", label: "Server-side only" },
                        { icon: "🎯", label: "3 CEFR levels" },
                    ].map((feature) => (
                        <span
                            key={feature.label}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                text-xs text-text-muted bg-surface-light/40 border border-border/50"
                        >
                            <span>{feature.icon}</span>
                            {feature.label}
                        </span>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}
