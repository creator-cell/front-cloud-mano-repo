"use client";
import React, { useCallback } from 'react'
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

import image from "@/assets/extra/product1.jpg"

// Define product type based on the dummy data schema
interface Product {
    name: string;
    SKU: string;
    brand: string;
    weight: number;
    category: string;
    subCategory: string;
    description: string;
    pricing: {
        defaultPrice: number;
        salePrice?: number;
    };
    tags: string[];
    images: string[];
}



const dummyProducts =
{
    name: "Profiline Vintage T9 Cordless Shaver 0mm Men Barber Hair Cutting Machine Shaver For Men  (Gold)",
    SKU: "SHOE123",
    brand: "Footex",
    weight: 1.2,
    category: "Footwear",
    subCategory: "Sneakers",
    description: "High-quality running shoes with great durability.",
    pricing: {
        defaultPrice: 99.99,
        salePrice: 79.99,
    },
    tags: ["Running", "Comfort", "Sports"],
    images: [
        "/images/shoe1.jpg", // Sample image path
        "/images/shoe2.jpg",
    ],
    variations: [
        {
            SKU: "SHOE123-RED",
            weight: 1.2,
            quantity: 50,
            images: ["/images/shoe-red.jpg"],
            variant: "Color: Red",
            pricing: {
                defaultPrice: 99.99,
                salePrice: 79.99,
            },
        },
    ],
    dimensionsWeight: {
        weight: "400 gm",
        length: "12 mm",
        width: "6 mm",
        height: "4 mm",
    },
    Warranty: {
        "Warranty Summary": "N/A",
        "Service Type": "N/A",
        "Covered in Warranty": "N/A",
        "Not Covered in Warranty": "N/A"
    }
}

const SingleProductPage = ({ params }: { params: { id: string } }) => {
    console.log(params.id)
    return (
        <div className='w-full flex-col bg-white space-y-12'>


            <div className='w-full flex gap-x-2 h-full '>
                <motion.div
                    className="flex justify-center relative space-x-6 rounded-md p-10 w-full  "
                >
                    <div
                        className={cn(
                            "hidden lg:block h-[80vh] w-full max-w-md rounded-md space-y-6 border sticky top-24 p-4 overflow-hidden",
                        )}
                    >
                        <Slider />
                        <div className=' grid grid-cols-2 gap-8'>
                            <Button className="">Buy Now</Button>
                            <Button variant={"outline"} className="">Add To Cart</Button>

                        </div>
                    </div>
                    <div className="div relative flex items-start px-4 w-full"
                        style={{
                            maxWidth: "calc(1156px - 31rem)",
                        }}
                    >
                        <div className="max-w-full w-full flex flex-col gap-5">
                            <ProductDetail />
                        </div>
                    </div>

                </motion.div>
            </div >
            <section className='container space-y-6'>
                <CustomHeading className='text-black text-sm md:text-3xl text-center'>Recomanded Products</CustomHeading>
                {/* <SharedCarousal data={["", "", "", "", "", ""]} >
                    <ProductCard />
                </SharedCarousal> */}
            </section>
            <section className='container space-y-6 '>
                <CustomHeading className='text-black text-sm md:text-3xl text-center'>You May Also Like</CustomHeading>
                {/* <SharedCarousal data={["", "", "", "", "", ""]} >
                    <ProductCard />
                </SharedCarousal> */}
            </section>
        </div>
    )
}

export default SingleProductPage


// components/ProductDetail.tsx
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Star, StarIcon } from 'lucide-react';
import SharedCarousal from '@/components/store/shared/SharedCarousal';
import { CustomHeading } from '@/components/custom/CustomHeading';

