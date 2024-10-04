"use client";
import useScroll from '@/hooks/useScroll';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

import Pressnavigation from "@/enum/main/pressNavigation.json"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isSticky = useScroll(48); // Trigger sticky when scrolling 48px
    console.log("🚀 ~ layout ~ isSticky:", isSticky);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className=" container  relative flex max-md:flex-col gap-x-10 py-12"
        >
            <div className='w-[200px]'>
                <PressSidebar />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </motion.div>
    );
};

export default Layout;

const PressSidebar = () => {
    const pathName = usePathname();


    const isActive = (path: string) => pathName === path;
    return (
        <div className=' flex flex-col max-md:flex-row  max-md:items-center max-md:gap-x-4'>
            {Pressnavigation.map((link) => (
                <motion.div
                    key={link.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='pb-4'
                >
                    <Link
                        href={link.href}
                        className={`relative block py-2 px-4 rounded-md ${isActive(link.href) ? '' : ''}`}
                    >
                        <p className={`relative z-20 ${isActive(link.href) ? 'text-blue-600' : ''}`}>
                            {link.label}
                        </p>
                        {isActive(link.href) && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute inset-0 bg-gray-200 z-10 rounded-md"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};
