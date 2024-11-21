import { z } from "zod";


const socialLinksSchema = z.object({
    facebookUrl: z.string().url().optional(),
    twitterUrl: z.string().url().optional(),
    linkedinUrl: z.string().url().optional(),
    instagramUrl: z.string().url().optional(),
    youtubeUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    tiktokUrl: z.string().url().optional(),
    pinterestUrl: z.string().url().optional(),
    snapchatUrl: z.string().url().optional(),
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;

export default socialLinksSchema;
