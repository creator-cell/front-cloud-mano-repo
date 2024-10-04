"use client";
import React from 'react'
import { useForm } from 'react-hook-form';

import { CustomHeading } from '@/components/custom/CustomHeading'
import ShippingAddressForm from './ShippingAddressForm';

const BillingInfoForm = () => {

    return (
        <div className='w-full flex flex-col gap-y-4'>
            <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Billing information</CustomHeading>
            <ShippingAddressForm />
        </div>
    )
}

export default BillingInfoForm;
