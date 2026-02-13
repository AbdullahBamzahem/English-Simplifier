import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { SYSTEM_PROMPTS, type SimplificationMode } from "./prompts";

/**
 * AI provider abstraction layer.
 * To switch providers, only this file needs to change.
 *
 * Uses Vercel AI SDK — provider-agnostic streaming interface.
 */

const MODEL_ID = "gemini-1.5-flash";

export function simplifyText(input: string, mode: SimplificationMode) {
    const systemPrompt = SYSTEM_PROMPTS[mode];

    const result = streamText({
        model: google(MODEL_ID),
        system: systemPrompt,
        prompt: input,
        temperature: 0.3,
    });

    return result;
}
