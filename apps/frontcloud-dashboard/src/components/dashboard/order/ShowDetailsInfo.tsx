"use client";
import React from 'react'

import { Label } from "@/components/ui/label"
import { CustomParagraph } from '@/components/custom/CustomParagraph';

interface DetailsType {
    label: string;
    value: string;
}

interface DetailsInfoProps {
    details: DetailsType[];
}

const ShowDetailsInfo: React.FC<DetailsInfoProps> = ({
    details
}) => {
    return (
        <div className='w-full bg-white rounded-md px-24 py-8 flex flex-col gap-y-3'>
            {
                details.map((detail, index) => (
                    <div key={index} className='flex items-center gap-6 max-w-[400px]'>
                        <Label htmlFor={detail.label} className='whitespace-nowrap w-32 text-[12px]'>{detail.label}</Label>
                        <CustomParagraph variant={"small"}>{detail.value}</CustomParagraph>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowDetailsInfo
