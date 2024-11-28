
import { z } from 'zod';

// const logoSchema = z.object({
//     logo_type: z.enum(['logo_text', 'logo_image']),
//     IsLogo: z.boolean().optional(),
//     FontColor: z.string().min(2, "Enter atleast 2 value").max(7, "Enter atmost 6 value").optional(),
//     FontSize: z.string().optional(),
//     StoreLogoText: z.string().optional(),
//     Logo: z.any().optional(),
//     Favicon: z.any().optional(),
// });

const logoSchema = z.object({
    logo_type: z.enum(['logo_text', 'logo_image']),
    IsLogo: z.boolean().optional(),
    FontColor: z.string().min(2, "Enter at least 2 characters").max(7, "Enter at most 7 characters").optional(),
    FontSize: z.string().optional(),
    StoreLogoText: z.string().optional(),
    Logo: z.any().optional(),
    Favicon: z.any().optional(),
}).superRefine((data, ctx) => {
    if (data.logo_type === 'logo_text') {
        if (!data.FontColor) {
            ctx.addIssue({
                code: 'custom',
                path: ['FontColor'],
                message: 'Font color is required when logo type is text.',
            });
        }
        if (!data.FontSize) {
            ctx.addIssue({
                code: 'custom',
                path: ['FontSize'],
                message: 'Font size is required when logo type is text.',
            });
        }
        if (!data.StoreLogoText) {
            ctx.addIssue({
                code: 'custom',
                path: ['StoreLogoText'],
                message: 'Store logo text is required when logo type is text.',
            });
        }
    }
});


export type LogoFormValues = z.infer<typeof logoSchema>;

export default logoSchema;