import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomPageAlart } from '@/components/custom/CustomPageAlart'
import React from 'react'

const Orders = () => {
    return (
        <div className='w-full mt-6  flex flex-col justify-start gap-y-8'>
            <CustomHeading variant={"medium"} className='font-[100] text-black text-left'>View orders</CustomHeading>
            <CustomPageAlart variant={"xmedium"} className='rounded-[2px]'>
                No orders have been placed from your store. When an order comes through it will appear on this page.
            </CustomPageAlart>


        </div>
    )
}

export default Orders