const ProductDetail: FC = () => {
    return (
        <motion.div
            className=" rounded-lg max-w-5xl mx-auto space-y-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Product Image and Basic Info */}
            <div className="grid grid-cols-1  gap-8">

                {/* Product Information */}
                <div className='space-y-4'>
                    <h1 className="text-lg  font-semibold mb-2">
                        Profiline Vintage T9 Cordless Shaver 0mm Men Barber Hair Cutting Machine Shaver For Men (Gold)
                    </h1>
                    <div className='flex h-6 gap-1'>
                        <Badge>
                            3.6
                            <Star size={10} fill='green' className="inline-block ml-1" />
                        </Badge>
                        <p className="text-gray-500 mb-2 font-medium">
                            196 Ratings & 7 Reviews
                        </p>
                    </div>

                    {/* Price and Discount */}
                    <div className='flex gap-x-3 items-center '>
                        <div className="text-3xl font-bold text-black">₹393</div>
                        <div className=" line-through text-gray-600 ">₹1,999</div>
                        <div className="text-green-600 ">80% off</div>
                    </div>

                    {/* Available Offers */}
                    <h3 className="text-lg font-semibold mb-2">Available Offers</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
                        <li>10% off up to ₹1,500 on HDFC Bank Credit Card Transactions (Min Txn Value: ₹4,999)</li>
                        <li>10% off up to ₹1,750 on HDFC Bank Credit Card EMI Transactions (Min Txn Value: ₹4,999)</li>
                        <li>Make a purchase and enjoy a surprise cashback/coupon that you can redeem later!</li>
                    </ul>

                    {/* Warranty and Delivery Info */}
                    {/* <div className="mb-4">
                        <h3 className="text-lg font-semibold">Delivery</h3>
                        <input
                            type="text"
                            placeholder="Enter Delivery Pincode"
                            className="border border-gray-300 rounded-md px-3 py-1 mb-2"
                        />
                        <p className="text-gray-500">Delivery by 5 Oct, Saturday | Free?</p>
                    </div> */}

                    {/* Highlights */}
                    <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                    <ul className="list-disc pl-5 mb-4 text-gray-500">
                        <li>Cordless</li>
                        <li>1 Speed Settings</li>
                        <li>Rechargeable</li>
                        <li>Waterproof</li>
                    </ul>

                    {/* Call to Action */}
                    <div className='flex-1 grid grid-cols-2 gap-8'>
                        <Button className="">Buy Now</Button>
                        <Button variant={"outline"} className="">Add To Cart</Button>

                    </div>
                </div>
            </div>

            {/* Seller and Services */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Seller</h3>
                <p>LakshmiEnterprisez (3.3 Rating)</p>
                <p className="text-sm text-gray-500">7 Days Replacement Policy</p>
            </div>
            <div className='flex flex-col '>
                <PackageDetails title='Dimensions' data={dummyProducts.dimensionsWeight} />
                <PackageDetails title='Warranty' data={dummyProducts.Warranty} />
            </div>


        </motion.div>
    );
};




interface PackageDetailsProps {
    title: string;
    data: {
        [key: string]: string | string[] | number | undefined;
    };
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ title, data }) => {
    return (
        <div className="flex flex-col gap-y-5 border p-6">
            <h2 className='text-lg font-semibold '>{title}</h2>
            <div className='flex flex-col gap-2'>
                {Object.keys(data).map((key, index) => (
                    <div key={index} className='flex items-center justify-start gap-6'>
                        <p className="text-gray-600 font-medium text-md w-80 text-start">{key}:</p>
                        {Array.isArray(data[key]) ? (
                            <>
                                {(data[key] as string[]).map((item, subIndex) => (
                                    <div key={subIndex}>{item ?? "NA"}</div>
                                ))}
                            </>
                        ) : (
                            <p>{data[key]}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};








import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import ArrowButton from '@/components/store/shared/CarousalArrows';
const Slider = () => {
    const swiperRef = useRef<SwiperRef>(null);


    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [isClickable, setIsClickable] = React.useState(true);
    const handleArrowClick = useCallback((direction: 'prev' | 'next') => {
        if (isClickable && swiperRef.current) {
            setIsClickable(false);
            direction === 'prev' ? swiperRef.current.swiper.slidePrev() : swiperRef.current.swiper.slideNext();
            setTimeout(() => setIsClickable(true), 500);
        }
    }, [isClickable]);

    return (
        <>
            <Swiper
                ref={swiperRef}
                // style={{
                //     '--swiper-navigation-color': '#fff',
                //     '--swiper-pagination-color': '#fff',
                // }}
                loop={true}
                spaceBetween={10}
                // navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2 group"
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
                <ArrowButton
                    direction="prev"
                    className={`left-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto size-12 bg-[#00000080] text-white `}
                    arrowSize={30}
                    onClick={() => handleArrowClick('prev')}
                />

                <ArrowButton
                    direction="next"
                    className={` right-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto size-12 bg-[#00000080] text-white`}
                    arrowSize={30}
                    onClick={() => handleArrowClick('next')}
                />
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
            </Swiper>

        </>
    );
}
