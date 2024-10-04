"use client";

import React from 'react'

import CategoryAddForm from '@/components/common/CategoryAddForm';
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'


const AddCategories = () => {



    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen max-w-5xl'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Create a Category</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Products in your store are grouped by categories, which makes them easier to find. Fill out the form below to create a new category.</CustomParagraph>
            </div>
            <CategoryAddForm />
        </div >
    )
}

export default AddCategories
