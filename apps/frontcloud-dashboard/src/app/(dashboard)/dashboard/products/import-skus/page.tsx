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
import useMediaQuery from '@/hooks/useMedia';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';

const ImportSKUs = () => {

    const form = useForm<any>({
        // resolver: zodResolver(AddProductFormSchema),
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
        <div className={`w-full flex flex-col gap-y-6  py-20 min-h-screen ${!state.sideBarOpen && "px-6"} `}>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'> Import product SKUs</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>

                    Import product SKUs
                    You can import SKU inventory levels from a CSV file on your computer. We recommend that you make a backup of your products before running a new import. Learn how to <Link href={"#"} className='text-blue-500 cursor-pointer'>Import Product Options</Link>
                </CustomParagraph>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>
                    <SectionLayout title='File details' className='space-y-6'>
                        <div className='space-y-3'>
                            <Label>Import File:</Label>
                            <CustomFormField
                                fieldType={FormFieldType.RADIOGROUP}
                                name={"importForm"}
                                control={control}
                                selectOptions={[
                                    { label: "Upload a CSV file from my computer (20 MB size limit) ", value: "upload" },
                                    { label: "Use a file already on the server", value: "existing" },
                                ]}
                            />
                            {
                                watchImportForm === 'upload' &&
                                <CustomFormField
                                    fieldType={FormFieldType.FILEUPLOAD}
                                    name={"images"}
                                    control={control}
                                    className='ring-1 ring-gray-300 rounded-md'
                                />
                            }
                        </div>

                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"updateExisting"}
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
                    {/* <motion.div
                        animate={{ width: isTablet ? "100vw" : state.sideBarOpen ? 'calc(100vw - 301px)' : 'calc(100vw - 61px)' }}
                        className="flex items-center justify-end bg-white shadow-md px-4 py-2 gap-5 border-t-2 rounded-t-md border-gray-300   fixed bottom-0 right-0 w-full z-50">
                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6 gap-2">Next <ChevronsRight size={18} /> </Button>
                    </motion.div> */}
                    <ActionBarLayout>
                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Next</Button>
                    </ActionBarLayout>
                </form>
            </Form>

        </div>
    )
}

export default ImportSKUs
