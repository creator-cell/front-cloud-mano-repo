"use client";
import React, { useEffect, useRef, useState } from 'react'

import VideoContent from "@/enum/main/videos.json"
import Image from 'next/image'

import { logo } from "@/assets/logo/index"
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, CirclePlay, MoveRight, MoveRightIcon } from 'lucide-react';

import GuideImages from "@/assets/guides/index"

const Videos = () => {


    return (
        <div>
            <div className='w-full  bg-gradient-to-r py-24  from-primary to-[#4EB9C8] h-[65vh]  text-white'>
                <div className='container flex flex-col items-center justify-end  pt-12 relative'  >
                    <div className='absolute -top-2 left-0 max-sm:left-7 flex  items-center gap-x-1 text-[14px]'>
                        <h4>Resources</h4> <ChevronRight className='text-white w-3 h-3' /> <h4>Video</h4>
                    </div>
                    <div>
                        <Image src={logo} alt='heroImg' width={100} height={100} className='z-10' />
                    </div>
                    <div className='space-y-3 text-center flex flex-col items-center justify-center '>
                        <h1 className='text-[41px] font-bold'>{VideoContent["heroSection"].title}</h1>
                        <p className='w-2/3 '> {VideoContent["heroSection"].description} </p>
                        <Button className='px-6 py-3 text-lg font-[300]'>{VideoContent["heroSection"].cta}</Button>
                    </div>
                </div>
            </div>
            <div className='bg-gradient-to-r py-12 from-primary to-[#1e8b9a] text-white'>
                <div className='container flex flex-col items-center justify-center   relative'>
                    <h1 className='text-[30px] font-bold'>{VideoContent["mainVideo"].title}</h1>
                    <p className=' text-center'>{VideoContent["mainVideo"].description}</p>
                    <Button variant={"ghost"} className='group hover:bg-transparent px-0 self-center mt-7 uppercase hover:text-green-500 tracking-widest'  >{VideoContent["mainVideo"].cta} <MoveRight className='ml-3 text-green-500 transition-transform duration-300 group-hover:translate-x-2' /> </Button>
                </div>
            </div>
            <div className='bg-black py-24  text-white'>
                <div className='container flex flex-col items-center justify-center   relative'>
                    <h1 className='text-[30px] font-bold'>{VideoContent["videoLibrary"].title}</h1>
                    <div className='w-full'>
                    </div>
                </div>
                <div className='w-[90vw] mx-auto max-w-[1536px]'>
                    {
                        VideoContent["videoLibrary"].library.map((library, index) => (
                            <div key={index} className='space-y-8 mt-12'>
                                <h2 className='text-[30px] font-bold'>{library.title}</h2>
                                <Carousal data={library.videos} />
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Videos



import Slider from "react-slick";
import ReactPlayer from 'react-player';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface CarousalProps {
    breakpoint?: number;
    settings?: {
        slidesToShow: number;
        slidesToScroll: number;
        infinite: boolean;
        dots: boolean;
    };
    data: { title: string, videoUrl: string }[]
}

const Carousal: React.FC<CarousalProps> = ({
    data
}) => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };



    return (
        <Dialog>
            <div className="slider-container px-6">
                <Slider {...settings}>
                    {
                        data.map((item, index) => (
                            <div key={index}
                                className='w-full h-auto  flex flex-col items-center justify-center p-4 cursor-pointer hover:scale-105 duration-300'>
                                <DialogTrigger asChild className='bg-primary text-white' >
                                    <div className='h-[300px] border relative  '>
                                        <Image src={GuideImages.addiGuide3} alt='video' width={300} height={500} className='object-cover size-full' />
                                        <CirclePlay className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white' />
                                        <div className='absolute bottom-2 left-2  px-2 py-1 rounded-md text-white bg-black' >
                                            2 MIN
                                        </div>
                                    </div>
                                </DialogTrigger>

                                <DialogContent className='max-h-[650px] h-[60vh] aspect-[16/9] max-w-[900px] w-[90vw]  '>
                                    <ReactPlayer
                                        url={"https://youtu.be/9VlvbpXwLJs?si=ezXq_pL28kPgHmbu"}
                                        controls={true} width='100%' height='100%'
                                    />
                                </DialogContent>

                                <h3 className='mt-2 text-center'>{item.title}</h3>

                            </div>
                        ))
                    }

                </Slider>
            </div>
        </Dialog>
    );
}
