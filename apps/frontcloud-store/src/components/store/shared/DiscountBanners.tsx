"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const DiscountBanners = () => {
    return (
        <div className='w-full container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
            {
                Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className='bg-white rounded-lg'>
                        <div className=' bg-gray-100 rounded-lg p-6 text-left flex flex-col justify-between'>
                            <div className='pb-4'>
                                <h1 className='text-gray-700'>50% Discount</h1>
                                <h2 className='text-xl font-semibold'>Summer Ice Cream</h2>
                            </div>

                            <Button asChild variant={"link"} className='hover:no-underline group px-0 mt-auto self-start'>
                                <Link href='/shop'>
                                    Shop Now <ArrowRight size={20} className='group-hover:translate-x-1 duration-200 transform' />
                                </Link>
                            </Button>
                        </div>
                    </div>

                ))
            }

        </div>
    )
}

export default DiscountBanners
