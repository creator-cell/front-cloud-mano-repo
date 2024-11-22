import { toPositiveNumber } from '@/utils/textFieldWithNumberValidation';
import { z } from 'zod';

const homePageCarousalSchema = z.object({
    carouselHeading: z.string().min(1, "Heading is required"),
    carouselText: z.string().min(1, "Text is required"),
    btnText: z.string().min(1, "Button text is required"),
    carouselLink: z.string().url("Invalid URL format"),
    image: z.array(z.any()).min(1, "Image is required"),
    playTime: toPositiveNumber("autoPlay time needed"),
    storeID: z.string().optional().default("1"),
});

export type homePageCarousalFormValues = z.infer<typeof homePageCarousalSchema>;

export default homePageCarousalSchema;
