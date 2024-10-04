"use client";

import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField';
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Form } from '@/components/ui/form'
import { FileType } from '@/enum/fileTypes';
import { FormFieldType } from '@/enum/formTypes';
import addProductCategorySchema, { AddProductCategoryFormValues } from '@/zod/add-product-category.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'

interface CategoryAddFormProps {
    hasParentCategory?: boolean;
    parentCategoryOptions?: Array<{ label: string, value: string }>

}

const CategoryAddForm: React.FC<CategoryAddFormProps> = ({
    hasParentCategory,
    parentCategoryOptions
}) => {

    const router = useRouter();

    const form = useForm<AddProductCategoryFormValues>({
        resolver: zodResolver(addProductCategorySchema),
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full px-0">
                <SectionLayout title='Category Details ' className='w-full space-y-6 px-52'>
                    {
                        hasParentCategory && (
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                name={"parentCategory"}
                                control={control}
                                selectOptions={parentCategoryOptions}
                                label='Select Parent Category'
                                className='ring-1 ring-gray-300'
                            />
                        )
                    }
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"name"}
                        control={control}
                        placeholder=' '
                        label='Name'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"url"}
                        control={control}
                        placeholder=' '
                        label='URL'
                        className='ring-1 ring-gray-300'
                    />
                    <div className=' h-[25rem]'>
                        <CustomFormField
                            fieldType={FormFieldType.RICHTEXTEDITOR}
                            name={"description"}
                            control={control}
                            placeholder=' '
                            label='Description'
                            className=''
                        />
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"sort_order"}
                        control={control}
                        placeholder=' '
                        label='Sort Order'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        name={"visibility"}
                        control={control}
                        defaultValue='visible'
                        selectOptions={[
                            { label: 'Visible', value: 'visible' },
                            { label: 'Hidden', value: 'hidden' }
                        ]}
                        label='Visible in Menu'
                        className='ring-1 ring-gray-300'
                    />
                    <div className=' py-5 space-y-2'>
                        <CustomParagraph variant='medium' className=' text-black text-left'>Category Image</CustomParagraph>
                        <div className='ring-1 ring-gray-200'>
                            <FileUpload
                                onChange={(files) => {
                                    setValue("images", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                            />
                        </div>
                    </div>

                </SectionLayout>
                <SectionLayout title='Search Engine Optimization' className='space-y-4 px-52 '>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"pageTitle"}
                        control={control}
                        placeholder=' '
                        label='Page Title'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"metaKeywords"}
                        control={control}
                        placeholder=' '
                        label='Meta Keywords'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"metaDescription"}
                        control={control}
                        placeholder=' '
                        label='Meta Description'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"searchKeywords"}
                        control={control}
                        placeholder=' '
                        label='Search Keywords'
                        className='ring-1 ring-gray-300'
                    />

                    <ActionBarLayout>
                        <Button variant={"outline"} type='button' className='px-5' onClick={() => router.back()} >Calcle</Button>
                        <Button className='px-4'>Save Category</Button>
                    </ActionBarLayout>

                </SectionLayout>
            </form>
        </Form>
    )
}

export default CategoryAddForm
