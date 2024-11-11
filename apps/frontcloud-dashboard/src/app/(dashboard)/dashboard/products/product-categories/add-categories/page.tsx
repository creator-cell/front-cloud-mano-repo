"use client";

import React from 'react'

import CategoryAddForm from '@/components/common/CategoryAddForm';
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { useSearchParams } from 'next/navigation';
import { useGetCategoryByIdQuery } from '@/store/api/products/category';


const AddCategories = () => {

    const searchparams = useSearchParams()
    const categoryId = searchparams.get("id")
    console.log("🚀 ~ AddCategories ~ categoryId:", categoryId)
    if (!categoryId) {
        return
    }
    const { data, error, isLoading } = useGetCategoryByIdQuery(categoryId)
    console.log("🚀 ~ AddCategories ~ data:", data)



    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen max-w-5xl'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Create a Category</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Products in your store are grouped by categories, which makes them easier to find. Fill out the form below to create a new category.</CustomParagraph>
            </div>
            {
                data && data?.data.length > 0 &&
                <CategoryAddForm formValues={data?.data?.[0]} />
            }
        </div >
    )
}

export default AddCategories
