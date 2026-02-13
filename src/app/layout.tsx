import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Translate to Simple English — Clear, Concise, Confident",
    description:
        "AI-powered tool that simplifies complex English text. Perfect for job applicants, travelers, and non-native speakers. Powered by Gemini.",
    keywords: [
        "english simplifier",
        "text simplifier",
        "simplify english",
        "plain language",
        "CEFR",
        "language tool",
    ],
    authors: [{ name: "English Simplifier" }],
    robots: "index, follow",
    openGraph: {
        title: "English Simplifier — Clear, Concise, Confident",
        description:
            "Simplify complex English into clear, everyday language. Choose your level: Essential, Daily, or Professional.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen flex flex-col">
                <div className="bg-mesh" aria-hidden="true" />
                {children}
            </body>
        </html>
    );
}
