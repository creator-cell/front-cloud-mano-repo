
import { Product, ProductResponse } from "@/store/api/products/types/products-types";
import { unstable_cache } from "next/cache";
import { ReadonlyURLSearchParams } from "next/navigation";



export const fetchProducts =
    // unstable_cache(
    async (storeId: string, queryParams?: ReadonlyURLSearchParams): Promise<ProductResponse | null> => {
        try {

            // Construct the query string if there are query parameters
            const queryString = queryParams ? new URLSearchParams(queryParams).toString() : '';
            const api_url = process.env.NODE_ENV === 'development' ? process.env.DEV_API_URL : process.env.API_URL;
            const apiUrl = `${api_url}/api/v1/products/products/${storeId}?${queryString}`;

            console.log("🚀 ~ fetchProducts ~ apiUrl:", apiUrl);

            // Fetch the data from the API
            const response = await fetch(apiUrl);

            console.log("🚀 ~ response:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            try {
                return await response.json();
            } catch (jsonError) {
                throw new Error("Failed to parse JSON response");
            }
        } catch (error) {
            console.error("Error fetching Products  data:", error);
            return null;
        }
    }
//     undefined,
//     {
//         tags: ["product-query"],
//         revalidate: 30,
//     }
// );
