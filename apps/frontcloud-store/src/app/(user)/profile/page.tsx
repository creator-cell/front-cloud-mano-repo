"use client";

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

const ProfilePage = () => {
    return (
        <div className='w-full flex-col bg-white space-y-12'>
            <div className='w-full flex gap-x-2 h-full '>
                <div
                    className="flex justify-center relative space-x-6 rounded-md  w-full  "
                >
                    <div
                        className={cn(
                            "hidden lg:block  h-[85vh] bg-gray-50 shadow-md w-full max-w-xs rounded-md space-y-6 border divide-y-2 sticky top-24  overflow-hidden",
                        )}
                    >
                        <ProfileDetails />
                        <ProfileNavigation />
                    </div>
                    <div className="div relative flex items-start px-4  w-full"
                        style={{
                            maxWidth: "calc(1156px -  24rem)",
                        }}
                    >
                        <div className="max-w-full bg-gray-50 mt-4 rounded-md min-h-screen w-full flex flex-col gap-5">
                            {/* <ProductDetail /> */}
                        </div>
                    </div>

                </div>
            </div >
        </div>
    )
}

const image = "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80";

const ProfileDetails = () => {
    return (
        <div className='relative  flex flex-col justify-between '>
            <Image
                src={image}
                className=" w-full max-h-56 rounded-md object-cover"
                height="400"
                width="500"
                alt="thumbnail"
            />
            <div className='size-32 rounded-full text-black shadow-lg bg-gray-300 absolute left-1/2 -translate-x-1/2 bottom-16'>
            </div>
            <div className='flex flex-col items-center pt-16'>
                <Label className='text-xl font-bold'>John Doe</Label>
                <Label className='text-sm  truncate'>Johndoe@gmail.com</Label>
            </div>
        </div>
    );
}

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaUser, FaShoppingBag, FaHeart, FaCreditCard, FaAddressBook } from 'react-icons/fa';
import { TbLayoutDashboardFilled } from "react-icons/tb";



interface NavigationLink {
    name: string;
    icon: IconType;
    link: string;
}

// Define your navigation links
const NavigationLinks: NavigationLink[] = [
    {
        name: 'Dashboard',
        icon: TbLayoutDashboardFilled,
        link: '/profile'
    },
    {
        name: 'Orders',
        icon: FaShoppingBag,
        link: '/profile/orders'
    },
    {
        name: 'Wishlist',
        icon: FaHeart,
        link: '/profile/wishlist'
    },
    {
        name: 'Saved Cards',
        icon: FaCreditCard,
        link: '/profile/cards'
    },
    {
        name: 'Address',
        icon: FaAddressBook,
        link: '/profile/address'
    },
    {
        name: 'My Account',
        icon: FaUser,
        link: '/profile/my-account'
    }
];

// Create the ProfileNavigation component
const ProfileNavigation: React.FC = () => {
    return (
        <div className="space-y-4 py-8">
            {NavigationLinks.map((link) => {
                return (
                    <motion.div
                        key={link.name}
                        className="flex items-center p-2 pl-4 cursor-pointer  rounded-md hover:bg-gray-200 transition duration-200"
                        whileHover={{ scale: 1.03 }}
                    >
                        <link.icon className="mr-2 size-5 " />
                        <span>{link.name}</span>
                    </motion.div>
                );
            })}
        </div>
    );
}


export default ProfilePage;


