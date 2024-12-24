"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Carousal from '@/components/store/Carousal'
import images from "@/assets/extra/hero-01.jpg"
import { CustomHeading } from '@/components/custom/CustomHeading'
import { Button } from '@/components/ui/button'
import DiscountBanners from '@/components/store/shared/DiscountBanners';
import ProductCategoryCarousal from '@/components/store/shared/ProductCategoryCarousal';
import HomeCategoryCard from '@/components/store/shared/HomeCategoryCard';
import OfferCard from '@/components/store/OfferCard';
import ProductCard from '@/components/store/shared/ProductCard';
import { useGetAllHomePageCarousalQuery } from '@/Redux/api/storefront/carousel';
import { useGetAllCategoriesQuery } from '@/Redux/api/products/category';
import { useGetStoreHomeQuery } from '@/Redux/api/store';




const breakpoints = {
    0: {
        slidesPerView: 1.2,
        spaceBetween: 10
    },
    420: {
        slidesPerView: 2.2,
        spaceBetween: 20,
    },
    640: {
        slidesPerView: 3.2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 4.4,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 6.2,
        spaceBetween: 20,
    },
};
const ProductBreakpoints = {
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 5,
        spaceBetween: 20,
    },
};
const OfferBreakpoints = {
    640: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
};

const categoryData = [
    {
        title: "Fashion",
        description: "13 items",
        href: "/shop/summer-treats"
    },
    {
        title: "New Arrival: Sneakers",
        image: "https://images.unsplash.com/photo-1513277648666-c8ae0983fe5d",
        description: "Step into comfort and style with our latest sneakers.",
        href: "/shop/sneakers"
    },
    {
        title: "Home Decor Sale",
        image: "https://images.unsplash.com/photo-1592201952516-f3706de36779",
        description: "Redecorate your space with up to 40% off.",
        href: "/shop/home-decor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
    {
        title: "Outdoor Adventures",
        image: "https://images.unsplash.com/photo-1514682001909-b1b6e3e1e760",
        description: "Gear up for your next adventure with special discounts.",
        href: "/shop/outdoor"
    },
];

const fakeOffers = [
    {
        title: "10% Off on Groceries",
        description: "Get 10% off on your next grocery purchase.",
        validity: "Valid until: 31st December 2024",
        code: "GROCERY10"
    },
    {
        title: "Buy 1 Get 1 Free",
        description: "Buy one item and get another free on selected products.",
        validity: "Valid until: 30th November 2024",
        code: "BOGOFREE"
    },
    {
        title: "15% Off on Fresh Produce",
        description: "Enjoy 15% off on fresh fruits and vegetables.",
        validity: "Valid until: 15th October 2024",
        code: "FRESH15"
    },
    {
        title: "Free Shipping on Orders Above $50",
        description: "Get free shipping on all orders over $50.",
        validity: "Valid until: 25th October 2024",
        code: "FREESHIP"
    },
    {
        title: "20% Off on Household Items",
        description: "Save 20% on select household items.",
        validity: "Valid until: 1st November 2024",
        code: "HOUSE20"
    },
];


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




const StorePage = () => {
    const { data } = useGetAllHomePageCarousalQuery()
    const { data: AllCategories } = useGetAllCategoriesQuery()


    const { data: StoreHomeData } = useGetStoreHomeQuery()
    console.log("🚀 ~ StorePage ~ StoreHomeData:", StoreHomeData)

    console.log("🚀 ~ data:", AllCategories)
    return (
        <div className=' flex flex-col gap-14'>
            <div className='h-[80vh] max-h-52 md:max-h-[40rem] relative '>
                <Carousal images={data?.Data ?? []} >
                    {
                        data?.Data && data.Data.length > 0 ? data?.Data?.map((item, index) => (
                            <Image
                                key={item.ItemID}
                                src={item?.ImageURL ?? images}
                                alt={'image'}
                                width={1920}
                                height={1080}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ))
                            :
                            <div className='size-full bg-gray-300'>

                            </div>

                    }

                </Carousal>
                {/* <Banner /> */}
                {/* <div className='absolute  bg-white w-full max-sm:max-w-max sm:max-w-xs md:max-w-xl opacity-90 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
                    <div className="size-full flex items-center justify-center flex-col gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-12 py-5 md:py-10">
                        <CustomHeading className='text-black text-sm max-md:text-4xl '>The Task Lamp</CustomHeading>
                        <CustomParagraph className='text-xs md:text-lg lg:text-xl'>Lamp for reading Books</CustomParagraph>
                        <Button className='text-xs max-sm:h-8 max-sm:px-2'>Shop Now</Button>
                    </div>

                </div> */}
            </div>
            {/* Discount Banners */}
            <DiscountBanners />

            {/* Shop By Categories */}
            <section className='container'>
                <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Shop By Categories</CustomHeading>
                <ProductCategoryCarousal breakpoints={breakpoints} >
                    {
                        AllCategories?.Data.map((category, index) => (
                            <HomeCategoryCard key={index} data={category} />
                        ))

                    }
                </ProductCategoryCarousal>
            </section>


            {/* Fruits & Vegetables */}
            <section className='container'>
                <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Fruits & Vegetables</CustomHeading>
                <ProductCategoryCarousal breakpoints={ProductBreakpoints} >
                    {
                        fakeProducts.map((category, index) => (
                            <ProductCard key={index} card={category} />
                        ))

                    }
                </ProductCategoryCarousal>
            </section>

            {/* Bank Offers */}
            <section className='container'>
                <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Bank Offers</CustomHeading>
                <ProductCategoryCarousal
                    breakpoints={OfferBreakpoints}
                    className=''
                >
                    {fakeOffers.map((offer, index) => (
                        <OfferCard key={index} card={offer} />
                    ))}
                </ProductCategoryCarousal>
            </section>

            <section className='container'>
                <div className='flex items-center justify-between pr-28 '>
                    <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Most Rated Products</CustomHeading>
                </div>

                <ProductCategoryCarousal breakpoints={ProductBreakpoints} >
                    {
                        fakeProducts.map((category, index) => (
                            <ProductCard key={index} card={category} />
                        ))

                    }
                </ProductCategoryCarousal>
            </section>

            <section className='container'>
                <div className='flex items-center justify-between'>
                    {

                        StoreHomeData && StoreHomeData?.Data && StoreHomeData?.Data?.BestOf && StoreHomeData?.Data?.BestOf?.CategoryName &&

                        <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Best of {StoreHomeData?.Data?.BestOf?.CategoryName}</CustomHeading>
                    }
                    <Button variant={"link"} asChild  >
                        <Link href='/content?category=electronics'>View More</Link>
                    </Button>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4' >
                    {
                        StoreHomeData && StoreHomeData?.Data && StoreHomeData?.Data?.BestOf && StoreHomeData?.Data?.BestOf?.Product && StoreHomeData?.Data?.BestOf?.Product.length > 0 &&
                        StoreHomeData?.Data?.BestOf?.Product?.map((category, index) => (
                            <ProductCard key={index} card={category} />
                        ))

                    }
                </div>
            </section>

            {/* Top Selling Items */}
            <section className='container'>
                <div className='flex items-center justify-between'>
                    <CustomHeading className='text-black text-sm md:text-3xl text-left pb-6'>Top Selling Items</CustomHeading>
                    <Button variant={"link"} asChild >
                        <Link href='/content?category=electronics'>View More</Link>
                    </Button>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4' >
                    {
                        StoreHomeData && StoreHomeData?.Data && StoreHomeData?.Data?.BestOf && StoreHomeData?.Data?.MostSelling && StoreHomeData?.Data?.MostSelling.length > 0 &&
                        StoreHomeData?.Data?.MostSelling?.map((product, index) => (
                            <ProductCard key={index} card={product} />
                        ))

                    }
                </div>
            </section>

        </div>
    )
}

export default StorePage



