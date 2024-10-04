import *  as z from 'zod';


export const addProductCategorySchema = z.object({
    parentCategory: z.string().optional(),
    name: z.string(),
    url: z.string().optional(),
    description: z.string().optional(),
    sort_order: z.number().optional(),
    images: z.any(),
    visibility: z.enum(['visible', 'hidden']).optional(),

    pageTitle: z.string().optional(),
    metaKeywords: z.string().optional(),
    metaDescription: z.string().optional(),
    searchKeywords: z.string().optional(),
});

export type AddProductCategoryFormValues = z.infer<typeof addProductCategorySchema>;

export default addProductCategorySchema;