
"use client";

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import ProductCategoryCarousal from '@/components/store/shared/ProductCategoryCarousal';
import InfoCard from '@/components/profile/InfoCard';
import ProfileDetails from '@/components/profile/ProfileDetails';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import OrderCard from '@/components/profile/OrderCard';
import { product1, laptop } from "@/assets/extra/index";
import { FaClock, FaHeart, FaShoppingBag } from 'react-icons/fa';

const image = "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80";



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
        <div className='w-full flex-col bg-white space-y-12'>
            <div className='w-full flex gap-x-2 h-full'>
                <div className="flex justify-center relative space-x-6 rounded-md w-full">
                    <div
                        className={cn(
                            "hidden lg:block h-[85vh] bg-gray-50 shadow-md w-full max-w-xs rounded-md space-y-6 border divide-y-2 sticky top-24 overflow-hidden"
                        )}
                    >
                        <ProfileDetails />
                        <ProfileNavigation />
                    </div>

                    <div className="relative flex items-start px-4 mb-12 w-full" style={{ maxWidth: "calc(1156px - 24rem)" }}>
                        <div className="max-w-full bg-gray-50 mt-4 p-4 rounded-md min-h-screen w-full flex flex-col gap-5">
                            <DashboardOverview />
                            <RecentOrders />
                            <BuyAgain />
                            <KeepShoppingFor />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardOverview = () => (
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
