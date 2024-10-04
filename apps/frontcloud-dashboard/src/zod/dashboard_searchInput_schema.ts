"use client";
import { z } from 'zod';

export const dashboard_searchInput_schema = z.object({
    search: z.string().min(3, "search must be at least 3 characters long"),
});

export type DashboardSearchInputSchema = z.infer<typeof dashboard_searchInput_schema>;