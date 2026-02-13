/**
 * Input validation and sanitization utilities.
 */

const MAX_INPUT_LENGTH = parseInt(process.env.MAX_INPUT_LENGTH || "3000", 10);

export interface ValidationResult {
    valid: boolean;
    sanitized: string;
    error?: string;
}

/**
 * Validates and sanitizes user input text.
 * - Trims whitespace
 * - Strips control characters (except newlines)
 * - Enforces max length
 * - Checks for empty input
 */
export function validateInput(raw: unknown): ValidationResult {
    if (typeof raw !== "string") {
        return { valid: false, sanitized: "", error: "Input must be a string." };
    }

    // Trim and strip control characters (keep \n for paragraph structure)
    // eslint-disable-next-line no-control-regex
    const sanitized = raw.trim().replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "");

    if (sanitized.length === 0) {
        return { valid: false, sanitized: "", error: "Please enter some text to simplify." };
    }

    if (sanitized.length > MAX_INPUT_LENGTH) {
        return {
            valid: false,
            sanitized: "",
            error: `Text is too long (${sanitized.length} chars). Maximum is ${MAX_INPUT_LENGTH} characters.`,
        };
    }

    return { valid: true, sanitized };
}

const VALID_MODES = new Set(["A1", "A2-B1", "B2"]);

export function validateMode(mode: unknown): mode is "A1" | "A2-B1" | "B2" {
    return typeof mode === "string" && VALID_MODES.has(mode);
}
