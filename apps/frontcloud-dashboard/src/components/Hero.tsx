"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

import hero_video from "@/assets/video-thumb-home-ent-hero-video-yeti-1.webp"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReactPlayer from 'react-player'



const Hero = () => {
    return (
        <div className='w-full bg-black md:py-[32px] lg:py-[96px] h-full '>
            <div className='container w-full max-md:flex-col max-md:space-y-8  md:flex items-center h-full py-6 lg:py-12'>
                <div className='flex flex-col size-full'>
                    <h1 className='text-white text-[44px] max-md:text-center lg:text-[69px] lg:font-[700] tracking-[-0.02em] leading-[1.1] '>Enterprise <br className='max-md:hidden' /> ecommerce, <br /> simplified.</h1>
                    <div className='mt-9 flex gap-6  flex-wrap md:pr-10 max-md:items-center max-md:justify-center'>
                        <Button variant="default" className='uppercase text-[0.875rem] leading-[1.375rem] font-medium tracking-[0.07em] h-12 px-9 ' >Get A quote</Button>
                        <Button variant="secondary" className='uppercase text-[0.875rem] leading-[1.375rem] font-medium tracking-[0.07em] h-12 px-9 text-black' >Get Started</Button>
                    </div>
                </div>
                <div className='w-full h-full'>
                    <Dialog>
                        <DialogTrigger className=' w-full lg:w-[540px] md:w-[440px]'>
                            <Image
                                src={hero_video}
                                alt="hero_video"
                                width={819}
                                height={476}
                                loading='lazy'
                                className='cursor-pointer object-cover w-full'
                            />
                        </DialogTrigger>
                        <DialogContent>
                            <ReactPlayer
                                width={"100%"} height={"100%"}
                                playing={true}
                                url='https://www.youtube.com/watch?v=osLpjXBXBS0' />
                        </DialogContent>
                    </Dialog>

                </div>

            </div>
        </div>
    )
}

export default Hero
