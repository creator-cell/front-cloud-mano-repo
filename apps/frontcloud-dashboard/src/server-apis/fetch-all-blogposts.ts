import { StoreBlogResponse } from "@/store/api/marketing/types/blog-types";

export const fetchAllBlogposts = async (): Promise<StoreBlogResponse | null> => {
    try {
        const apiUrl = `${process.env.API_URL}/api/v1/store/blog`;

        const response = await fetch(apiUrl, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        try {
            return await response.json();
        } catch (jsonError) {
            throw new Error("Failed to parse JSON response");
        }
    } catch (error) {
        console.error("Error fetching blogposts data:", error);
        return null;
    }
}