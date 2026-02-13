/**
 * Shared logo icon — the same "T" text-formatting mark used across
 * the header, favicon, apple-icon, and manifest.
 */
export default function LogoIcon({ size = 18 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
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
    );
}
