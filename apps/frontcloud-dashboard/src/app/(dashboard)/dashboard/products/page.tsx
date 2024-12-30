"use client";
import React, { useState } from "react";
import { CustomHeading } from "@/components/custom/CustomHeading";
import { useGetProductsQuery } from "@/store/api/products";
import ProductTable from "@/components/dashboard/products/ProductTable";
import { Button } from "@/components/ui/button";

const Product = () => {
    const [limit, setLimit] = useState(5);
    const [index, setIndex] = useState(1);

    const { data: products, isFetching } = useGetProductsQuery({ storeId: 1, limit, index });
    console.log("🚀 ~ Product ~ products:", products);

    const handleNextPage = () => {
        if (products && products?.Data?.Pagination.CurrentPage < products?.Data?.Pagination?.TotalPages) {
            setIndex((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (products && products?.Data?.Pagination?.CurrentPage > 1) {
            setIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full flex flex-col gap-y-5 py-20 min-h-screen">
            <CustomHeading variant={"pageHeading"} className="font-[100] text-black text-left">
                View Products
            </CustomHeading>

            {isFetching && <div>Loading...</div>}

            {products && products?.Data?.Products?.length > 0 ? (
                <div className="w-full bg-white p-4">
                    <ProductTable data={products.Data.Products} />
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={products?.Data?.Pagination?.CurrentPage === 1 || isFetching}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={
                                isFetching ||
                                products?.Data?.Pagination?.CurrentPage === products?.Data?.Pagination?.TotalPages
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                !isFetching && <div>No products found.</div>
            )}
        </div>
    );
};

export default Product;
