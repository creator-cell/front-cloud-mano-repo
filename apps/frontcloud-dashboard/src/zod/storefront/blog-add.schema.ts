import *  as z from 'zod';


export const addBlogSchema = z.object({
    BlogTitle: z.string(),
    url: z.string().optional(),
    BlogBody: z.string().optional(),
    BlogAuthor: z.string().optional(),
    IsDraft: z.boolean().optional(),
    Image: z.any(),
    StoreID: z.string().optional(),
    BlogTag: z.array(z.object({
        value: z.string(),
    })).optional(),
    Seo: z.object({
        MetaTitle: z.string().optional(),
        MetaKeywords: z.string().optional(),
        MetaDescription: z.string().optional(),
        SearchKeywords: z.string().optional(),
    }).optional(),
});

export type AddBlogFormValues = z.infer<typeof addBlogSchema>;

export default addBlogSchema;