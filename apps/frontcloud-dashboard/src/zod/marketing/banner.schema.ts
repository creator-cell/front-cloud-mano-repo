import { toBoolean } from '@/utils/StringFieldAsBoolean';
import { z } from 'zod';

const bannerSchema = z.object({
    marketingBannerName: z.string().min(1, 'Name is required'),
    content: z.string().min(1, 'Content is required'),
    storeID: z.string(),
    location: z.object({
        label: z.enum(['homepage', 'specificcategory', 'specificbrand', 'resultpage']),
        value: z.string().optional()
    }),
    categoryID: z.string().optional(),
    dateRange: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    visible: z.boolean().optional(),
    placement: z.enum(['top', 'bottom']),
    image: z.any().optional(),
    itemId: z.string().optional(),
});


export type bannerFormValues = z.infer<typeof bannerSchema>;

export default bannerSchema;


