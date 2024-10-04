"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from 'react'
import { useForm } from 'react-hook-form';

const AccountDetailsForm = () => {
    const { register, handleSubmit } = useForm();
    return (
        <div>
            <div className='w-full bg-white rounded-md px-24 py-8 flex flex-col gap-y-6'>
                <div className='flex items-center gap-6 max-w-[600px]'>
                    <Label htmlFor="firstName" className='whitespace-nowrap w-40'>Email Address</Label>
                    <Input {...register('firstName')} placeholder='Enter First name' className='w-full py-3' />
                </div>
                <div className='flex items-center gap-6 max-w-[600px]'>
                    <Label htmlFor="lastName" className='whitespace-nowrap w-40'>Password</Label>
                    <Input {...register('lastName')} placeholder='Enter Last name' className='w-full py-3' />
                </div>
                <div className='flex items-center gap-6 max-w-[600px]'>
                    <Label htmlFor="companyName" className='whitespace-nowrap w-40'>Confirm Password</Label>
                    <Input {...register('companyName')} placeholder='Enter Company name' className='w-full py-3' />
                </div>
                <div className='flex items-center gap-6 max-w-[600px]'>
                    <Label htmlFor="phoneNumber" className='whitespace-nowrap w-40'>Exclusive Offers</Label>
                    <Checkbox id="terms" {...register('saveToAddressBook')} />
                    <Label htmlFor="phoneNumber" className='whitespace-nowrap w-40'>I would like to receive updates and offers.</Label>

                </div>
                <div className="flex items-center gap-6 max-w-[600px]">
                    <Label htmlFor="country" className='whitespace-nowrap w-40'>Customer group</Label>
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
                <div className='flex items-center gap-6'>
                    <Label htmlFor="r1">Selected customer  -</Label>
                    {/* <Input placeholder='Search for a customer' className='w-full py-3' /> */}
                </div>
            </div>
        </div>
    )
}

export default AccountDetailsForm
