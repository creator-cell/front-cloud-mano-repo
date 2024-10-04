import React from 'react'
import ServiceCard from './ServiceCard'
import { ServiceImages } from "@/assets/service_image/index"


const Services = () => {

    const servicesDescription1 = [
        {
            title: 'Rated Exceptional for Total Cost of Ownership in',
            color: '#FEFEFF',
        },
        {
            title: 'Mid-Market',
            color: '#05E9D9',
            link: '/b2b-commerce'
        },
        {
            title: 'and',
            color: '#FEFEFF',
        },
        {
            title: 'Enterprise',
            color: '#05E9D9',
            link: '/enterprise-commerce'
        },
    ]
    const servicesDescription2 = [
        {
            title: 'A Magic Quadrant™ "Challenger" for Fourth Year for Digital Commerce',
            color: '#05E9D9',
            link: '/b2b-commerce'
        },
    ]
    const servicesDescription3 = [
        {
            title: 'Strong Performer in ﻿B2C Commerce Solutions',
            color: '#FEFEFF',
        },
        {
            title: '﻿B2C Commerce Solutions',
            color: '#05E9D9',
            link: '/b2b-commerce'
        },
    ]
    const servicesDescription4 = [
        {
            title: 'A Leader in Headless Digital Commerce Platforms for ',
            color: '#FEFEFF',
        },
        {
            title: 'Mid-Market',
            color: '#05E9D9',
            link: '/b2b-commerce'
        },
        {
            title: 'and',
            color: '#FEFEFF',
        },
        {
            title: 'Enterprise',
            color: '#05E9D9',
            link: '/enterprise-commerce'
        },
    ]

    return (
        <div className='w-full py-[96px] bg-black'>
            <div className='container w-full '>
                <div className='w-full pb-[32px]'>
                    <h1 className='text-[#c1c1c5] text-center text-[20px] font-[400] leading-[1.6]'>BigCommerce is the <span className='text-[#FEFEFF]'>most trusted</span>  commerce solution provider.</h1>
                    <h1 className='text-[#c1c1c5] text-center text-[13px] font-[400] leading-[1.6]'>The Forrester Wave™ B2C and B2B Commerce Solutions Q2, 2022</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-[32px]'>
                    <ServiceCard description={servicesDescription1} image={ServiceImages.paradigm} />
                    <ServiceCard description={servicesDescription2} image={ServiceImages.Gartner} />
                    <ServiceCard description={servicesDescription3} image={ServiceImages.Forrester} />
                    <ServiceCard description={servicesDescription4} image={ServiceImages.IDC} />
                </div>
            </div>
        </div>
    )
}

export default Services
