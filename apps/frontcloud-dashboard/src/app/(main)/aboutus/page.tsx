"use client"
import { Separator } from '@/components/ui/separator'
import { aboutUsBanner, aboutUsTop, companyValues, insideContent, locationContent, servicesAndExperience, visionContent } from '@/enum/aboutuspage'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { MoveRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import { pathway } from '@/styles/font'
import { Button } from '@/components/ui/button'

import CommonLocationCard from '@/components/common/CommonLocationCard'
import { CustomHeading } from '@/components/custom/CustomHeading'


const AboutUs = () => {


    const [hoverLink, sethoverLink] = useState(false)

    return (
        <div className='w-full '>

            {/* section 1 */}
            <div className='container py-[100px] px-[16px]  ' >
                <CustomHeading variant={"medium"} className='text-black text-center max-md:text-left'>
                    {aboutUsTop.title}
                </CustomHeading>
                <div className="space-x-1  mt-[30px] gap-1 mb-24">
                    {aboutUsTop.description.map((item, index) => {
                        return item.link ? (
                            <Link
                                key={index}
                                href={item.link}
                                className={cn(`text-[20px] font-[400] leading-[1.5] `, item.className)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.content}
                            </Link>
                        ) : (
                            <span
                                key={index}
                                className={cn(`text-[20px] font-[400] leading-[1.6] text-gray-500`, item.className)}
                            >
                                {item.content}
                            </span>
                        );
                    })}
                </div>
                <div className='container'>
                    <Image
                        src={aboutUsBanner[0].img}
                        alt={aboutUsBanner[0].alt}
                        width={1440}
                        height={400}
                        className='rounded-[10px]'
                    />
                </div>
            </div >


            {/* section 2 */}
            <div className='w-full   bg-[#ECEFF3]' >
                <div className='container py-[100px]'>
                    <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                        {servicesAndExperience.title}
                    </CustomHeading>
                    {/* <h1 className=' text-[34px] font-[700] leading-[1.2] tracking-wide text-center'>{servicesAndExperience.title}</h1> */}
                    <div className='grid  grid-cols-1 md:grid-cols-3 my-6 pb-7'>
                        {
                            servicesAndExperience.numberRepresentation.map((item, index) => {
                                return (
                                    <div key={index} className='w-full flex justify-center gap-5 mt-10 flex-col  '>
                                        <div className='flex flex-col items-start'>
                                            <h1 className={`text-[80px] lg:text-[92px] font-[700] leading-[0.9] ${pathway.className} tracking-tighter`}>{item.number}</h1>
                                            <p className='text-[16px] font-[500] leading-[1.6] text-gray-700 text-left'>{item.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='mt-12'>
                        <p className='text-[18px] font-[300] leading-[1.6] text-gray-500 lg:px-20 text-left md:text-center'>{servicesAndExperience.description}</p>
                    </div>
                    <div className='mt-10 space-x-2 flex w-full justify-start md:justify-center'>
                        {servicesAndExperience.moreinfo.map((item, index) => {
                            return (
                                <div key={index} className=" ">
                                    {item.link ? (
                                        <Link href={item.link} className={cn("text-[18px] font-[400] leading-[1.5] ", item.className)}>
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <span className="text-[18px] font-[400] leading-[1.2] text-gray-500 tracking-tighter ">
                                            {item.title}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div
                        className='mt-5   flex items-center justify-center'>
                        <div
                            onMouseEnter={() => sethoverLink(true)}
                            onMouseLeave={() => sethoverLink(false)}
                            className='w-fit  gap-2 flex items-center justify-center'
                        >
                            {
                                servicesAndExperience.latestNews.map((item, index) => {
                                    return (
                                        <div key={index} className="space-x-1">
                                            <Link href={item.link
                                            }>
                                                <h1 className={cn("text-[18px] font-[400] leading-[1.5]", item.className)}>
                                                    {item.title}
                                                </h1>
                                            </Link>
                                        </div>
                                    )

                                }
                                )}
                            <MoveRight size={20} color={hoverLink ? "#121118" : "#0B42CC"} className={`cursor-pointer   ${hoverLink && "translate-x-2 transform duration-200"} `} />
                        </div>
                    </div>

                </div>
            </div >

            {/* section 3 */}
            <div className='container py-[100px] px-[16px]' >
                <CustomHeading variant={"medium"} className='text-black text-center max-md:text-left'>
                    Our Comany value
                </CustomHeading>

                <p className='text-[16px] font-[400] leading-[1.6] mt-7 text-left md:text-center text-gray-500'>These are the core principles upon which BigCommerce was built, guiding what we do and how we do it. Each employee learns them, loves them and lives them. Our merchants benefit from them every time they use our product or get help from our Support team.</p>
                <div className='h-[35vh] md:h-[78vh] mt-6'>
                    <ReactPlayer
                        width={"100%"} height={"100%"}
                        playing={false}
                        url='https://www.youtube.com/watch?v=osLpjXBXBS0' />
                </div>
                <div className='py-[50px]'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-4'>
                        {
                            visionContent.map((item, index) => {
                                return (
                                    <div key={index} className='flex flex-col '>
                                        <h1 className='text-[34px] font-[700] leading-[1.2] tracking-wide text-left'>{item.title}</h1>
                                        <p className='text-[16px] font-[400] leading-[1.6] mt-7  text-gray-500 text-left'>{item.content}</p>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div >
            {/* section 4 */}
            <div className='w-full  bg-[#ECEFF3] py-[100px]' >
                <div className='container'>
                    <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                        Inside BigCommerce
                    </CustomHeading>
                    {
                        insideContent.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-col '>
                                    {/* <h1 className='text-[24px] font-[700] leading-[1.2] tracking-wide text-left'>{item.title}</h1> */}
                                    <p className='text-[16px] md:text-[20px] font-[400] leading-[1.6] mt-3  text-gray-500  text-left md:text-center'>{item.content}</p>
                                </div>
                            )
                        }
                        )

                    }
                </div>
                <div className='container mt-12'>
                    <Image
                        src={aboutUsBanner[1].img}
                        alt={aboutUsBanner[1].alt}
                        width={1440}
                        height={400}
                        className='rounded-[10px]'


                    />

                </div>

            </div >
            {/* section 5 */}
            <div className='w-full bg-[#000000] py-[100px]' >
                <div className='container flex max-md:flex-col  gap-10'>
                    <div className='w-full md:w-[40%]'>
                        <Image
                            src={aboutUsBanner[2].img}
                            alt={aboutUsBanner[2].alt}
                            width={1440}
                            height={400}
                            className=' '
                        />
                    </div>
                    <div className='flex-1'>
                        {/* <h1 className='text-[42px] font-[700] leading-[1.2] tracking-wide  pb-7 text-white text-left'> Join us. We&apos;re hiring.</h1> */}
                        <CustomHeading variant={"default"} className='text-white text-left'>
                            Join us. We&apos;re hiring.
                        </CustomHeading>
                        <p className='text-[20px] font-[400] leading-[1.6] mt-3  text-gray-300 text-left'>If you’re looking for the challenge of an innovative company with the opportunity of a career-enhancing business and people-centered culture, this is the place for you.</p>
                        <div
                            className='mt-5   flex items-center justify-start'>
                            <div
                                onMouseEnter={() => sethoverLink(true)}
                                onMouseLeave={() => sethoverLink(false)}
                                className='w-fit  gap-2 flex items-center justify-start'
                            >
                                <Link href={"/"}>
                                    <h1 className={cn(`text-[18px] font-[400] ${hoverLink ? "text-[#00EADA]" : "text-white"} leading-[1.5] `,)}>
                                        See available positions
                                    </h1>
                                </Link>

                                <MoveRight size={26} color={hoverLink ? "#00EADA" : "#00EADA"} className={`cursor-pointer   ${hoverLink && "translate-x-1 transform duration-100"} `} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            {/* section 6 */}
            <div className='w-full bg-[#ECEFF3] py-[100px]' >
                <div className='container'>

                    <CustomHeading variant={"medium"} className='text-black text-center max-md:text-left'>
                        Diversity & Inclusion
                    </CustomHeading>
                    {/* <h1 className='text-[34px] font-[700] leading-[1.2] tracking-wide  pb-7 text-black text-center'> Diversity & Inclusion </h1> */}
                    {/* <h1 className='text-[34px] font-[700] leading-[1.2] tracking-wide  pb-7 text-black text-center'> Diversity & Inclusion </h1> */}
                    <p className='text-[20px] font-[400] leading-[1.6] mt-3  text-gray-500 text-left'>Our dedication to diversity and inclusion is grounded in the moral belief in the dignity, value, and potential of every individual, and a practical belief that diverse, inclusive teams will create the best outcomes for our customers, partners, employees, and company. We welcome everyone to be a part of our journey.</p>
                    <div className='grid grid-cols-1 md:grid-cols-3 mt-12 gap-x-6'>
                        {
                            Object.keys(companyValues).map((item, index) => {
                                return (
                                    <div key={index} className='flex flex-col '>
                                        <h1 className='text-[24px] font-[700] leading-[1.2] tracking-wide text-left'>{item}</h1>
                                        <p className='text-[16px] font-[400] leading-[1.6] mt-7  text-gray-500 text-left'>{(companyValues as any)[item]}</p>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>

            </div >

            {/* section 7 */}
            {/* <div className='container py-[100px]' >
                <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                    Our Locations
                </CustomHeading>
                <p className='text-[20px] font-[400] leading-[1.6] mt-3  text-gray-500 text-left md:text-center'>We have modern offices around the world in many vibrant cities. Each has its own personality with smart, talented people who are dedicated to our customers and company success.</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-12 gap-y-8'>
                    {
                        locationContent.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-col gap-y-4'>
                                    <Image
                                        src={item.image.src}
                                        alt={item.image.alt}
                                        width={1440}
                                        height={400}
                                        className=' '
                                    />
                                    <CustomHeading variant={"medium"} className='text-black text-center max-md:text-left'>
                                        {item.title}
                                    </CustomHeading>
                                    <p className='text-[16px] font-[400] leading-[1.6] mt-2 text-gray-500 text-left'>{item.description}</p>
                                </div>
                            )
                        }
                        )
                    }
                </div>


            </div > */}

            <div className='container py-[100px]' >
                <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                    Our Locations
                </CustomHeading>
                <p className='text-[20px] font-[400] leading-[1.6] mt-3  text-gray-500 text-left md:text-center'>We have modern offices around the world in many vibrant cities. Each has its own personality with smart, talented people who are dedicated to our customers and company success.</p>
                <CommonLocationCard data={locationContent} />
            </div >
            {/* section 8 */}
            {/* <div className='bg-[#ECEFF3] w-full' >
                <div className='container py-[100px] flex flex-col gap-y-6'>
                    <CustomHeading variant={"medium"} className='text-black text-center max-md:text-left'>
                        Want to learn more about BigCommerce and our career opportunities?
                    </CustomHeading>
                    <p className='text-[16px] font-[400] leading-[1.6]  text-gray-500 text-center md:px-7 max-md:text-left'>Here at BigCommerce, we&apos;re interested in sharing who we are and the exciting plans we have for redefining the ecommerce industry. Join our BigNetwork to stay up to date on BigCommerce news, events, and potential career opportunities.</p>
                    <div className='flex w-full  md:justify-center '>
                        <Button variant="default" className='uppercase text-[0.875rem] leading-[1.375rem] font-medium tracking-[0.05em] py-2 px-6 max-sm:py-0   ' >Join Our Big NewWork</Button>
                    </div>

                </div>
            </div > */}


        </div >
    )
}

export default AboutUs
