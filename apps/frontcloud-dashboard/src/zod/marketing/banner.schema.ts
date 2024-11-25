import { z } from 'zod';

const bannerSchema = z.object({
    MarketingBannerName: z.string().min(1, 'Name is required'),
    Content: z.string().min(1, 'Content is required'),
    StoreID: z.string(),
    Location: z.object({
        label: z.enum(['homepage', 'specificcategory', 'specificbrand', 'resultpage']),
        value: z.string().optional()
    }),
    CategoryID: z.string().optional(),
    DateRange: z.string().optional(),
    StartDate: z.date().optional(),
    EndDate: z.date().optional(),
    Visible: z.boolean().optional(),
    Placement: z.enum(['top', 'bottom']),
    Image: z.any().optional(),
    ItemId: z.string().optional(),
}).refine(data => {
    return !data.StartDate || (data.StartDate && data.EndDate && data.StartDate < data.EndDate);
}, {
    message: 'End date must be after Start date',
    path: ['endDate']
})


export type bannerFormValues = z.infer<typeof bannerSchema>;

export default bannerSchema;


