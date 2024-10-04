
import CommonInfoCardWithAction from '@/components/common/CommonInfoCardWithAction'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { BestPlacesToWorkData, CompanyRecognitionsContent } from '@/enum/aboutuspage'
import React from 'react'

const Awards = () => {
    return (
        <div className='size-full'>
            <div className='container pt-100'>
                <CustomHeading variant={"default"} className='text-black text-center max-md:text-left'>
                    Awards and Recognition
                </CustomHeading>
                <div className='flex items-center justify-center'>
                    <CustomParagraph variant='medium' className=' text-center max-md:text-left text-gray-500 mt-2 w-[70%] font-[300]'>
                        As an industry-leading ecommerce platform, BigCommerce has earned recognition for its powerful performance, rapid growth, unique workplace culture and commitment to the community. Here are just a few of the awards that we&apos;ve received.
                    </CustomParagraph>
                </div>
            </div>

            <div className='w-full bg-muted mt-[100px]'>
                <div className='container py-100'>
                    <CustomHeading variant={"default"} className=' text-center max-md:text-left text-black'>
                        Experienced Executives
                    </CustomHeading>
                    <div className={(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-12 gap-y-8`)}>
                        {
                            CompanyRecognitionsContent?.map((item, index) => {
                                return (
                                    <CommonInfoCardWithAction key={index} item={item} />
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='container py-100'>
                <CustomHeading variant={"default"} className=' text-center max-md:text-left text-black'>
                    Best Places to Work
                </CustomHeading>
                <div className={(`grid grid-cols-1 md:grid-cols-2  gap-x-8 mt-12 gap-y-8`)}>
                    {
                        BestPlacesToWorkData?.map((item, index) => {
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

export default Awards
