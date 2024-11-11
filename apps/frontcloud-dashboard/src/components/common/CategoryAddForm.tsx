"use client";

import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import SectionLayout from '@/components/common/CommonSectionLayout'
import CustomFormField from '@/components/common/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form'
import { FormFieldType } from '@/enum/formTypes';
import { usePostCategoryMutation, usePostSubCategoryMutation, useUpdateCategoryMutation } from '@/store/api/products/category';
import { ProductCategoryType } from '@/store/api/products/types/category-types';
import addProductCategorySchema, { AddProductCategoryFormValues } from '@/zod/add-product-category.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';

interface CategoryAddFormProps {
    hasParentCategory?: boolean;
    parentCategoryOptions?: Array<{ label: string, value: string }>,
    formValues?: ProductCategoryType

}

const CategoryAddForm: React.FC<CategoryAddFormProps> = ({
    hasParentCategory,
    parentCategoryOptions,
    formValues
}) => {
    console.log("🚀 ~ formValues:", formValues)

    const router = useRouter();

    const form = useForm<AddProductCategoryFormValues>({
        resolver: zodResolver(addProductCategorySchema),
        mode: "all",
        defaultValues: formValues && {
            categoryName: formValues.CategoryName,
            visibleInMenu: formValues.VisibleInMenu ? "true" : "false",
            description: formValues.Description,
        }
    });




    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;



    const [AddCategory, { isLoading }] = usePostCategoryMutation()
    const [AddSubCategory, { isLoading: isSubCategoryLoading }] = usePostSubCategoryMutation()
    const [UpdateCategory, { isLoading: isUpdateLoading }] = useUpdateCategoryMutation()


    console.log("errror", errors)
    const onSubmit = async (data: AddProductCategoryFormValues) => {
        console.log("Form data:", data);
        try {
            if (hasParentCategory) {
                if (!data.categoryId) {
                    toast.error("Please select a parent category")
                    return;
                }
                const { categoryName: subCategoryName, categoryId, ...rest } = data;
                const modifiedData = { subCategoryName, categoryId: parseInt(categoryId), ...rest };

                const result = await AddSubCategory(modifiedData).unwrap().then((res) => {
                    console.log("Result", res)
                    toast.success("Sub Category created successfully")
                    router.push('/dashboard/products/product-subCategories')
                });
            } else {
                const { categoryId, ...rest } = data;
                console.log("Result", rest)

                const result = await AddCategory(rest).unwrap();
                console.log("Result", result);
                toast.success("Category created successfully");
                router.push('dashboard/products/product-categories');
            }
        } catch (error) {
            console.log("Error", error)
            toast.error("Error in creating category")
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full px-0">
                <SectionLayout title='Category Details ' className='w-full space-y-6 px-52'>
                    {
                        hasParentCategory && (
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                name={"categoryId"}
                                control={control}
                                // defaultValue={formValues?.categoryId}
                                selectOptions={parentCategoryOptions}
                                label='Select Parent Category'
                                className='ring-1 ring-gray-300'
                            />
                        )
                    }
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"categoryName"}
                        control={control}
                        placeholder=' '
                        label='Name'
                        className='ring-1 ring-gray-300'
                    />
                    {/* <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"url"}
                        control={control}
                        placeholder=' '
                        label='URL'
                        className='ring-1 ring-gray-300'
                    /> */}
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
                    {/* <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"sort_order"}
                        control={control}
                        placeholder=' '
                        label='Sort Order'
                        className='ring-1 ring-gray-300'
                    /> */}
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        name={"visibleInMenu"}
                        control={control}
                        defaultValue='true'
                        selectOptions={[
                            { label: 'Visible', value: "true" },
                            { label: 'Hidden', value: "false" }
                        ]}
                        label='Visible in Menu'
                        className='ring-1 ring-gray-300'
                    />
                    {/* <div className=' py-5 space-y-2'>
                        <CustomParagraph variant='medium' className=' text-black text-left'>Category Image</CustomParagraph>
                        <div className='ring-1 ring-gray-200'>
                            <FileUpload
                                onChange={(files) => {
                                    setValue("images", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                            />
                        </div>
                    </div> */}

                </SectionLayout>
                <SectionLayout title='Search Engine Optimization' className='space-y-4 px-52 '>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"seo.metaTitle"}
                        control={control}
                        placeholder=' '
                        label='Page Title'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"seo.metaKeywords"}
                        control={control}
                        placeholder=' '
                        label='Meta Keywords'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"seo.metaDescription"}
                        control={control}
                        placeholder=' '
                        label='Meta Description'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"seo.searchKeywords"}
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
