import React from 'react'
import PageWrapper from '../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PencilLine } from 'lucide-react'

const StoreSettings = () => {
    return (
        <PageWrapper childrenClassName='space-y-6'>

            {/* Plan summary */}
            <SectionLayout title='Plan summary' className='pr-5'>
                <Button className=' self-end'>  Upgrade</Button>
                <div className='flex flex-col items-start justify-center w-full gap-y-3'>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Store plan </Label>
                        <Label>: &nbsp;Trial
                            <span className='ml-5 text-xs text-gray-400'>(Your trial will expire in 14 days on October 8, 2024.)</span>
                        </Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Price</Label>
                        <Label>:  &nbsp;$0.00 USD </Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Sales volume
                        </Label>
                        <Label>:  &nbsp;N/A
                            <span className='ml-5 text-xs text-gray-400'>(Plan limits (trailing 12 months) )</span>

                        </Label>
                    </div>
                </div>

            </SectionLayout>


            {/* Store history */}
            <SectionLayout title='Store history' className='pr-5'>
                <Button className=' self-end'>  Upgrade</Button>
                <div className='flex flex-col items-start justify-center w-full gap-y-3'>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Sales volume</Label>
                        <Label>: &nbsp;$0.00 USD
                            <span className='ml-5 text-xs text-gray-400'>(Trailing 12 months (updated September 01, 2024))</span>
                        </Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Order count</Label>
                        <Label>:  &nbsp;0 orders </Label>
                    </div>
                </div>
                <Button variant={"link"} className=' self-start px-0'>  View Invoices</Button>

            </SectionLayout>

            {/* Details */}

            <SectionLayout title='Details' className='pr-5'>
                <Button className=' self-end'>  Change Domain</Button>
                <div className='flex flex-col items-start justify-center w-full gap-y-3'>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-52'>Status</Label>
                        <Label>: &nbsp;Active
                        </Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-52'>Current domain</Label>
                        <Label>:  &nbsp;userdashboard.mybigcommerce.com</Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-52'>Permanent address</Label>
                        <Label>:  &nbsp;https://store-di4zpinp5w.mybigcommerce.com</Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-52'>Control panel</Label>
                        <Label>:  &nbsp;https://store-di4zpinp5w.mybigcommerce.com/admin</Label>
                    </div>
                </div>


            </SectionLayout>

        </PageWrapper>
    )
}

export default StoreSettings
