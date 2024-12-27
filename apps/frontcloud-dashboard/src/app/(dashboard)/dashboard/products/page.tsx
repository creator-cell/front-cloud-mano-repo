"use client";
import React, { useState } from 'react'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { useGetProductsQuery } from '@/store/api/products';
import ProductTable from '@/components/dashboard/products/ProductTable';


const Product = () => {

    const { data: products } = useGetProductsQuery({ storeId: 1 })

    // const products = await fetchProducts('1', searchParams)
    console.log("🚀 ~ Product ~ data:", products)

    return (
        <div className='w-full flex flex-col gap-y-5 pt-20 min-h-screen '>
            <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>View Products</CustomHeading>
            {products && products?.Data && products?.Data?.Products?.length > 0 && (
                <ProductTable data={products.Data.Products} />
            )}
        </div >
    )
}

export default Product


