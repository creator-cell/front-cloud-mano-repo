import SectionLayout from '@/components/common/CommonSectionLayout'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import Link from 'next/link'
import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

const ExportProducts = () => {


    const fields = [
        "Item", "Name", "SKU", "Current Stock", "Low Stock", "Safety Stock", "Bin Picking Number", "Availability"
    ]

    return (
        <div className='w-full flex flex-col gap-y-6 py-5 '>
            <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Export Products</CustomHeading>

            <SectionLayout title="Export CSV file" className="gap-y-8">
                <CustomParagraph className='text-black text-left'>Start Export</CustomParagraph>
                <div className='w-full flex flex-col gap-y-1'>
                    <CustomParagraph variant={"xmedium"} className='text-gray-700 text-left'>
                        Data for <span className='text-black'> all selected products</span> will be exported as a csv file.
                        <Link href="/" className="text-blue-500 pl-2">Learn More</Link>
                    </CustomParagraph>
                    <CustomParagraph variant={"xmedium"} className='text-gray-700 text-left'>
                        If you need to change your export, go back to your <Link href="/" className="text-blue-500 px-2">product list</Link> and re-select the products you want to export.
                    </CustomParagraph>
                </div>

                <div className="flex items-center gap-6 max-w-[600px]">
                    <Label htmlFor="country" className='whitespace-nowrap w-40'>Data to import</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Products" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Data to import</SelectLabel>
                                <SelectItem value="india">Inventory</SelectItem>
                                <SelectItem value="i">Products</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col py-4 gap-y-4'>
                    <CustomParagraph variant={"xmedium"} className='text-gray-700 text-left'>Fields to export</CustomParagraph>
                    <div className='flex flex-col gap-y-3'>
                        {
                            fields.map((field, index) => (
                                <div key={index} className='flex items-center gap-x-2'>
                                    <Checkbox key={index} className='w-6 h-6' />
                                    <div>{field}</div>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <Button className=' w-fit text-white px-4 py-2 rounded-md'>Start Export</Button>

            </SectionLayout>
        </div>
    )
}

export default ExportProducts
