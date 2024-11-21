"use client";

import React, { useMemo } from 'react'

import CategoryAddForm from '@/components/common/CategoryAddForm';
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { useSearchParams } from 'next/navigation';
import { useGetSubCategoryByIdQuery } from '@/store/api/products/sub-category';
import { useGetAllCategoriesQuery } from '@/store/api/products/category';


const AddCategories = () => {

    const searchparams = useSearchParams()
    const subCategoryId = searchparams.get("id")
    console.log("🚀 ~ AddCategories ~ categoryId:", subCategoryId)

    const { data, error, isLoading } = useGetSubCategoryByIdQuery(subCategoryId ?? "")
    console.log("🚀 ~ AddCategories ~ data:", data)

    const { data: AllCategories } = useGetAllCategoriesQuery()


    console.log("🚀 ~ AddCategories ~ AllCategories:", AllCategories)
    const parentCategoryOptions = useMemo(() => {
        if (AllCategories && AllCategories.data.length > 0) {
            return AllCategories.data.map((category) => ({
                label: category.CategoryName,
                value: category?.CategoryID?.toString() ?? " ",
            }));
        }
        return [];
    }, [AllCategories]);
    console.log("🚀 ~ AddCategories ~ parentCategoryOptions:", parentCategoryOptions)



    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen max-w-5xl'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Create a Sub Category</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Products in your store are grouped by categories, which makes them easier to find. Fill out the form below to create a new category.</CustomParagraph>
            </div>
            {subCategoryId ?
                parentCategoryOptions && parentCategoryOptions.length > 0 && data && data?.data.length > 0 &&
                <CategoryAddForm
                    hasParentCategory
                    parentCategoryOptions={parentCategoryOptions}
                    categoryID={subCategoryId ?? ""}
                    formValuesSubCategory={data?.data?.[0]}
                /> : <CategoryAddForm
                    hasParentCategory
                    parentCategoryOptions={parentCategoryOptions}
                    categoryID={subCategoryId ?? ""}
                    formValuesSubCategory={data?.data?.[0]}
                />
            }
        </div >
    )
}

export default AddCategories
