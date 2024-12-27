"use client"


import React from 'react'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import ProductSubCategoryTable from '@/components/dashboard/products/sub-category/ProductSubCategoryTable'
import { useGetAllSubCategoriesQuery } from '@/store/api/products/sub-category'


const ProductSubCategories = () => {

    const AllSubCategories = useGetAllSubCategoriesQuery()
    console.log("🚀 ~ ProductSubCategories ~ AllSubCategories:", AllSubCategories)

    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Product Sub Categories</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Categories allow you to group products by similar attributes. The categories in your store are shown below.</CustomParagraph>
            </div>
            {
                AllSubCategories && AllSubCategories?.data && <ProductSubCategoryTable data={AllSubCategories?.data?.Data} />
            }

        </div>
    )
}

export default ProductSubCategories;



