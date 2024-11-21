import *  as z from 'zod';


export const addBlogSchema = z.object({
    blogTitle: z.string(),
    url: z.string().optional(),
    blogBody: z.string().optional(),
    blogAuthor: z.string().optional(),
    isDraft: z.boolean().optional(),
    images: z.any(),
    storeID: z.string().optional(),
    blogTag: z.array(z.object({
        value: z.string(),
    })).optional(),
    seo: z.object({
        metaTitle: z.string().optional(),
        metaKeywords: z.string().optional(),
        metaDescription: z.string().optional(),
        searchKeywords: z.string().optional(),
    }).optional(),
});

export type AddBlogFormValues = z.infer<typeof addBlogSchema>;

export default addBlogSchema;