# English Simplifier

AI-powered tool that simplifies complex English text into clear, concise language. Built with Next.js, Gemini 1.5 Flash, and Tailwind CSS.

## Who is this for?

- **Job Applicants** — Refine cover letters and professional communication
- **Travelers** — Simplify phrases for easier daily interactions
- **Non-Native Speakers** — Understand complex texts quickly

## Simplification Levels

| Level | Label | Use Case |
|-------|-------|----------|
| **A1** | Essential | Basic vocabulary for beginners |
| **A2-B1** | Daily *(default)* | Everyday communication |
| **B2** | Professional | Simplified business context |

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **AI Model:** Gemini 1.5 Flash via Vercel AI SDK
- **Styling:** Tailwind CSS v4
- **Streaming:** Real-time response streaming via `createStreamableValue`
- **Security:** Server-side API keys, CSP headers, rate limiting

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- [Gemini API Key](https://aistudio.google.com/apikey)

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd english-simplifier

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── actions.ts          # Server Action (validate → rate limit → stream)
│   ├── globals.css          # Tailwind + custom theme + animations
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Main page composition
├── components/
│   ├── layout/
│   │   ├── header.tsx       # App header with branding
│   │   └── footer.tsx       # App footer
│   ├── simplifier-form.tsx  # Input form + mode selector
│   └── streaming-result.tsx # Real-time output display
├── lib/
│   ├── ai/
│   │   ├── prompts.ts       # System prompts for 3 CEFR levels
│   │   └── provider.ts      # AI provider abstraction (Gemini)
│   ├── rate-limit.ts        # Sliding-window rate limiter
│   └── validation.ts        # Input validation & sanitization
└── middleware.ts             # Security headers (CSP, HSTS, etc.)
```

## Architecture

- **Provider-Agnostic:** Swap AI providers by editing only `lib/ai/provider.ts`
- **Server-Side Security:** API keys never reach the client
- **Rate Limiting:** 3 req/min + 30 req/day per IP (in-memory, swap to Redis for scale)
- **Input Validation:** Max 3000 chars, sanitized input, mode validation

## Deployment

Deploy to Vercel:

```bash
pnpm build
```

Set `GEMINI_API_KEY` in your Vercel project's environment variables.

## License

MIT
