
import React, { useState } from 'react'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { useGetProductsQuery } from '@/store/api/products';
import ProductTable from '@/components/dashboard/products/ProductTable';
import { fetchProducts } from '@/server-apis/fetch-products';
import { ReadonlyURLSearchParams } from 'next/navigation';






const Product = async ({ searchParams }: { searchParams: ReadonlyURLSearchParams }) => {

    // const { data: products } = useGetProductsQuery({ storeId: 1 })

    const products = await fetchProducts('1', searchParams)
    console.log("🚀 ~ Product ~ data:", products)

    return (
        <div className='w-full flex flex-col gap-y-5 pt-20 min-h-screen '>
            <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>View Products</CustomHeading>
            {products && products?.data && products?.data?.products?.length > 0 && (
                <ProductTable data={products.data.products} />
            )}
        </div >
    )
}

export default Product


