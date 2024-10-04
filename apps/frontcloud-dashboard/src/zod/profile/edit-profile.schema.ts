import * as z from 'zod';

const profileSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Enter a valid email address"),
    language: z.enum(['en', 'hi', 'or'], {
        errorMap: () => ({ message: "Select a valid language" })
    }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export default profileSchema;
