import { z } from "zod";


const socialLinksSchema = z.object({
    FacebookUrl: z.string().optional(),
    TwitterUrl: z.string().optional(),
    LinkedinUrl: z.string().optional(),
    InstagramUrl: z.string().optional(),
    YoutubeUrl: z.string().optional(),
    GithubUrl: z.string().optional(),
    TiktokUrl: z.string().optional(),
    PinterestUrl: z.string().optional(),
    SnapchatUrl: z.string().optional()
    ,
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;

export default socialLinksSchema;
