"use client";

import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import BrandEditForm from '@/components/dashboard/products/brand/BrandEditForm';
import { useGetBrandByIdQuery } from '@/store/api/products/brand';
import { useSearchParams } from 'next/navigation';
import React from 'react'



const BrandEdit = () => {

    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    console.log("🚀 ~ Brands ~ id:", id)

    const { data, error } = useGetBrandByIdQuery(id ?? "")
    console.log("🚀 ~ BrandEdit ~ data:---->>>>", data)


    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen max-w-5xl'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Edit Brand</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Modify the details of the brand below and click Save</CustomParagraph>
            </div>
            {
                id ? data && data.Data && data.Data.length > 0 && < BrandEditForm data={data.Data[0]} BrandID={id} /> : <BrandEditForm />
            }
        </div>
    )
}

export default BrandEdit;
