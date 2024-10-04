import Image, { StaticImageData } from 'next/image'
import React from 'react'

import GuideImages from "@/assets/guides/index"
import { cn } from '@/lib/utils'

import GuideContent from "@/enum/main/guide.json"
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

const Guide = () => {
    return (
        <div>
            <div className='w-full bg-gradient-to-r from-primary to-[#4EB9C8] md:h-[70vh]  text-white'>
                <SectionWrapper className=' flex  max-md:flex-col max-md:gap-y-4 items-center justify-between'  >
                    <div className='space-y-3 md:w-1/2  max-md:p-4 '>
                        <h1 className='text-[41px] font-bold'>{GuideContent["heroSection"].title}</h1>
                        <p>{GuideContent["heroSection"].description} </p>

                    </div>
                    <div className="">
                        <Image src={GuideImages.HeroImg} alt='heroImg' width={400} height={400} />
                    </div>
                </SectionWrapper>
            </div>
            <div className='bg-gray-200'>
                <SectionWrapper className=' flex max-md:flex-col max-md:gap-y-4 items-start justify-between'  >
                    <div className='space-y-8 md:w-1/2  max-md:p-4 '>
                        <h1 className='text-[41px] font-bold leading-tight'>
                            {GuideContent["replatformingGuide"].title}
                        </h1>
                        {
                            GuideContent["replatformingGuide"].description.map((desc, index) => (
                                <p key={index} className='text-gray-500' >{desc}</p>

                            ))
                        }
                        <Button variant={"ghost"} className='group hover:bg-transparent px-0 uppercase hover:text-blue-500 tracking-widest'  >{GuideContent["replatformingGuide"].cta} <MoveRight className='ml-3 text-blue-500 transition-transform duration-300 group-hover:translate-x-2' /> </Button>
                    </div>
                    <div>
                        <Image src={GuideImages.ReplatformingGuideImage} alt='heroImg' width={550} height={550} />
                    </div>
                </SectionWrapper>
            </div>

            <div className='bg-white '>
                <SectionWrapper className=' space-y-8'  >
                    <h1 className='text-[41px] font-bold leading-tight'>
                        {GuideContent["additionalGuides"].title}
                    </h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-12 '>
                        {
                            GuideContent["additionalGuides"].guides.map((guide, index) => (
                                <div key={index} className='flex flex-col items-start space-y-3 '>
                                    <Image src={GuideImages[guide.imageUrl as keyof typeof GuideImages]} alt={guide.title} width={200} height={200} className='size-full' />
                                    <p className='text-black font-semibold text-start leading-6 text-[20px] pr-8'>{guide.title}</p>
                                    <Button variant={"ghost"} className='group hover:bg-transparent px-0 self-start uppercase hover:text-blue-500 tracking-widest'  >{GuideContent["replatformingGuide"].cta} <MoveRight className='ml-3 text-blue-500 transition-transform duration-300 group-hover:translate-x-2' /> </Button>
                                </div>
                            ))
                        }


                    </div>
                </SectionWrapper>
            </div>
        </div>
    )
}

export default Guide

const SectionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(" container py-24 size-full", className)} >
            {children}

        </div>
    )
}
