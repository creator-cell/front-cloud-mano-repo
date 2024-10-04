"use client";

import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label'
import { FormFieldType } from '@/enum/formTypes'
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { zodResolver } from '@hookform/resolvers/zod';
import customerSchema, { customerFormValues } from '@/zod/add-customer.schema';


const tabs: Array<{ value: string, title: string }> = [
    {
        value: "customer_details",
        title: "Customer details"
    },
    {
        value: "customer_address_book",
        title: "Customer address book"
    }
]

const AddCustomers = () => {

    const form = useForm<customerFormValues>({
        resolver: zodResolver(customerSchema),
        mode: "onBlur",
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const onSubmit = (data: customerFormValues) => {
        console.log("Form data:", data);
    };

    const { state } = useContext(SideBarOpenCloseContext);


    const [activeTab, setActiveTab] = useState("customer_details");

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        console.log("Active Tab:", value);
    };



    return (
        <div className={`w-full flex flex-col gap-y-6  py-20 min-h-screen ${!state.sideBarOpen && "px-6"} `}>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Add customer</CustomHeading>
            </div>

            <Tabs defaultValue="customer_details"
                onValueChange={handleTabChange}
                className="w-full space-y-6" >

                <TabsList className="flex gap-x-6 relative w-full items-center justify-start">
                    {tabs.map((tab, idx) => {
                        const isActive = activeTab === tab.value;
                        return (
                            <TabsTrigger
                                key={tab.title}
                                value={tab.value}
                                className={"relative px-4 py-2 rounded-full"}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="clickedbutton"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                        className={"absolute inset-0 bg-white dark:bg-zinc-800 rounded-md "}
                                    />
                                )}

                                <span className={`relative block  dark:text-white  ${isActive ? "text-black" : "text-gray-500"}`}>
                                    {tab.title}
                                </span>
                            </TabsTrigger>
                        )
                    }
                    )}
                </TabsList>


                <TabsContent value={activeTab} className=' p-4 '>
                    {
                        activeTab === 'customer_details' &&
                        <SectionLayout title='Customer details'>

                            <div className='w-full sm:px-8 px-3 py-6 '>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"firstName"}
                                            control={control}
                                            placeholder='First Name'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"lastName"}
                                            control={control}
                                            placeholder='Last Name'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"companyName"}
                                            control={control}
                                            placeholder='Company name'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"phone"}
                                            control={control}
                                            placeholder='Phone Number'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"email"}
                                            control={control}
                                            placeholder='Email Address'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"password"}
                                            type='password'
                                            control={form.control}
                                            placeholder='******'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"confirmPassword"}
                                            type='text'
                                            control={form.control}
                                            placeholder='confirmPassword'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"storeCredit"}
                                            control={control}
                                            placeholder='$ 0.0'
                                            className='ring-1 ring-gray-300'
                                        />
                                        <CustomFormField
                                            control={control}
                                            fieldType={FormFieldType.SELECT}
                                            name="customerGroup"
                                            placeholder="Customer group"
                                            className=' focus:ring-0  '
                                            selectOptions={[
                                                { label: 'grou 1 ', value: 'group 1' },
                                                { label: 'group2', value: 'group 2' },
                                            ]}
                                        />
                                        <CustomFormField
                                            control={control}
                                            fieldType={FormFieldType.SELECT}
                                            name="receiveACSReviewEmails"
                                            placeholder="Yes"
                                            className=' focus:ring-0  '
                                            selectOptions={[
                                                { label: 'Yes', value: 'yes' },
                                                { label: 'No', value: 'no' },
                                            ]}
                                            label='Receive ACS review emails'
                                        />
                                        <CustomFormField
                                            control={control}
                                            fieldType={FormFieldType.SELECT}
                                            name="forcePasswordReset"
                                            placeholder="Yes"
                                            className=' focus:ring-0  '
                                            selectOptions={[
                                                { label: 'Yes', value: 'yes' },
                                                { label: 'No', value: 'no' },
                                            ]}
                                            label='Force password reset on next login '
                                        />
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"taxExemptCode"}
                                            control={control}
                                            placeholder='Tax exempt code'
                                            className='ring-1 ring-gray-300'
                                            label='Tax exempt code'
                                        />

                                        <div className='w-full flex items-center justify-end gap-x-3 pt-7'>
                                            <Button variant={"outline"} className=' text-[15px] w-fit rounded-[5px] py-4'>Cancle</Button>
                                            <Button type="submit" variant={"default"} className='w-fit border-none bg-primary text-white text-[15px] rounded-[5px] py-4'>Add Customer</Button>

                                        </div>

                                    </form>
                                </Form>
                            </div>
                        </SectionLayout>
                    }
                    {
                        activeTab === 'customer_address_book' &&
                        <div>
                            nnn
                        </div>
                    }
                </TabsContent>

            </Tabs>


        </div >
    )
}

export default AddCustomers

