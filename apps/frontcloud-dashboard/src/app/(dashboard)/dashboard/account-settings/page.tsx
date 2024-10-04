import React from 'react'
import PageWrapper from '../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { Button } from '@/components/ui/button'
import { CirclePlus, PencilLine } from 'lucide-react'
import { Label } from '@/components/ui/label'

const AccountDetails = () => {
    return (
        <PageWrapper childrenClassName='space-y-7'>
            <SectionLayout title='Account Information'>
                <Button variant={"outline"} className='text-primary self-end'> <PencilLine size={14} className='mr-2' /> Edit</Button>
                <div className='flex flex-col items-start justify-center w-full gap-y-3'>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Company Name </Label>
                        <Label>: &nbsp;userdashboard</Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>Support PIN</Label>
                        <Label>:  &nbsp;35705727</Label>
                    </div>
                </div>

            </SectionLayout>
            <SectionLayout title='VAT Information (optional) '>
                <Button variant={"outline"} className='text-primary self-end'> <PencilLine size={14} className='mr-2' /> Edit</Button>
                <div className='flex flex-col items-start justify-center w-full gap-y-3'>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'>VAT Number </Label>
                        <Label>: &nbsp;</Label>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Label className='font-semibold w-32'> Issuing Member State</Label>
                        <Label>:  &nbsp;</Label>
                    </div>
                </div>

            </SectionLayout>
            <SectionLayout title='Contacts ' className='space-y-6'>
                <Button variant={"outline"} className='text-primary self-end'> <CirclePlus size={14} className='mr-2' /> Add Contacts</Button>
                <div className='flex flex-col items-start justify-center w-full gap-y-3'>
                    <div className='flex items-center  w-full justify-between'>
                        <Label className='font-semibold w-32'>sumon gorai </Label>
                        <Label> &nbsp; 	Primary</Label>
                        <Button variant={"outline"} className='text-primary self-end'> <PencilLine size={14} className='mr-2' /> Edit</Button>

                    </div>
                    <div className='flex items-center   w-full justify-between'>
                        <Label className='font-semibold w-32'>sumon gorai</Label>
                        <Label> &nbsp;Billing</Label>
                        <Button variant={"outline"} className='text-primary self-end'> <PencilLine size={14} className='mr-2' /> Edit</Button>

                    </div>
                </div>

            </SectionLayout>

        </PageWrapper>
    )
}

export default AccountDetails
