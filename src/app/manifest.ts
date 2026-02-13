import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Translate to Simple English",
        short_name: "Simplifier",
        description: "AI-powered tool that simplifies complex English text into corrected, clear, concise language.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0f",
        theme_color: "#10b981",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
