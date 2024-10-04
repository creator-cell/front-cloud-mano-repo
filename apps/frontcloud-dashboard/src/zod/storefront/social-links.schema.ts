import { z } from "zod";


const socialLinksSchema = z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    github: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    pinterest: z.string().url().optional(),
    snapchat: z.string().url().optional(),
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;

export default socialLinksSchema;
