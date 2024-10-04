import { z } from 'zod';

const homePageCarousalSchema = z.object({
    heading: z.string().min(1, "Heading is required"),
    text: z.string().min(1, "Text is required"),
    buttonText: z.string().min(1, "Button text is required"),
    link: z.string().url("Invalid URL format"),
    images: z.array(z.any()).optional(),
    autoPlayTime: z.number().optional(),
});

export type homePageCarousalFormValues = z.infer<typeof homePageCarousalSchema>;

export default homePageCarousalSchema;
