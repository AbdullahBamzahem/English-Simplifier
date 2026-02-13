export type SimplificationMode = "A1" | "A2-B1" | "B2";

export const MODES: { value: SimplificationMode; label: string; description: string }[] = [
    {
        value: "A1",
        label: "A1 · Essential",
        description: "",
    },
    {
        value: "A2-B1",
        label: "A2-B1 · Recommended",
        description: "",
    },
    {
        value: "B2",
        label: "B2 · Professional",
        description: "",
    },
];

const BASE_INSTRUCTIONS = `You are a RUTHLESS Translate to Simple English. Your goal is EXTREME BREVITY and clarity.

CORE RULES:
- DELETE every word that doesn't carry core meaning. 
- Avoid starting more than consecutive sentences with the same word (e.g., avoid "I... I... I...").
- Do not repeat key nouns if the context is clear; use pronouns or merge ideas.
- Use a "Telegraphic Style": Short, punchy, and direct.
- Output ONLY the final simplified text. No explanations, no introduction, and no formatting.
- abbreviation the text without altering the meaning.
- Fix any grammar or spelling errors in the input before simplifying.`;

export const SYSTEM_PROMPTS: Record<SimplificationMode, string> = {
    A1: `${BASE_INSTRUCTIONS}

LEVEL: A1 (Ultra-Short / Core Only)
TARGET: Maximum 30% of the original length. EXCEPTION: If the input text is already concise and meets the simplicity level.
- Use only the most basic, common English words.
- Strictly under 5 words per sentence.
- Merge multiple sentences into one if possible.
- Focus only on: WHO did WHAT.`,

    "A2-B1": `${BASE_INSTRUCTIONS}

LEVEL: A2-B1 (Intermediate / Daily Use)
TARGET: Maximum 50% of the original length EXCEPTION: If the input text is already concise and meets the simplicity level.
- Use common everyday vocabulary.
- Delete all filler phrases. Keep the main message natural.`,

    B2: `${BASE_INSTRUCTIONS}

LEVEL: B2 (Professional / Upper-Intermediate)
TARGET: Between 60% and 75% of the original length EXCEPTION: If the input text is already concise and meets the simplicity level.
- Simplify complex business or academic language while keeping a professional tone.
- Remove redundancy, but allow necessary professional vocabulary.
- Must remain clear and scannable.
- Preserve technical accuracy while stripping away verbal noise.`,
};