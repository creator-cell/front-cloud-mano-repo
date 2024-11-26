import { HomePageCarouselData } from "@/store/api/store/storefront/types";


export const fetchCarousalById = async (id: string): Promise<HomePageCarouselData | null> => {
    try {
        const apiUrl = `${process.env.API_URL}/api/v1/store/carousel?StoreCarouselID=${id}`;

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
        console.error("Error fetching carousal data:", error);
        return null
    }
}