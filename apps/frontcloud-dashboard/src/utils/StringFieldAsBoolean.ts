import * as z from "zod";

export const toBoolean = () =>
    z.preprocess((val) => {
        if (typeof val === "string") {
            // Convert "true"/"false" strings to boolean
            if (val.toLowerCase() === "true") return true;
            if (val.toLowerCase() === "false") return false;
        }
        return val; // Pass other values as-is (e.g., if already a boolean)
    }, z.boolean());
