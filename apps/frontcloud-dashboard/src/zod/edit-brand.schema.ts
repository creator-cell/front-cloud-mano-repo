import { z } from 'zod';

// Define the Zod schema for the brand form
const brandSchema = z.object({
    brandName: z.string().optional(),
    pageTitle: z.string().optional(),
    metaKeywords: z.string().optional(),
    metaDescription: z.string().optional(),
    searchKeywords: z.string().optional(),
    brandImage: z.any().optional(), // URL or file path as a string
    brandUrl: z.string().optional(),
    templateLayoutFile: z.string().optional(), // File URL or path as a string
});

// Type for the schema
export type BrandFormValues = z.infer<typeof brandSchema>;

export default brandSchema;
