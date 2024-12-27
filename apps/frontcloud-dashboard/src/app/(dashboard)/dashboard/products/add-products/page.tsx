"use client";

import React, { useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

import { useAddProductsMutation, useGetProductByIdQuery } from '@/store/api/products';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetAllCategoriesQuery } from '@/store/api/products/category';
import AddProductFrom from '@/components/dashboard/products/ProductAddForm';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const AddProduct = () => {

    const searchParams = useSearchParams()

    const productId = searchParams.get('id')
    console.log("🚀 ~ AddProduct ~ productId:", productId)

    const { data } = useGetProductByIdQuery(productId ?? "0")
    console.log("🚀 ~ AddProduct ~ data:", data)



    const { data: AllCategories } = useGetAllCategoriesQuery()


    console.log("🚀 ~ AddCategories ~ AllCategories:", AllCategories)
    const parentCategoryOptions = useMemo(() => {
        if (AllCategories && AllCategories.Data.length > 0) {
            return AllCategories.Data.map((category) => ({
                label: category.CategoryName,
                value: category?.CategoryID?.toString() ?? " ",
            }));
        }
        return [];
    }, [AllCategories]);


    return (
        <div className='w-full '>
            {
                productId ? data?.Data?.product && AllCategories && AllCategories?.Data?.length > 0 && (
                    <AddProductFrom
                        productData={data?.Data}
                        parentCategoryOptions={parentCategoryOptions}
                        allCategories={AllCategories?.Data}
                    />
                ) : (
                    <AddProductFrom
                        allCategories={AllCategories?.Data}
                        parentCategoryOptions={parentCategoryOptions}
                    />
                )
            }

        </div >

    )
}

export default AddProduct
