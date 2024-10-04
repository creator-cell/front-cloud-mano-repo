


import Image, { StaticImageData } from 'next/image'
import React from 'react'

import WebinerImages from "@/assets/webiner/index"
import { cn } from '@/lib/utils'

import WebinerContent from "@/enum/main/webiner.json"
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

const Webinars = () => {

    const description = "<p>Watch our on-demand webinar where guest speakers from Forrester, RMW Commerce Consulting, and BigCommerce shed light on the world of the shrinking commerce core, and how experience and operations are the new focal points for businesses adopting composable software.</p><p>﻿</p><p>In this webinar, we’ll explore:</p><ul><li>What is composability and what are its capabilities?</li><li>How can you break down organizational silos to support tech adoption?</li><li>How do you streamline vendor selection and solution engineering?</li></ul>"



    return (
        <div>
            <div className='w-full bg-gradient-to-r from-primary to-[#4EB9C8] md:h-[70vh]  text-white'>
                <SectionWrapper className=' flex max-md:flex-col max-md:gap-y-4 items-center justify-between'  >
                    <div className='space-y-3 md:w-1/2  max-md:p-4'>
                        <h1 className='text-[41px] font-bold'>{WebinerContent["heroSection"].title}</h1>
                        <p>{WebinerContent["heroSection"].description} </p>

                    </div>
                    <div>
                        <Image src={WebinerImages.HeroImg} alt='heroImg' width={400} height={400} />
                    </div>
                </SectionWrapper>
            </div>
            <div className='bg-gray-200'>
                <SectionWrapper className=' flex max-md:flex-col max-md:gap-y-4 items-center justify-between'  >
                    <div className='space-y-8 md:w-1/2  max-md:p-4'>
                        <h1 className='text-[41px] font-bold leading-tight'>
                            {WebinerContent["featuredWebinar"].title}
                        </h1>
                        <div className="webinar-description text-[20px] font-[300] text-gray-600" dangerouslySetInnerHTML={{ __html: WebinerContent["featuredWebinar"].description }} />
                        <Button variant={"ghost"} className='group hover:bg-transparent px-0 self-start uppercase hover:text-blue-500 tracking-widest'  >{WebinerContent["featuredWebinar"].cta} <MoveRight className='ml-3 text-blue-500 transition-transform duration-300 group-hover:translate-x-2' /> </Button>

                    </div>
                    <div>
                        <Image src={WebinerImages.Featured} alt='heroImg' width={550} height={550} />
                    </div>
                </SectionWrapper>
            </div>

            <div className='bg-white '>
                <SectionWrapper className=' space-y-8'  >
                    <h1 className='text-[41px] font-bold leading-tight'>
                        {WebinerContent["onDemandWebiner"].title}
                    </h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-12 '>
                        {
                            WebinerContent["onDemandWebiner"].webiners.map((Webiner, index) => (
                                <div key={index} className='flex flex-col items-center space-y-3 '>
                                    <Image src={WebinerImages[Webiner.imageUrl as keyof typeof WebinerImages]} alt={Webiner.title} width={200} height={200} className='size-full' />
                                    <p className='text-black font-semibold leading-6 text-[20px] pr-8'>{Webiner.title}</p>
                                    <Button variant={"ghost"} className='group hover:bg-transparent px-0 self-start uppercase hover:text-blue-500 tracking-widest'  >{WebinerContent["featuredWebinar"].cta} <MoveRight className='ml-3 text-blue-500 transition-transform duration-300 group-hover:translate-x-2' /> </Button>
                                </div>
                            ))
                        }


                    </div>
                </SectionWrapper>

                <div className='bg-white'>
                    <SectionWrapper className='space-y-8'>
                        <h1 className='text-[41px] font-bold leading-tight'>
                            {WebinerContent["resource"].title}
                        </h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8'>

                            {WebinerContent["resource"].resources.map((resource, index) => (
                                <div key={index} className="resource-item mb-4 p-4 ">
                                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                                    <p className="mb-4 text-gray-700">{resource.description}</p>
                                    {/* <a href={resource.url} className="text-blue-500 hover:underline">{resource.cta}</a> */}
                                    <Button variant={"ghost"} className='group hover:bg-transparent px-0 self-start uppercase hover:text-blue-500 tracking-widest'  >{resource.cta} <MoveRight className='ml-3 text-blue-500 transition-transform duration-300 group-hover:translate-x-2' /> </Button>
                                </div>
                            ))}
                        </div>

                    </SectionWrapper>
                </div>
            </div>
        </div>
    )
}

export default Webinars

const SectionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(" container py-24 size-full", className)} >
            {children}

        </div>
    )
}

