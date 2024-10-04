import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Button } from '@/components/ui/button'
import { SupportOptionData, SupportOptionsData, RegionalContactData, ContactInfo } from '@/enum/contactuspage'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




const ContactUs = () => {
    return (
        <div className='w-full bg-muted flex-1 max-w-[1680px] mx-auto'>
            <div className='container py-100'>
                <h1 className='text-black uppercase text-left text-[12px] font-[400] mb-4'>GET STARTED</h1>
                <CustomHeading variant={"default"} className='text-black text-left'>
                    How can we help you?
                </CustomHeading>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 pt-[50px]'>
                    {
                        SupportOptionsData.map((option, index) => (
                            <SupportOptionCard
                                key={index}
                                data={option}
                            />
                        ))
                    }
                </div>
            </div>

            <div className='container py-100'>
                <CustomHeading variant='medium' className='text-black text-left md:text-center pb-[50px]'>
                    Get connected to a member of our sales team right now
                </CustomHeading>

                <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-7'>
                    {
                        RegionalContactData.map((data, index) => (
                            <RegionalContactInfo key={index} data={data} />
                        ))
                    }
                </div>
            </div>

            <div className=" backgroundImage py-100  h-[40rem] flex items-center justify-end  max-sm:px-12" >
                <div className='container flex items-center justify-end '>
                    <div className='bg-black px-16  py-16 min-w-[280px] w-[45%] flex flex-col gap-y-6 relative '
                        style={{
                            clipPath: 'polygon(0 40px, 40px 0, 110% 0, 110% 110%, 0 110%)',
                        }}
                    >
                        <CustomHeading variant='medium' className='text-white text-left mb-6'>
                            Interested in trying out the platform first?
                        </CustomHeading>
                        <CustomParagraph variant='medium' className='text-white text-left mb-6'>
                            Test drive our functionality with a 15-day free trial, no credit card required.
                        </CustomParagraph>

                        <Button variant='default' className='px-6 py-2 uppercase w-fit mb-7'>
                            Start Free Trial
                        </Button>
                        <svg className="bg-primary absolute -bottom-4 right-0 hidden rotate-180 lg:block" width="81" height="81" viewBox="0 0 81 81"><path d="M0 81L81 0V81H0Z" fill="currentColor"></path></svg>

                    </div>
                </div>
            </div>



        </div >
    )
}

export default ContactUs

interface SupportOptionCardProps {
    data: SupportOptionData
    className?: string
}


const SupportOptionCard: React.FC<SupportOptionCardProps> = ({
    data,
    className,
}) => {
    return (
        <div className={cn(`flex flex-col gap-y-5 py-[50px] px-[40px] ${data.mode === "dark" ? "bg-black" : "bg-white"} `, className)}>
            <Image
                src={data.image.src}
                alt={data.image.alt}
                width={70}
                height={70}
                className='rounded-full'
            />
            <div className='flex flex-col gap-y-5 mt-4'>
                <CustomHeading variant='small' className={`${data.mode === "dark" ? "text-white " : "text-black"} text-left`}>
                    {data.title}
                </CustomHeading>
                <CustomParagraph variant='medium' className={`${data.mode === "dark" ? "text-white " : "text-black"} text-left`}>
                    {data.description}
                </CustomParagraph>
                <Link href={data.button.link} className={`${data.mode === "dark" ? "text-black bg-white " : "text-white bg-black"} text-left py-[0.7rem] px-8 uppercase text-[14px] font-[500] leading-[1.35rem] w-fit rounded-md tracking-wider`} >   {data.button.text} </Link>
            </div>

        </div>
    )
}


interface RegionalContactInfoProps {
    data: ContactInfo
}



const RegionalContactInfo: React.FC<RegionalContactInfoProps> = ({
    data
}) => {
    return (
        <div className='flex items-start justify-start flex-col gap-y-6'>
            <CustomHeading variant='small' className='text-black text-left '>
                {data.region}
            </CustomHeading>

            <div className='flex flex-col gap-y-3'>
                <CustomHeading variant='subtitle' className='text-black text-left font-[700]  capitalize'>
                    Sales
                </CustomHeading>
                <CustomParagraph variant='medium' className='text-black text-left '>
                    <Link href={"/"} className='text-primary'>
                        {data.sales.phoneNumber}
                    </Link>
                    {
                        data.sales.tollFree && <div>(toll free)</div>
                    }
                </CustomParagraph>

                <CustomParagraph variant='small' className='text-black text-left '>
                    {data.sales.hours}
                </CustomParagraph>
            </div>

            <div>
                <CustomHeading variant='subtitle' className='text-black text-left font-[700] '>
                    Support
                </CustomHeading>
                <CustomParagraph variant='medium' className='text-black text-left '>
                    <Link href={"/"} className='text-primary'>
                        {data.support.phoneNumber}
                    </Link>
                </CustomParagraph>
            </div>

        </div>
    )
}