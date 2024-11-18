"use client";

import React from 'react'


import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import ProductCategoriesTable from '@/components/dashboard/products/category/ProductCategoriesTable'
import { fetchAllCategoies } from '@/server-apis/fetch-categories'
import { useGetAllCategoriesQuery } from '@/store/api/products/category';




const ProductCategories = () => {

    // const AllCategories = await fetchAllCategoies();
    const { data: AllCategories } = useGetAllCategoriesQuery()
    console.log("🚀 ~ ProductCategories ~ AllCategories:", AllCategories)

    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Product Categories</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Categories allow you to group products by similar attributes. The categories in your store are shown below.</CustomParagraph>
            </div>
            {
                AllCategories && AllCategories.data && <ProductCategoriesTable datas={AllCategories?.data} />
            }
        </div>
    )
}

export default ProductCategories


