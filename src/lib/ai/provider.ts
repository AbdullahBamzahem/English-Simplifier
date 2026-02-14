import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { SYSTEM_PROMPTS, type SimplificationMode } from "./prompts";

/**
 * AI provider abstraction layer.
 * To switch providers, only this file needs to change.
 *
 * Uses Vercel AI SDK — provider-agnostic streaming interface.
 */

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_ID = "gemini-2.0-flash";

export function simplifyText(input: string, mode: SimplificationMode) {
    const systemPrompt = SYSTEM_PROMPTS[mode];

    const result = streamText({
        model: google(MODEL_ID),
        system: systemPrompt,
        prompt: `"""\n${input}\n"""`,
        temperature: 0.3,
    });

    return result;
}
