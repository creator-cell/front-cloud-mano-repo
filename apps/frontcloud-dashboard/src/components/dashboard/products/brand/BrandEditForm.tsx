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
import { useGetBrandByIdQuery, usePostBrandMutation, useUpdateBrandMutation } from '@/store/api/products/brand';
import { BrandData } from '@/store/api/products/types';
import brandSchema, { BrandFormValues } from '@/zod/edit-brand.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';


interface BrandEditFormProps {
    data?: BrandData;
    BrandID?: string;
}


const BrandEditForm = ({ data, BrandID }: BrandEditFormProps) => {


    const router = useRouter();

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        mode: "all",
        reValidateMode: "onChange",
        criteriaMode: "all"
    });

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (data) {
            setValue("BrandName", data.BrandName)
            setValue("BrandUrl", data.BrandUrl)
            setValue("Image", data.ImageURL)
            setValue("Seo.MetaTitle", data.MetaTitle)
            setValue("Seo.MetaKeywords", data.MetaKeywords ?? '')
            setValue("Seo.MetaDescription", data.MetaDescription ?? '')
            setValue("Seo.SearchKeywords", data.SearchKeywords ?? '')
        }

    }, [data])


    const [PostBrand, { isLoading }] = usePostBrandMutation()
    const [UpdateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation()


    console.log("errror", errors)
    const onSubmit = async (data: BrandFormValues) => {
        console.log("Form data:", data);

        const formData = new FormData();

        formData.append('BrandName', data.BrandName);
        formData.append('BrandUrl', data.BrandUrl);
        formData.append('Image', watch('Image'));
        formData.append('Seo.MetaTitle', data.Seo.MetaTitle);
        formData.append('Seo.MetaKeywords', data.Seo.MetaKeywords);
        formData.append('Seo.MetaDescription', data.Seo.MetaDescription);
        formData.append('Seo.SearchKeywords', data.Seo.SearchKeywords);

        const isUpdate = BrandID && data;

        const promise = isUpdate
            ? UpdateBrand({ BrandID: BrandID, body: formData }).unwrap()
            : PostBrand(formData).unwrap();

        toast.promise(promise, {
            loading: isUpdate ? 'Updating...' : 'Saving...',
            success: isUpdate ? 'Brand updated successfully' : 'Brand saved successfully',
            error: isUpdate ? 'Failed to update brand' : 'Failed to save brand',
        });

        try {
            await promise;
            router.replace('/dashboard/products/brands');
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full px-0">
                <SectionLayout title='Edit Brand ' className='w-full space-y-6 px-52'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"BrandName"}
                        control={control}
                        placeholder=' '
                        label='Name'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"BrandUrl"}
                        control={control}
                        placeholder=' '
                        label='URL'
                        className='ring-1 ring-gray-300'
                    />
                    <div className=' py-5 space-y-2'>
                        <CustomParagraph variant='medium' className=' text-black text-left'>Add Brand Image</CustomParagraph>
                        <div className='ring-1 ring-gray-200'>
                            <FileUpload
                                onChange={(files) => {
                                    setValue("Image", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                            />
                        </div>
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.MetaTitle"}
                        control={control}
                        placeholder=' '
                        label='Page Title'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.MetaKeywords"}
                        control={control}
                        placeholder=' '
                        label='Meta Keywords'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.MetaDescription"}
                        control={control}
                        placeholder=' '
                        label='Meta Description'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.SearchKeywords"}
                        control={control}
                        placeholder=' '
                        label='Search Keywords'
                        className='ring-1 ring-gray-300'
                    />

                    <ActionBarLayout>
                        <Button variant={"outline"} type='button' className='px-5' onClick={() => router.back()} >Calcle</Button>
                        <Button disabled={isLoading || isUpdating} className='px-4'>
                            {
                                BrandID ? 'Update' : 'Save'
                            }
                        </Button>
                    </ActionBarLayout>

                </SectionLayout>
            </form>
        </Form>
    )
}

export default BrandEditForm;
