import { z } from 'zod';

const bannerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    content: z.string().min(1, 'Content is required'),
    location: z.object({
        label: z.enum(['homepage', 'category', 'brand', 'search']).default('homepage'),
        value: z.string().optional()
    }),
    dateRange: z.object({
        type: z.enum(["always", "date"]).optional(),
        alwaysShow: z.boolean().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional()
    }).optional(),
    visible: z.boolean(),
    placement: z.enum(['Top', 'Bottom']).default('Top'),
});


export type bannerFormValues = z.infer<typeof bannerSchema>;

export default bannerSchema;


