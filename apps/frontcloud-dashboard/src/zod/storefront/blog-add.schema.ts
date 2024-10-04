import *  as z from 'zod';


export const addBlogSchema = z.object({
    title: z.string(),
    url: z.string().optional(),
    body: z.string().optional(),
    auther: z.string().optional(),
    images: z.any(),
    tags: z.array(z.object({
        value: z.string(),
    })).optional(),


    pageTitle: z.string().optional(),
    metaKeywords: z.string().optional(),
    metaDescription: z.string().optional(),
    searchKeywords: z.string().optional(),
});

export type AddBlogFormValues = z.infer<typeof addBlogSchema>;

export default addBlogSchema;