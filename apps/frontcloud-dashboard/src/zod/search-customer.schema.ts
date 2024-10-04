import * as z from "zod";

const searchSchema = z.object({
    keywords: z.string().optional(),
    startsWith: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    stateProvince: z.string().optional(),
    customerIDRange: z.object({
        from: z.string().optional(),
        to: z.string().optional(),
    }).optional(),
    numberOfOrders: z.object({
        from: z.number().optional(),
        to: z.number().optional(),
    }).optional(),
    storeCredit: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
    dateJoined: z.object({
        selection: z.enum(['today', 'yesterday', 'thisWeek', 'thisMonth', 'thisYear', 'custom']).optional(),
        from: z.string().optional(),
        to: z.string().optional(),
    }).optional().superRefine((date, ctx) => {
        if (date && date.selection === 'custom') {
            if (!date.from) {
                ctx.addIssue({
                    path: ['from'],
                    message: 'From date is required ',
                    code: z.ZodIssueCode.custom,
                });
            }
            if (!date.to) {
                ctx.addIssue({
                    path: ['to'],
                    code: z.ZodIssueCode.custom,
                    message: 'To date is required ',
                });
            }
        }
    }),
    customerGroup: z.string().optional(),
    sortOrder: z.object({
        sortBy: z.enum(['customerID', 'name', 'email', 'phone', 'numberOfOrders', 'storeCredit', 'dateJoined']).optional(),
        order: z.enum(['asc', 'desc']).optional(),
    }).optional(),
});


export type searchFormValues = z.infer<typeof searchSchema>;


export default searchSchema;
