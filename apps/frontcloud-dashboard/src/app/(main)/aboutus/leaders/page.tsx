import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { experiencedExecutives, WorldClassAdvisorsData } from '@/enum/aboutuspage'
import React from 'react'
import CommonInfoCardWithAction from '@/components/common/CommonInfoCardWithAction'

const Leaders = () => {
    return (
        <div className='w-full h-full ' >
            <div className='container pt-100'>
                <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                    Our Leaders
                </CustomHeading>
                <CustomParagraph variant='default' className=' text-center max-md:text-left text-gray-500 mt-2'>
                    As BigCommerce continues to grow globally, the depth and range of our corporate leadership does as well. Our executives have experience growing companies like PayPal, HomeAway and Twitter. They are supported by a board of distinguished business leaders who know that building a great company takes unfailing commitment to your customers.
                </CustomParagraph>
            </div>
            <div className='container pt-100'>
                <CustomHeading variant={"default"} className=' text-center max-md:text-left text-black'>
                    Experienced Executives
                </CustomHeading>
                <div className={(`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 mt-12 gap-y-8`)}>
                    {
                        experiencedExecutives?.map((item, index) => {
                            return (
                                <CommonInfoCardWithAction key={index} item={item} />
                            )
                        }
                        )
                    }
                </div>
            </div>
            <div className='container pt-100'>
                <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                    World-Class Advisors
                </CustomHeading>
                <div className={(`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 mt-12 gap-y-8`)}>
                    {
                        WorldClassAdvisorsData?.map((item, index) => {
                            return (
                                <CommonInfoCardWithAction key={index} item={item} />
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Leaders
