'use client'

import React, { useEffect, useState } from 'react'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import ProductCategoryCard from '@/components/store/shared/ProductCategoryCard'

const fakeProducts = [

    {
        title: "Wireless Headphones",
        price: 1999,
        discountPrice: 2999,
        rating: 4.8,
    },
    {
        title: "Leather Backpack",
        price: 3499,
        discountPrice: 4499,
        rating: 4.2,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
];



const ContentPage = () => {

    return (
        <section className='container mt-8'>
            <div className='flex flex-col items-center justify-start'>
                <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Top Selling Items</CustomHeading>
                <CustomParagraph className='text-black text-xs md:text-lg text-left pb-6'>22 items</CustomParagraph>

            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' >
                {
                    fakeProducts.map((category, index) => (
                        <ProductCategoryCard key={category.title} card={category} />
                    ))

                }
            </div>
        </section>
    )
}

export default ContentPage
