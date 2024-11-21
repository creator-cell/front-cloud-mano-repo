"use server"

import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { ProductCategoryType } from "@/store/api/products/types/category-types";
import { ReadonlyURLSearchParams } from "next/navigation";

// const token = cookies().get("token");

export const fetchAllCategoies =
    //  unstable_cache(

    async (): Promise<{ message: string, data: ProductCategoryType[] } | null> => {
        try {


            // if (!token) {
            //     console.error("Error: Missing authorization token.");
            //     return null;
            // }

            const apiUrl = `${process.env.API_URL}/api/v1/products/Categories`;

            console.log("🚀 ~ fetchAppliedJobs ~ apiUrl:", apiUrl);

            // Fetch the data from the API
            const response = await fetch(apiUrl, {
                // headers: {
                //     Authorization: `Bearer ${token?.value}`,
                // },
            });

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
            console.error("Error fetching applied jobs data:", error);
            return null;
        }
    }
//     ,
//     undefined,
//     {
//         tags: ["applied-jobs-query"],
//         revalidate: 30,
//     }
// );
