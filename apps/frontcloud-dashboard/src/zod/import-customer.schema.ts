import * as z from "zod";

// Enums for field separator and field enclosure
const FieldSeparatorEnum = z.enum(["comma", "tab", "semicolon"]);
const FieldEnclosureEnum = z.enum(["doubleQuote", "singleQuote"]);
const ImportForm = z.enum(["upload", "existing"]);

const importCustomerSchema = z.object({
    fileTemplate: z.boolean().optional(),
    overrideRecords: z.boolean().optional(),
    uploadFile: z
        .any()  // Use `any` for file input; validation should be handled separately
        .optional()
        .refine(file => file instanceof File, {
            message: "Upload a valid file.",
        }),
    importForm: z.enum(["upload", "existing"]),
    containsHeaders: z.boolean().optional(),
    fieldSeparator: FieldSeparatorEnum.optional(),
    fieldEnclosure: FieldEnclosureEnum.optional(),

});

export type importCustomerFormValues = z.infer<typeof importCustomerSchema>;

export default importCustomerSchema;
