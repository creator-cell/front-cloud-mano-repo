"use client";

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { countryList } from '@/assets/data/countryData';

const TopBar = () => {
    const [open, setOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(0);


    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    const handleCountrySelect = (index: number) => {
        setSelectedCountry(index);
        setOpen(false);
    };

    return (
        <div className='bg-primary-foreground w-full h-9 border-gray-200 border-b hidden lg:flex'>
            <div className='container flex w-full justify-end items-center '>
                <div className='gap-5 flex items-center justify-between '>
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='relative flex gap-2 items-center cursor-pointer'
                    >
                        {/* country */}
                        <div className='flex gap-2 items-center px-4 h-8'>
                            <Image
                                src={countryList[selectedCountry].flag}
                                alt="country"
                                width={20}
                                height={20}
                            />
                            <ChevronDown size={12} />
                        </div>
                        <div className={`absolute left-2 top-[100%] z-20 bg-white w-44  ${open ? 'block' : 'hidden'} shadow-md`}>
                            {
                                countryList.map((country, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center py-1 cursor-pointer h-8 px-2 hover:bg-gray-300 rounded-sm transition duration-200"
                                        onClick={() => handleCountrySelect(index)}
                                    >
                                        <Image
                                            src={country.flag}
                                            alt="country"
                                            width={20}
                                            height={20}
                                        />
                                        <h1 className='text-[.75rem] text-gray-500 hover:text-gray-700 font-[500] capitalize '>
                                            {country.name}
                                        </h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className='text-[.75rem] text-gray-500 hover:text-gray-700 cursor-pointer leading-9 font-[500] capitalize'>call sales : 1-888-248-9325</h1>
                    </div>
                    <h1 className='text-[.75rem] text-gray-500 hover:text-gray-700 cursor-pointer leading-9 font-[500] capitalize'>Help center</h1>
                    <Link href={"/login"} className='text-[.75rem] text-gray-500 hover:text-gray-700 cursor-pointer leading-9 font-[500] capitalize'>Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default TopBar;
