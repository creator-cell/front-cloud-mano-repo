"use server";
import { MarketingBannersResponse } from "@/store/api/marketing/types/banner-types";

export const fetchAllBanners = async (): Promise<MarketingBannersResponse | null> => {
    try {
        const apiUrl = `${process.env.API_URL}/api/v1/store/banner`;

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
        console.error("Error fetching marketing banners data:", error);
        return null;
    }
}