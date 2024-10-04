
import { z } from 'zod';

const logoSchema = z.object({
    logo_type: z.enum(['logo_text', 'logo_image']),
    font_color: z.string().min(2, "Enter atleast 2 value").max(7, "Enter atmost 6 value"),
    font_size: z.string().optional(),
    logo_text: z.string().optional(),
    logo_image: z.any().optional(),
    favicon_image: z.any().optional(),
});

export type LogoFormValues = z.infer<typeof logoSchema>;

export default logoSchema;