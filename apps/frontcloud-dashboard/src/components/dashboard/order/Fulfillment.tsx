"use client";
import React, { useState } from 'react'
import ShowDetailsInfo from './ShowDetailsInfo';
import { CustomHeading } from '@/components/custom/CustomHeading';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import ShippingAddressForm from './ShippingAddressForm';
import BillingInfoForm from './BillingInfoForm';

const Fulfillment = () => {

    const [activeValue, setActiveValue] = useState('billing_address_specified');

    const handleValueChange = (value: string) => {
        console.log("🚀 ~ handleValueChange ~ value:", value);
        setActiveValue(value);
    };
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
        <div className='w-full flex flex-col gap-y-3'>
            <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Fulfillment</CustomHeading>
            <div className='w-full bg-white px-24 py-8 flex flex-col gap-y-8'>
                <RadioGroup
                    value={activeValue}
                    onValueChange={handleValueChange}
                    className='flex items-center gap-12'
                >
                    <div>
                        <Label>Destination</Label>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="billing_address_specified" id="existing_user" />
                            <Label htmlFor="existing_user">Billing address specified</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="new_single_address" id="new_user" />
                            <Label htmlFor="new_user">New single address </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="new_multiple_address" id="new_user" />
                            <Label htmlFor="new_user">New multiple address </Label>
                        </div>
                    </div>
                </RadioGroup>
                <div className='w-full h-px bg-gray-300' />

                <div className='w-full flex gap-x-6'>
                    <Label className='whitespace-nowrap'>Billing address</Label>
                    {
                        activeValue === "billing_address_specified" ?
                            <ShowDetailsInfo details={customerDetails} /> :
                            activeValue === "new_single_address" && <ShippingAddressForm />
                    }
                </div>

                <div className='w-full flex flex-col gap-y-4'>
                    <div>
                        <Label className='whitespace-nowrap'>Shipping method</Label>
                        <div className='w-full h-px bg-gray-300' />
                    </div>
                    <div className='flex items-center justify-start gap-x-4'>
                        <Label className='whitespace-nowrap'>Choose a provider</Label>
                        <CustomParagraph variant={"small"} className='whitespace-nowrap text-blue-500 cursor-pointer'>Fetch shipping quotes</CustomParagraph>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default Fulfillment
