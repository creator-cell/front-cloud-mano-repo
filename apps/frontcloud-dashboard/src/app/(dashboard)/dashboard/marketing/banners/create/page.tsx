"use client";
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Button } from '@/components/ui/button';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { useRouter } from 'next/navigation';
import bannerSchema, { bannerFormValues } from '@/zod/marketing/banner.schema';
import SectionLayout from '@/components/common/CommonSectionLayout';
import PageWrapper from '../../../_components/PageWrapper';

const CreateBanners = () => {
    const router = useRouter();


    const form = useForm<bannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            location: {
                label: 'homepage'
            },
            dateRange: {
                type: 'always'
            }
        },
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: bannerFormValues) => {
        console.log("Form data:", data);
    };

    return (
        <PageWrapper title='Create a banner' subTitle='Banners are a great way to advertise sales, display coupon codes and promotions, relay important information, and to add design elements such as images and video'>
            <SectionLayout title='Banner details' className='max-w-5xl mx-auto'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"name"}
                            control={control}
                            label='Name'
                            placeholder=' Name'
                            className='ring-1 ring-gray-300'
                        />

                        <div className='h-[25rem]'>
                            <CustomFormField
                                fieldType={FormFieldType.RICHTEXTEDITOR}
                                name={"content"}
                                control={control}
                                label='Content'
                            />
                        </div>
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"location.label"}
                            control={control}
                            label='Location'
                            selectOptions={[
                                { label: 'Homepage', value: 'homepage' },
                                { label: 'For a specific category', value: 'category' },
                                { label: 'For a specific brand', value: 'brand' },
                                { label: 'Search results page', value: 'search' }
                            ]}
                        />
                        <div className='pb-7'>
                            {
                                watch('location.label') === 'category' && (
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        name='location.value'
                                        control={control}
                                        label='Select category'
                                        defaultValue='category1'
                                        selectOptions={[
                                            { label: 'Category 1', value: 'category1' },
                                            { label: 'Category 2', value: 'category2' },
                                            { label: 'Category 3', value: 'category3' },
                                        ]}
                                    />
                                )
                            }
                            {
                                watch('location.label') === 'brand' && (
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        name='location.value'
                                        control={control}
                                        label='Select brand'
                                        defaultValue='brand1'
                                        selectOptions={[
                                            { label: 'Brand 1', value: 'brand1' },
                                            { label: 'Brand 2', value: 'brand2' },
                                            { label: 'Brand 3', value: 'brand3' },
                                        ]}
                                    />
                                )
                            }
                        </div>
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"dateRange.type"}
                            control={control}
                            label='Date range'
                            selectOptions={[
                                { label: 'Always show', value: 'always' },
                                { label: 'Show between dates', value: 'date' },
                            ]}
                        />
                        {
                            watch('dateRange.type') === 'date' && (
                                <div className='flex items-center gap-x-6'>
                                    <CustomFormField
                                        fieldType={FormFieldType.DATE_PICKER}
                                        name={"dateRange.startDate"}
                                        control={control}
                                        label='Start date'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.DATE_PICKER}
                                        name={"dateRange.endDate"}
                                        control={control}
                                        label='End date'
                                    />
                                </div>
                            )
                        }
                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"visible"}
                            control={control}
                            label='Visible'
                            placeholder='Yes, this banner should be visible on my web site'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"placement"}
                            control={control}
                            label='Placement'
                            selectOptions={[
                                { label: 'Top', value: 'Top' },
                                { label: 'Bottom', value: 'Bottom' },
                            ]}
                        />
                        <ActionBarLayout>
                            <Button variant={"outline"} type='button' className='px-5' onClick={() => router.back()} >Calcle</Button>
                            <Button className='px-4'>Save Brand</Button>
                        </ActionBarLayout>
                    </form>
                </Form>
            </SectionLayout>

        </PageWrapper >
    )
}

export default CreateBanners
