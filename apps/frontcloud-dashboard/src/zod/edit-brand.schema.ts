import { z } from 'zod';

const brandSchema = z.object({
    BrandName: z.string(),
    BrandUrl: z.string(),
    Image: z.any().optional(),
    Seo: z.object({
        MetaTitle: z.string(),
        MetaKeywords: z.string(),
        MetaDescription: z.string(),
        SearchKeywords: z.string(),
    }),
});


export type BrandFormValues = z.infer<typeof brandSchema>;

export default brandSchema;
