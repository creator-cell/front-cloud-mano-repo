import * as z from "zod";

// Reusable function to convert and validate numeric fields, allowing only 0-9 characters
export const toPositiveNumber = (errorMessage: string) => z.preprocess(
    (val) => {
        const strVal = String(val);
        if (/^\d+(\.\d+)?$/.test(strVal)) { // Regex to allow only numbers (0-9) and optional decimal points
            return parseFloat(strVal);
        }
        return val; // Return original value if it doesn't match the regex
    },
    z.number().positive(`Required and ${errorMessage}`).refine(val => !isNaN(val as number), {
        message: `Invalid number format: ${errorMessage}`
    })
);
