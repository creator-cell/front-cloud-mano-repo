
"use client";

import { Label } from '@/components/ui/label';
import ProductCategoryCarousal from '@/components/store/shared/ProductCategoryCarousal';
import InfoCard from '@/components/profile/InfoCard';
import OrderCard from '@/components/profile/OrderCard';
import { product1, laptop } from "@/assets/extra/index";
import { FaClock, FaHeart, FaShoppingBag } from 'react-icons/fa';
import React from 'react';
import { useGetUserQuery } from '@/Redux/api/user';




const ProductBreakpoints = {
    0: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
};
const max3 = {
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
};


interface InfoCardData {
    label: string;
    value: number;
    icon: JSX.Element;
}

const fakeData: InfoCardData[] = [
    {
        label: 'Total Orders',
        value: 3658,
        icon: <FaShoppingBag className='size-20 text-primary' />
    },
    {
        label: 'Total Wishlist',
        value: 3215,
        icon: <FaHeart className='size-20 text-red-500' />
    },
    {
        label: 'Total Pending Orders',
        value: 254,
        icon: <FaClock className='size-20 text-yellow-500' />
    }
];


const ProfilePage = () => {
    return (
        <React.Fragment>
            <DashboardOverview />
            <RecentOrders />
            <BuyAgain />
            <KeepShoppingFor />
        </React.Fragment>

    );
};

const DashboardOverview = () => {
    return (

        <>
            <Label className='text-2xl font-semibold'>My Dashboard</Label>
            <div className='space-y-2'>
                <Label className=''>Hello, <strong>John Doe</strong></Label>
                <p className='text-sm'>
                    From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {fakeData.map((data, index) => (
                    <InfoCard key={index} data={data} />
                ))}
            </div>
        </>
    );
}
const RecentOrders = () => (
    <div className='space-y-2 mt-7'>
        <Label className='text-xl font-semibold text-start'>Recent Orders</Label>
        <ProductCategoryCarousal navigationArrows={false} breakpoints={ProductBreakpoints}>
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
        </ProductCategoryCarousal>
    </div>
);

const BuyAgain = () => (
    <div className='space-y-2 mt-7'>
        <Label className='text-xl font-semibold text-start'>Buy Again</Label>
        <ProductCategoryCarousal navigationArrows={false} breakpoints={ProductBreakpoints}>
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
            <OrderCard image={product1} />
        </ProductCategoryCarousal>
    </div>
);

const KeepShoppingFor = () => (
    <div className='space-y-2 mt-7'>
        <Label className='text-xl font-semibold text-start'>Keep Shopping For</Label>
        <ProductCategoryCarousal navigationArrows={false} breakpoints={max3}>
            <OrderCard name='Laptop' image={laptop} />
            <OrderCard name='Laptop' image={laptop} />
            <OrderCard name='Laptop' image={laptop} />
            <OrderCard name='Laptop' image={laptop} />
            <OrderCard name='Laptop' image={laptop} />
            <OrderCard name='Laptop' image={laptop} />
        </ProductCategoryCarousal>
    </div>
);

export default ProfilePage;
