"use client";
import { commonInfoCardWithActionType } from '@/enum/aboutuspage';
import Image from 'next/image';
import React, { useState } from 'react'
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomHeading } from '../custom/CustomHeading';

interface CommonInfoCardWithActionProps {
    item: commonInfoCardWithActionType
    className?: string;
}

const CommonInfoCardWithAction: React.FC<CommonInfoCardWithActionProps> = ({
    item,
    className
}) => {

    const [hoverLink, sethoverLink] = useState(false)
    return (
        <div className='flex flex-col gap-y-6'>
            <Image
                src={item.image.src}
                alt={item.image.alt}
                width={1440}
                height={400}
                className=' '
            />

            <div className='flex flex-col gap-1 mt-2'>
                {
                    item?.name &&
                    <CustomHeading variant={"small"} className=' text-black text-left'>
                        {item?.name}
                    </CustomHeading>
                }
                {item?.title?.text && (
                    <CustomHeading variant={"small"} className={`text-black text-left`} style={{ color: item.title?.color }}>
                        {item?.title?.text}
                    </CustomHeading>
                )}
                {
                    item?.designation &&
                    <CustomHeading variant={"subtitle"} className=' text-left text-gray-500'>
                        {item?.designation}
                    </CustomHeading>
                }
                <div className='space-x-1'>
                    {
                        item?.description &&
                        item.description.map((item, index) => {
                            return item.link ? (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className={cn(`text-[20px] font-[400] leading-[1.5] `, item.className)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.text}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className={cn(`text-[20px] font-[400] leading-[1.6] text-gray-500`, item.className)}
                                >
                                    {item.text}
                                </span>
                            );
                        })
                    }
                </div>


            </div>
            {
                item?.button &&
                <div className='flex items-center justify-start'>
                    <div
                        onMouseEnter={() => sethoverLink(true)}
                        onMouseLeave={() => sethoverLink(false)}
                        className='w-fit  gap-2 flex items-center justify-start'
                    >
                        <Link href={item.button.link ?? ""} className='text-left text-[#0D52FE] uppercase text-[16px]'>
                            {item.button.text}
                        </Link>
                        <MoveRight size={20} color={hoverLink ? "#121118" : "#0B42CC"} className={`cursor-pointer   ${hoverLink && "translate-x-2 transform duration-200"} `} />
                    </div>
                </div>
            }

        </div>

    )
}

export default CommonInfoCardWithAction;


