"use client";
import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label'
import { FormFieldType } from '@/enum/formTypes'
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';

import Link from 'next/link'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import importCustomerSchema, { importCustomerFormValues } from '@/zod/import-customer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useMediaQuery from '@/hooks/useMedia';

const ImportCustomers = () => {

    const form = useForm<importCustomerFormValues>({
        resolver: zodResolver(importCustomerSchema),
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const watchImportForm = watch('importForm')

    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };

    const { state } = useContext(SideBarOpenCloseContext);
    const isTablet = useMediaQuery('(max-width: 768px)');
    return (
        <div className={` flex flex-col gap-y-6  py-20 min-h-screen max-w-5xl ${!state.sideBarOpen && "px-6"} `}>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'> Import customers</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>
                    You can import customers to your store from a csv file. We recommend you make a backup of your customers before running a new import. Learn more   </CustomParagraph>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6  '>

                    <SectionLayout title='Import details'>
                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"fileTemplate"}
                            control={control}
                            placeholder="File was exported using the 'Bulk Edit' template"
                            className='w-6 h-6'
                        />
                        {
                            !watch("fileTemplate") &&
                            <CustomFormField
                                fieldType={FormFieldType.CHECKBOX}
                                name={"overrideRecords"}
                                control={control}
                                placeholder="Override existing records"
                                className='w-6 h-6'
                            />
                        }

                    </SectionLayout>

                    <SectionLayout title='File details' className='space-y-6'>
                        <div className='space-y-3'>
                            <CustomFormField
                                fieldType={FormFieldType.RADIOGROUP}
                                name={"importForm"}
                                control={control}
                                defaultValue='upload'
                                selectOptions={[
                                    { label: "Upload a CSV file from my computer (20 MB size limit) ", value: "upload" },
                                    { label: "Use a file already on the server", value: "existing" },
                                ]}
                                label='Import form'
                            />
                            {
                                watchImportForm === 'upload' &&
                                <CustomFormField
                                    fieldType={FormFieldType.FILEUPLOAD}
                                    name={"uploadFile"}
                                    control={control}
                                    className='ring-1 ring-gray-300 rounded-md'
                                />
                            }
                        </div>

                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"containsHeaders"}
                            control={control}
                            placeholder='This file contains headers'
                        />

                        <div className='flex items-center justify-between w-96'>
                            <Label className='w-40 whitespace-nowrap'> Field separator:</Label>
                            <div className='flex-1'>
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    name={"fieldSeparator"}
                                    control={control}
                                    selectOptions={[
                                        { label: "Comma", value: "," },
                                        { label: "Semicolon", value: ";" },
                                        { label: "Tab", value: "tab" },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-between w-96'>
                            <Label className='w-40'> Field enclosure:</Label>
                            <div className='flex-1'>
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    name={"fieldEnclosure"}
                                    control={control}
                                    selectOptions={[
                                        { label: "Double quotes", value: '"' },
                                        { label: "Single quotes", value: "'" },
                                    ]}
                                />
                            </div>
                        </div>

                    </SectionLayout>

                    <ActionBarLayout>
                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6 gap-2">Next <ChevronsRight size={18} /> </Button>
                    </ActionBarLayout>
                </form>
            </Form>

        </div>
    )
}

export default ImportCustomers





