import *  as z from 'zod';


export const addProductCategorySchema = z.object({
    categoryId: z.string().optional(),
    categoryName: z.string(),
    // url: z.string().optional(),
    description: z.string().optional(),
    // sort_order: z.number().optional(),
    // images: z.any(),
    visibleInMenu: z
        .enum(['true', 'false'])
        .optional()
        .transform(value => value === 'true'),
    seo: z.object({
        metaTitle: z.string().optional(),
        metaKeywords: z.string().optional(),
        metaDescription: z.string().optional(),
        searchKeywords: z.string().optional(),
    }).optional()
});

export type AddProductCategoryFormValues = z.infer<typeof addProductCategorySchema>;

export default addProductCategorySchema;