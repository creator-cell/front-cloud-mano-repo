'use client'

import ProductCard from '@/components/store/shared/ProductCard';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { removeFilter, setCategory } from '@/Redux/slice/filterSlice';
import DesktopFilter from '@/components/store/shop/DesktopFilter';
import MobileFilter from '@/components/store/shop/MobileFilter';




const fakeProducts = [
    {
        productImg: "/assets/extra/product1.jpg", // Ensure this path is correct
        title: "Stylish Sneakers",
        price: 2999,
        discountPrice: 3999,
        rating: 4.5,
    },
    {
        productImg: "/assets/extra/product2.jpg", // Ensure this path is correct
        title: "Elegant Watch",
        price: 4999,
        discountPrice: 5999,
        rating: 4.0,
    },
    {
        productImg: "/assets/extra/product3.jpg", // Ensure this path is correct
        title: "Wireless Headphones",
        price: 1999,
        discountPrice: 2999,
        rating: 4.8,
    },
    {
        productImg: "/assets/extra/product4.jpg", // Ensure this path is correct
        title: "Leather Backpack",
        price: 3499,
        discountPrice: 4499,
        rating: 4.2,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product1.jpg", // Ensure this path is correct
        title: "Stylish Sneakers",
        price: 2999,
        discountPrice: 3999,
        rating: 4.5,
    },
    {
        productImg: "/assets/extra/product2.jpg", // Ensure this path is correct
        title: "Elegant Watch",
        price: 4999,
        discountPrice: 5999,
        rating: 4.0,
    },
    {
        productImg: "/assets/extra/product3.jpg", // Ensure this path is correct
        title: "Wireless Headphones",
        price: 1999,
        discountPrice: 2999,
        rating: 4.8,
    },
    {
        productImg: "/assets/extra/product4.jpg", // Ensure this path is correct
        title: "Leather Backpack",
        price: 3499,
        discountPrice: 4499,
        rating: 4.2,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
];


const ShopPage = () => {
    const searchParams = useSearchParams()

    const category = searchParams.get('category')


    const dispatch = useAppDispatch();
    const { category: cta, filters } = useAppSelector(state => state.productFilters)
    console.log("🚀 ~ ShopPage ~ cta:", cta, filters)

    useEffect(() => {
        if (category) {
            dispatch(setCategory(category))
        }
    }, [category])

    const handleRemoveFilter = (type: string, value: string) => {
        dispatch(removeFilter({ type, value }));
    }


    return (
        <div className='container flex max-lg:flex-col items-start gap-x-6 mt-8'>
            {/* filters */}
            <DesktopFilter
                category={cta}
                filters={filters}
                handleRemoveFilter={handleRemoveFilter}
            />
            <div className='w-full lg:hidden pb-3'>
                <MobileFilter
                    category={cta}
                    filters={filters}
                    handleRemoveFilter={handleRemoveFilter}
                />
            </div>
            {/* products */}
            <section className='flex-1 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full' >
                    {
                        fakeProducts.map((category, index) => (
                            <ProductCard key={index} card={category} />
                        ))
                    }
                </div>
            </section>
        </div >


    )
}


export default ShopPage
