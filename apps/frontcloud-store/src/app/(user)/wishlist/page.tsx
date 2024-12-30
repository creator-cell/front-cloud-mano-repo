"use client";

import { CustomHeading } from '@/components/custom/CustomHeading'
import WishlistCard from '@/components/store/shared/WishlistCard';
import { useGetAllWishListItemsQuery } from '@/Redux/api/user';
import React from 'react'

// fakeProducts.ts
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


const wishlistPage = () => {

    const { data } = useGetAllWishListItemsQuery()
    console.log("🚀 ~ wishlistPage ~ data:", data)

    return (
        <section className='container my-8'>
            <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Wishlist</CustomHeading>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4'>
                {
                    data && data?.Data.length > 0 && data?.Data?.[0]?.Wishlist.length > 0 &&
                    data?.Data?.[0]?.Wishlist.map((item, index) => (
                        <WishlistCard key={index} product={item} />
                    ))
                }
            </div>
        </section>
    )
}

export default wishlistPage
