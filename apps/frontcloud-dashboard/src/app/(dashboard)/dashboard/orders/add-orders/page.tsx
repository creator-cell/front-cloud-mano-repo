"use client";
import CommonStepper from '@/components/common/CommonStepper'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomPageAlart } from '@/components/custom/CustomPageAlart'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import AddProductsForm from '@/components/dashboard/order/AddProductsForm'
import BillingInfoForm from '@/components/dashboard/order/BillingInfoForm'
import CustomerInfoForm from '@/components/dashboard/order/CustomerInfoForm'
import Fulfillment from '@/components/dashboard/order/Fulfillment'
import ProductShowtable from '@/components/dashboard/order/ProductShowTable'
import SectionFour from '@/components/dashboard/order/SectionFour'
import ShowDetailsInfo from '@/components/dashboard/order/ShowDetailsInfo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import useMediaQuery from '@/hooks/useMedia';


const AddOrder = () => {
    // Usage example
    const steps = [
        { value: '1', label: 'Customer info' },
        { value: '2', label: 'Items' },
        { value: '3', label: ' Fulfillment' },
        { value: '4', label: ' Fulfillment' },
    ];

    const { state } = useContext(SideBarOpenCloseContext);
    const isTablet = useMediaQuery('(max-width: 1024px)');

    return (
        <div className='w-full py-24 flex-1  flex flex-col justify-start gap-y-8   px-6'
        >
            <CustomHeading variant={"medium"} className='font-[100] text-black text-left'>Add an order            </CustomHeading>
            <CustomPageAlart variant={"small"} type={"info"} className='rounded-[2px] space-y-3 shadow-sm pr-4 so in a lot of e-commerce website when the checkout process happens we have generally these four steps the customer first enters there in four then the shipping info then they make the payment and then'>
                <div>
                    <CustomParagraph className='text-black pb-2' variant={"medium"} >Now available: new draft order experience    </CustomParagraph>
                    Looking for draft orders? Try out the new and improved draft order experience. Create an order for a storefront channel, support guest customers, custom shipping and all the other benefits with a new modern one-page flow. Note: creating an order with multiple shipping addresses is not yet live. Learn more
                    <Link className='text-blue-500 pl-2' href='#'>Learn more</Link>
                </div>
                <Button className=' bg-blue-500 h-9 text-white' variant="default">Take me there</Button>
            </CustomPageAlart>

            <CommonStepper options={steps} minWidth='800px' />

            {/* section 1 */}

            <CustomerInfoForm />
            <BillingInfoForm />

            {/* section 2 */}

            {/* <AddProductsForm />
            <ProductShowtable /> */}

            {/* section 3 */}
            <Fulfillment />
            {/* section 4 */}
            {/* <SectionFour /> */}

            <motion.div
                className="fixed bottom-0 right-0 w-full lg:w-auto z-40 flex items-center justify-end bg-white shadow-md px-4 py-2 gap-5 border-t-2 rounded-t-md border-gray-300"
                animate={{ width: isTablet ? "100vw" : state.sideBarOpen ? 'calc(100vw - 301px)' : 'calc(100vw - 61px)' }}
            >
                <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancel</Button>
                <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Save</Button>
            </motion.div>


        </div>
    )
}

export default AddOrder
