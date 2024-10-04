"use client";
import Link from 'next/link'
import React from 'react'

import topImg from "@/assets/press/topImg.webp"
import Image from 'next/image'
import pressContent from "@/enum/main/press.json"
import { Button } from '@/components/ui/button'
import ContentCard from '@/components/common/ContentCard'
const press = () => {
    return (
        <div className='w-full flex flex-col gap-y-12 '>
            <div>
                <Image
                    src={topImg}
                    width={1920}
                    height={1080}
                    alt='topImg'
                />
            </div>
            <div className='space-y-4 py-12'>
                <h1 className='text-3xl font-bold'>{pressContent.title}</h1>
                <p className='text-[15px] leading-relaxed text-gray-500'>{pressContent.description} please visit{" "} <Link href={pressContent.website.url} className='text-blue-500'>{pressContent.website.text}</Link> or follow us on <Link href={pressContent.social.x.url} className='text-blue-500'>{pressContent.social.x.text}</Link>  and <Link href={pressContent.social.linkedin.url} className='text-blue-500'>{pressContent.social.linkedin.text}</Link>   </p>
                <p className='text-[15px] text-gray-600'>{pressContent.trademark}</p>
            </div>
            <div className='h-px bg-gradient-to-r from-transparent via-primary to-transparent my-3' />
            <div className='py-12 space-y-5'>
                <h1 className='text-[42px] font-bold'>{pressContent.Guidelines.title}</h1>
                <p className='text-[18px] leading-relaxed text-gray-500'>{pressContent.Guidelines.description}</p>
                <Button className='tracking-widest px-5'>
                    {pressContent.Guidelines.cta}
                </Button>
            </div>
            <div className='h-px bg-gradient-to-r from-transparent via-primary to-transparent my-3' />
            <div className='py-12 space-y-12'>
                <h1 className='text-3xl font-bold'>Our Logos</h1>
                <div className='flex max-sm:flex-col gap-x-8'>
                    {
                        pressContent.logos.map((logo, index) => (
                            <div key={index} className='flex flex-col items-center '>
                                <div className='border w-full mb-4'>
                                    <Image
                                        src={"/png-logo.png"}
                                        width={200}
                                        height={200}
                                        alt={"logo"}
                                    />
                                </div>
                                <ContentCard
                                    title={logo.title}
                                    description={logo.description}
                                    height={15}
                                    button={{
                                        text: pressContent.Guidelines.cta,
                                        onClick: () => { }
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default press

