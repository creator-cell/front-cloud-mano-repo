"use client";

import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import useMediaQuery from '@/hooks/useMedia';
import { Separator } from './ui/separator';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const menu = [
    {
        title: 'About Us',
        link: '/aboutus'
    },
    {
        title: 'Leaders',
        link: '/aboutus/leaders'
    },
    {
        title: 'Awards',
        link: '/aboutus/awards'
    },
    {
        title: 'Careers',
        link: '/careers'
    },
]


const AboutusNav = () => {


    const pathaName = usePathname();
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width: 640px)');


    return (
        <div className='w-full bg-black '>
            {
                isMobile ? (
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-12">
                            <AccordionTrigger className='text-white px-2' >
                                About Us
                            </AccordionTrigger>
                            <AccordionContent >
                                {
                                    menu.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 items-center py-1 cursor-pointer h-8 px-2 pl-4 hover:bg-gray-300 rounded-sm transition duration-200"
                                            onClick={() => router.push(item.link)}
                                        >
                                            <h1 className='text-[.875rem] text-gray-500 hover:text-gray-700 font-[500] capitalize '>
                                                {item.title}
                                            </h1>
                                        </div>
                                    ))
                                }
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                ) : (
                    <>
                        <div className='container py-2 flex items-center gap-4'>
                            <h1 className='uppercase text-[.875rem] leading-4 py-2 pr-3 text-white opacity-70'>company</h1>
                            <Separator orientation='vertical' className='py-3' />
                            <div className='w-full flex items-center justify-start'>
                                {
                                    menu.map((item, index) => {
                                        const isActive = pathaName === item.link;

                                        return (
                                            <div className='relative cursor-pointer' key={index}>
                                                <Link href={item.link} key={index} className={`text-[.875rem] leading-4 py-1 px-3 text-white ${!isActive && "opacity-70"} `}>{item.title}</Link>
                                                <div className={`${isActive ? "absolute" : "hidden"} bottom-0 left-3 w-[70%] bg-[#00EADA] h-[1px]`}>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </>

                )
            }

        </div >
    )
}

export default AboutusNav
