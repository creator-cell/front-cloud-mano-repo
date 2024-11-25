import { z } from "zod";


const socialLinksSchema = z.object({
    FacebookUrl: z.string().url().optional(),
    TwitterUrl: z.string().url().optional(),
    LinkedinUrl: z.string().url().optional(),
    InstagramUrl: z.string().url().optional(),
    YoutubeUrl: z.string().url().optional(),
    GithubUrl: z.string().url().optional(),
    TiktokUrl: z.string().url().optional(),
    PinterestUrl: z.string().url().optional(),
    SnapchatUrl: z.string().url().optional()
    ,
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;

export default socialLinksSchema;
