"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import GroceryImages from "@/assets/grocery/index";

interface Data {
    title: string;
    image?: string | undefined;
    description: string;
    href: string;
}

interface HomeCategoryCardProps {
    data?: Data;
}

const HomeCategoryCard: React.FC<HomeCategoryCardProps> = ({ data }) => {
    const router = useRouter()

    return (
        <div>
            <Card className="w-full border  pb-0 border-primary rounded-md cursor-pointer  relative overflow-hidden  group">
                <div className='group-hover:scale-95 duration-150 p-4'>
                    <CardTitle className='text-base whitespace-nowrap truncate group-hover:text-store-primary duration-150 '>Fashion</CardTitle>
                    <CardDescription className='text-xs whitespace-nowrap truncate '>25 items</CardDescription>
                </div>
                <CardContent onClick={() => router.push('/store/1')} className='mt-2 space-y-1 group-hover:scale-95 duration-150 p-4'>
                    <CardHeader className='pb-8'>
                        <Image
                            src={GroceryImages.card1.price}
                            alt="product"
                            width={300}
                            height={300}
                            className="rounded-md"
                        />
                    </CardHeader>
                </CardContent>
                <CardFooter className="p-0 flex justify-between items-end pb-4 absolute z-30 transform top-1/2 left-1/2 translate-y-36 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:-translate-y-1/2 duration-300 ">
                    <Button className=' bg-store-primary hover:bg-store-primary '>
                        Shop Now <ArrowRight size={20} className='ml-1' />
                    </Button>
                </CardFooter>
                <div className=' bg-store-primary z-10 size-full hidden group-hover:flex duration-150 opacity-20 absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>

                </div>
            </Card>
        </div>

    );
};

export default HomeCategoryCard;





const DiscountBanners = () => {
    const router = useRouter()

    return (
        <div className='w-full container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
            {
                Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index}
                        className="w-full border p-4 pb-0 border-primary rounded-md cursor-pointer space-y-3 relative overflow-hidden group">
                        <CardTitle className='text-base whitespace-nowrap truncate '>50% Discount</CardTitle>

                        <CardContent onClick={() => router.push('/store/1')} className='mt-2 space-y-1'>
                            <CardHeader>
                                <Image
                                    src={GroceryImages.card1.price}
                                    alt="product"
                                    width={300}
                                    height={300}
                                    className="rounded-md"
                                />
                            </CardHeader>

                        </CardContent>
                        <CardFooter className="p-0 flex justify-between items-end pb-4 absolute transform top-1/2 left-1/2 translate-y-36 -translate-x-1/2 group-hover:-translate-y-1/2 duration-300 ">
                            <Button className=' bg-store-primary hover:bg-store-primary'>
                                Shop Now <ArrowRight size={25} className='' />
                            </Button>
                        </CardFooter>
                    </Card>

                ))
            }

        </div>
    )
}

