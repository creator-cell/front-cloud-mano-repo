"use client";
import React from 'react'
import { useForm } from 'react-hook-form';


import { Label } from "@/components/ui/label"
import { CustomHeading } from '@/components/custom/CustomHeading'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';

const ShippingAddressForm = () => {
    const { register, handleSubmit } = useForm();
    return (
        <div className='w-full bg-white rounded-md px-24 py-8 flex flex-col gap-y-8'>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="firstName" className='whitespace-nowrap w-40'>First Name</Label>
                <Input {...register('firstName')} placeholder='Enter First name' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="lastName" className='whitespace-nowrap w-40'>Last Name</Label>
                <Input {...register('lastName')} placeholder='Enter Last name' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="companyName" className='whitespace-nowrap w-40'>Company Name</Label>
                <Input {...register('companyName')} placeholder='Enter Company name' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="phoneNumber" className='whitespace-nowrap w-40'>Phone Number</Label>
                <Input {...register('phoneNumber')} placeholder='Enter Phone number' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="address1" className='whitespace-nowrap w-40'>Address line 1</Label>
                <Input {...register('address1')} placeholder='Enter Address line 1' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="address2" className='whitespace-nowrap w-40'>Address line 2</Label>
                <Input {...register('address2')} placeholder='Enter Address line 2' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="suburb" className='whitespace-nowrap w-40'>Suburb/City</Label>
                <Input {...register('suburb')} placeholder='Enter Suburb/City' className='w-full py-3' />
            </div>
            <div className="flex items-center gap-6 max-w-[600px]">
                <Label htmlFor="country" className='whitespace-nowrap w-40'>Country</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Country" />
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
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="state" className='whitespace-nowrap w-40'>State/Province</Label>
                <Input {...register('state')} placeholder='Enter State/Province' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-6 max-w-[600px]'>
                <Label htmlFor="zip" className='whitespace-nowrap w-40'>Zip/Postcode</Label>
                <Input {...register('zip')} placeholder='Enter Zip/Postcode' className='w-full py-3' />
            </div>
            <div className='flex items-center gap-4 max-w-[600px]'>
                <Checkbox id="terms" {...register('saveToAddressBook')} />
                <Label htmlFor="terms" className='text-gray-700'>Save to customer&apos;s address book</Label>
            </div>
        </div>
    )
}

export default ShippingAddressForm
