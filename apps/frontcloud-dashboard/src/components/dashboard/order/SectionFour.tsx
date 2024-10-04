import { CustomHeading } from '@/components/custom/CustomHeading';
import { Label } from '@/components/ui/label';
import React from 'react'
import ShowDetailsInfo from './ShowDetailsInfo';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import ProductShowtable from './ProductShowTable';
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SectionFour = () => {
    const details = {
        "Name": "Rabin Karmakar",
        "Phone": "09749436840",
        "Address": "bankura, west bengal",
        "Suburb/City": "West Bengal",
        "State/Province": "West Bengal",
        "Country": "India",
        "ZIP/Postcode": "722101"
    }

    const customerDetails = Object.entries(details).map(([label, value]) => ({
        label,
        value,
    }));
    return (
        <div className=' w-full flex gap-x-4'>

            <div className='lg:w-[80%] w-[75%] flex flex-col gap-y-8'>
                <div className='w-full flex flex-col gap-y-3'>
                    <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Customer billing details</CustomHeading>
                    <div className='w-full bg-white px-24 py-8 flex flex-col gap-y-8'>
                        <div className='w-full flex gap-x-6'>
                            <Label className='whitespace-nowrap'>Billing address</Label>
                            <ShowDetailsInfo details={customerDetails} />
                            <CustomParagraph className='text-blue-500 pb-2' variant={"small"} >Change</CustomParagraph>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-y-4'>
                    <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Fulfillment details: items 1 - 1 of 1                    </CustomHeading>
                    <div className='w-full bg-white px-24 py-8 flex flex-col gap-y-8'>
                        <div className='w-full flex gap-x-6'>
                            <Label className='whitespace-nowrap'>Billing address</Label>
                            <ShowDetailsInfo details={customerDetails} />
                            <CustomParagraph className='text-blue-500 pb-2' variant={"small"} >Change</CustomParagraph>

                        </div>
                        <div className='flex w-full items-center justify-between'>
                            <Label className='whitespace-nowrap'>Shipping method:       </Label>
                            <CustomParagraph className='text-blue-500 pb-2' variant={"small"} >Change</CustomParagraph>
                        </div>
                        <div>
                            <ProductShowtable />
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-y-3'>
                    <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Comments and notes                </CustomHeading>
                    <div className='w-full bg-white px-24 py-8 flex flex-col gap-y-8'>
                        <div className='flex items-center gap-6 max-w-[600px]'>
                            <Label htmlFor="firstName" className='whitespace-nowrap w-40'>Comments</Label>
                            <Textarea placeholder='Visible to Customer' className='w-full py-3' />
                        </div>
                        <div className='flex items-center gap-6 max-w-[600px]'>
                            <Label htmlFor="firstName" className='whitespace-nowrap w-40'>Staff notes</Label>
                            <Textarea placeholder='Not Visible to Customer' className='w-full py-3' />
                        </div>
                    </div>
                </div>

            </div>

            <div className='lg:w-[20%] w-[25%]'>
                <div className='w-full flex flex-col gap-y-3'>
                    <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Payment         </CustomHeading>
                    <div className='w-full bg-white px-4 py-8 flex items-center justify-center gap-y-8'>
                        <Select >
                            <SelectTrigger className="min-w-max">
                                <SelectValue placeholder="Select " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    <SelectItem value="india">India</SelectItem>
                                    <SelectItem value="usa">USA</SelectItem>
                                    <SelectItem value="england">England</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-y-3'>
                    <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Summary         </CustomHeading>
                    <div className='w-full bg-white px-4 py-8 flex  flex-col items-center justify-between gap-y-5'>
                        <div className='flex flex-col gap-y-3 w-full'>
                            <div className='flex items-center gap-6 max-w-[600px] justify-between w-full'>
                                <Label className='whitespace-nowrap'>Subtotal</Label>
                                <Label className='whitespace-nowrap'>₹ 1000.00</Label>
                            </div>
                            <div className='h-px bg-gray-300' />
                            <div className='flex items-center gap-6 max-w-[600px] justify-between w-full'>
                                <Label className='whitespace-nowrap'>Shipping</Label>
                                <Label className='whitespace-nowrap'>₹ 1000.00</Label>
                            </div>
                            <div className='h-px bg-gray-300' />
                        </div>
                        <div className='flex items-center gap-6 max-w-[600px] justify-between w-full'>
                            <Label className='whitespace-nowrap'>Total</Label>
                            <Label className='whitespace-nowrap'>₹ 1000.00</Label>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label className='whitespace-nowrap'>Manual discount</Label>
                            <div className='flex gap-x-3'>
                                <Input placeholder='0.0' className=' py-3' />
                                <Button variant='outline' className='w-full text-blue-500'>Apply</Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label className='whitespace-nowrap'>Coupon or gift certificate</Label>
                            <div className='flex gap-x-3'>
                                <Input placeholder='' className=' py-3' />
                                <Button variant='outline' className='w-full text-blue-500'>Apply</Button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SectionFour;
