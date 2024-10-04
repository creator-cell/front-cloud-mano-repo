import React from 'react'
import { CustomHeading } from '../custom/CustomHeading'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils';
import { locationContentType } from '@/enum/aboutuspage';


interface commonCardWithImgTitleDescProps {
    data: locationContentType[];
    className?: string;
}

const CommonLocationCard: React.FC<commonCardWithImgTitleDescProps> = ({
    data,
    className
}) => {
    return (
        <div className={cn(`grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-12 gap-y-8`, className)}>
            {
                data?.map((item, index) => {
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


    )
}

export default CommonLocationCard;
