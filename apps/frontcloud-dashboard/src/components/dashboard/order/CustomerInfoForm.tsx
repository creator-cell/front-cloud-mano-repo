"use client";

import React, { useState } from 'react';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomHeading } from '@/components/custom/CustomHeading';
import { Input } from '@/components/ui/input';
import AccountDetailsForm from './AccountDetailsForm';

const CustomerInfoForm = () => {
    const [activeValue, setActiveValue] = useState('existing_user');

    // Function to handle radio button change
    const handleValueChange = (value: string) => {
        console.log("🚀 ~ handleValueChange ~ value:", value);
        setActiveValue(value);
    };

    return (
        <div className='w-full flex flex-col gap-y-4'>
            <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>
                Customer information
            </CustomHeading>
            <div className='w-full bg-white rounded-md px-24 py-8 flex flex-col gap-y-8'>
                <RadioGroup
                    value={activeValue}
                    onValueChange={handleValueChange}
                    className='flex items-center gap-6'
                >
                    <div>
                        <Label>Order for</Label>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="existing_user" id="existing_user" />
                            <Label htmlFor="existing_user">Existing Customer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="new_user" id="new_user" />
                            <Label htmlFor="new_user">New Customer</Label>
                        </div>
                    </div>
                </RadioGroup>

                {activeValue === "existing_user" ? (
                    <>
                        <div className='flex items-center gap-6'>
                            <Label>Search</Label>
                            <Input placeholder='Search for a customer' className='w-full py-3' />
                        </div>
                        <div className='flex items-center gap-6'>
                            <Label>Selected customer -</Label>
                            {/* Additional fields or components can be added here */}
                        </div>
                    </>
                ) : (
                    <AccountDetailsForm />
                )}
            </div>
        </div>
    );
};

export default CustomerInfoForm;
