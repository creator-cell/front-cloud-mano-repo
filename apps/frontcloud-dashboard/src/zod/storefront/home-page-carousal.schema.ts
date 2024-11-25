import { toPositiveNumber } from '@/utils/textFieldWithNumberValidation';
import { z } from 'zod';

const homePageCarousalSchema = z.object({
    CarouselHeading: z.string().min(1, "Heading is required"),
    CarouselText: z.string().min(1, "Text is required"),
    BtnText: z.string().min(1, "Button text is required"),
    CarouselLink: z.string().url("Invalid URL format"),
    Image: z.array(z.any()).min(1, "Image is required"),
    PlayTime: toPositiveNumber("autoPlay time needed"),
    StoreID: z.string().optional().default("1"),
});

export type homePageCarousalFormValues = z.infer<typeof homePageCarousalSchema>;

export default homePageCarousalSchema;
