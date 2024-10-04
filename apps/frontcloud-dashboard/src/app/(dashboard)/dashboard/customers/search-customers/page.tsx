
"use client";

import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import searchSchema, { searchFormValues } from '@/zod/search-customer.schema';
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldType } from '@/enum/formTypes'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';



const SearchCustomers = () => {

    const form = useForm<searchFormValues>({
        resolver: zodResolver(searchSchema),
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const onSubmit = (data: searchFormValues) => {
        console.log("Form data:", data);
    };

    const { state } = useContext(SideBarOpenCloseContext);



    return (
        <div className={`w-full flex flex-col gap-y-6  py-20 min-h-screen ${!state.sideBarOpen && "px-6"} `}>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Search customers</CustomHeading>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                    <SectionLayout title='Advanced search (optional)'>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"keywords"}
                            control={control}
                            placeholder='robert, smith, john'
                            label='Search keywords'
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"startsWith"}
                            control={control}
                            placeholder='R , p , a'
                            label='Starts with'
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"phone"}
                            control={control}
                            placeholder='Phone'
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
                            fieldType={FormFieldType.SELECT}
                            name={"country"}
                            control={control}
                            placeholder='Selct Country'
                            selectOptions={[
                                { label: 'USA', value: 'USA' },
                                { label: 'Canada', value: 'Canada' },
                                { label: 'India', value: 'India' },
                                { label: 'Australia', value: 'Australia' },

                            ]}
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"stateProvince"}
                            type='text'
                            control={form.control}
                            placeholder="State/Province"
                            className='ring-1 ring-gray-300'
                        />

                    </SectionLayout>


                    <SectionLayout title='Search by range (optional)'>
                        <div className='w-full flex flex-col gap-y-4'>
                            <div className='flex items-center gap-6 max-w-[600px]'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-52 text-gray-500'> Customer ID	</Label>
                                <div className='flex items-center gap-6'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"customerIDRange.from"}
                                        control={form.control}
                                        placeholder=" "
                                        className='ring-1 ring-gray-300'
                                    />
                                    <span className='text-gray-500'>To</span>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"customerIDRange.to"}
                                        control={form.control}
                                        placeholder=" "
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-6 max-w-[600px]'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-52 text-gray-500'>  Number of orders	</Label>
                                <div className='flex items-center gap-6'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"numberOfOrders.from"}
                                        control={form.control}
                                        placeholder=" "
                                        className='ring-1 ring-gray-300'
                                    />
                                    <span className='text-gray-500'>To</span>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"numberOfOrders.to"}
                                        control={form.control}
                                        placeholder=" "
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-6 max-w-[600px]'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-52 text-gray-500'> Store credit	</Label>
                                <div className='flex items-center gap-6'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"storeCredit.from"}
                                        control={form.control}
                                        placeholder=" "
                                        className='ring-1 ring-gray-300'
                                    />
                                    <span className='text-gray-500'>To</span>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"storeCredit.to"}
                                        control={form.control}
                                        placeholder=" "
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                            </div>
                        </div>

                    </SectionLayout>


                    <SectionLayout title='Search by date (optional)'>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            name={"dateJoined.selection"}
                            control={control}
                            placeholder='Selct date'
                            selectOptions={[
                                { label: 'Today', value: '1day' },
                                { label: 'Yesterday', value: '2day' },
                                { label: 'Last 7 days', value: '7day' },
                                { label: 'Last 30 days', value: '30day' },
                                { label: 'Last 90 days', value: '90day' },
                                { label: 'Last 180 days', value: '180day' },
                                { label: 'Last 365 days', value: '365day' },
                                { label: 'Custom value', value: 'custom' },
                            ]}
                            className='ring-1 ring-gray-300'
                            label='Date joined'
                        />
                        {
                            watch('dateJoined')?.selection === 'custom' && (
                                <div className='flex items-center gap-6 max-w-[600px]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"dateJoined.from"}
                                        control={form.control}
                                        placeholder='YYYY-MM-DD'
                                        className='ring-1 ring-gray-300'
                                    />
                                    <span className='text-gray-500'>To</span>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"dateJoined.to"}
                                        control={form.control}
                                        placeholder="YYYY-MM-DD"
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                            )
                        }
                    </SectionLayout>


                    <SectionLayout title='Search by group (optional)'>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            name={"customerGroup"}
                            control={control}
                            placeholder='Customer group'
                            label='Customer group'
                            selectOptions={[
                                { label: 'group 1', value: 'group1' },
                                { label: 'group 2', value: 'group2' },
                                { label: 'group 3', value: 'group3' },
                                { label: 'group 4', value: 'group4' },
                            ]}
                            className='ring-1 ring-gray-300'
                        />
                    </SectionLayout>

                    <SectionLayout title='Sort Order' >
                        <div className="grid w-full grid-cols-2 gap-x-14">
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                name={"sortOrder.sortBy"}
                                control={control}
                                placeholder='Select Order'
                                selectOptions={[
                                    { label: 'ID', value: 'id' },
                                    { label: 'Name', value: 'name' },
                                    { label: 'Email', value: 'email' },
                                    { label: 'Phone', value: 'phone' },
                                    { label: 'Number of orders', value: 'numberOfOrders' },
                                    { label: 'Store credit', value: 'storeCredit' },
                                    { label: 'Date joined', value: 'dateJoined' },
                                ]}
                                className='ring-1 ring-gray-300'
                                label='Customer'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                name={"sortOrder.order"}
                                control={control}
                                placeholder='Select Order'
                                selectOptions={[
                                    { label: 'Ascending', value: 'asc' },
                                    { label: 'Descending', value: 'desc' },
                                ]}
                                className='ring-1 ring-gray-300'
                                label='in'
                            />
                        </div>
                    </SectionLayout>

                    <ActionBarLayout >
                        <Button variant="ghost" className="text-gray-500 h-9 px-6 py-5">Cancle</Button>
                        <Button variant="default" type='submit' className="text-white capitalize tracking-wider h-9 px-6 py-5 gap-2">Search Customers </Button>
                    </ActionBarLayout>
                </form>
            </Form>
        </div>
    )
}

export default SearchCustomers





