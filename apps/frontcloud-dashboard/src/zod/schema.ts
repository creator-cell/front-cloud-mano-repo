"use client";
import { z } from 'zod';

export const formSchema = z.object({
    password: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
});

export type FormSchema = z.infer<typeof formSchema>;
