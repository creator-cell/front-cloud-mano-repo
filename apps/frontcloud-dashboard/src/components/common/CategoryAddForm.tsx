"use client";

import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import SectionLayout from '@/components/common/CommonSectionLayout';
import CustomFormField from '@/components/common/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldType } from '@/enum/formTypes';
import { usePostCategoryMutation, useUpdateCategoryMutation } from '@/store/api/products/category';
import { usePostSubCategoryMutation, useUpdateSubCategoryMutation } from '@/store/api/products/sub-category';
import { ProductCategoryType } from '@/store/api/products/types/category-types';
import { SubCategoryType } from '@/store/api/products/types/sub-category-types';
import addProductCategorySchema, { AddProductCategoryFormValues } from '@/zod/add-product-category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CategoryAddFormProps {
    hasParentCategory?: boolean;
    parentCategoryOptions?: Array<{ label: string, value: string }>;
    formValues?: ProductCategoryType;
    formValuesSubCategory?: SubCategoryType;
    categoryID?: string;
}

const CategoryAddForm: React.FC<CategoryAddFormProps> = ({
    hasParentCategory,
    parentCategoryOptions,
    formValues,
    formValuesSubCategory,
    categoryID
}) => {
    const router = useRouter();

    // Determine if this is an update or create action based on form values and category ID
    const isUpdate = (formValues || formValuesSubCategory) && categoryID;


    // Default values based on category or subcategory
    const getDefaultValues = (formValues?: ProductCategoryType, formValuesSubCategory?: SubCategoryType) => {
        if (formValues) {
            return {
                categoryName: formValues.CategoryName,
                visibleInMenu: formValues.VisibleInMenu ? "true" : "false" as any,
                description: formValues.Description
            };
        }

        if (formValuesSubCategory) {
            return {
                categoryName: formValuesSubCategory.SubCategoryName,
                visibleInMenu: formValuesSubCategory.VisibleInMenu ? "true" : "false" as any,
                description: formValuesSubCategory.Description,
                categoryId: formValuesSubCategory.CategoryID?.toString()
            };
        }

        return {};
    };

    const form = useForm<AddProductCategoryFormValues>({
        resolver: zodResolver(addProductCategorySchema),
        mode: "all",
        defaultValues: getDefaultValues(formValues, formValuesSubCategory)
    });

    const { register, control, setValue, formState: { errors } } = form;

    // Mutations
    const [AddCategory, { isLoading }] = usePostCategoryMutation()
    const [AddSubCategory, { isLoading: isSubCategoryLoading }] = usePostSubCategoryMutation()
    const [UpdateCategory, { isLoading: isUpdateLoading }] = useUpdateCategoryMutation()
    const [UpdateSubCategory, { isLoading: isUpdateSubLoading }] = useUpdateSubCategoryMutation()

    const handleSubmitAction = async (data: AddProductCategoryFormValues) => {
        try {
            const modifiedData = prepareDataForMutation(data);

            // Submit the appropriate action based on the category state (parent or subcategory)
            if (hasParentCategory) {
                await handleSubCategorySubmit(modifiedData);
            } else {
                await handleCategorySubmit(modifiedData);
            }
        } catch (error) {
            toast.error(isUpdate ? "Error updating category" : "Error creating category");
        }
    };

    const handleSubCategorySubmit = async (modifiedData: any) => {
        if (isUpdate) {
            await UpdateSubCategory(modifiedData).unwrap();
            toast.success("Sub Category updated successfully");
            router.replace('/dashboard/products/product-subCategories');
        } else {
            await AddSubCategory(modifiedData).unwrap();
            toast.success("Sub Category created successfully");
            router.replace('/dashboard/products/product-subCategories');
        }
    };

    const handleCategorySubmit = async (modifiedData: any) => {
        if (isUpdate) {
            await UpdateCategory(modifiedData).unwrap();
            toast.success("Category updated successfully");
            router.replace('/dashboard/products/product-categories');
        } else {
            await AddCategory(modifiedData).unwrap();
            toast.success("Category created successfully");
            router.replace('/dashboard/products/product-categories');
        }
    };

    // Prepare form data for mutation based on the current category
    const prepareDataForMutation = (data: AddProductCategoryFormValues) => {
        const { categoryName, categoryId, ...rest } = data;
        return {
            CategoryID: categoryID || '',
            body: {
                subCategoryName: categoryName,
                categoryId: parseInt(categoryId || '', 10),
                ...rest
            }
        };
    };



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitAction)} className="space-y-6 w-full px-0">
                <SectionLayout title='Category Details' className='w-full space-y-6 px-52'>
                    {hasParentCategory && (
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            name="categoryId"
                            control={control}
                            selectOptions={parentCategoryOptions}
                            label="Select Parent Category"
                            className="ring-1 ring-gray-300"
                        />
                    )}
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name="categoryName"
                        control={control}
                        placeholder=" "
                        label="Name"
                        className="ring-1 ring-gray-300"
                    />
                    <div className="h-[25rem]">
                        <CustomFormField
                            fieldType={FormFieldType.RICHTEXTEDITOR}
                            name="description"
                            control={control}
                            placeholder=" "
                            label="Description"
                        />
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        name="visibleInMenu"
                        control={control}
                        defaultValue="true"
                        selectOptions={[
                            { label: "Visible", value: "true" },
                            { label: "Hidden", value: "false" }
                        ]}
                        label="Visible in Menu"
                        className="ring-1 ring-gray-300"
                    />
                </SectionLayout>

                <SectionLayout title="Search Engine Optimization" className="space-y-4 px-52">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name="seo.metaTitle"
                        control={control}
                        placeholder=" "
                        label="Page Title"
                        className="ring-1 ring-gray-300"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name="seo.metaKeywords"
                        control={control}
                        placeholder=" "
                        label="Meta Keywords"
                        className="ring-1 ring-gray-300"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name="seo.metaDescription"
                        control={control}
                        placeholder=" "
                        label="Meta Description"
                        className="ring-1 ring-gray-300"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name="seo.searchKeywords"
                        control={control}
                        placeholder=" "
                        label="Search Keywords"
                        className="ring-1 ring-gray-300"
                    />
                    <ActionBarLayout>
                        <Button
                            variant="outline"
                            type="button"
                            className="px-5"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="px-4"
                            disabled={isLoading || isSubCategoryLoading || isUpdateLoading || isUpdateSubLoading}
                        >
                            {isUpdate ? "Update Category" : "Save Category"}
                        </Button>
                    </ActionBarLayout>
                </SectionLayout>
            </form>
        </Form>
    );
};

export default CategoryAddForm;
