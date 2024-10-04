import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const AddProductsForm = () => {
    return (
        <div className='w-full flex flex-col gap-y-3 '>
            <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>Add products</CustomHeading>

            <div className='w-full bg-white px-24 py-8 '>
                <div className='flex items-center  gap-5'>
                    <Label htmlFor="search" className='whitespace-nowrap '>Search</Label>
                    <Input type="text" id="search" name="search" className='w-[400px] py-3' />
                    or <Button variant={"outline"} className='text-blue-500'>Browse products</Button>
                </div>
                <CustomParagraph className='text-blue-500 text-left' variant={"small"}>Add a custom product</CustomParagraph>
            </div>

        </div>
    )
}

export default AddProductsForm
