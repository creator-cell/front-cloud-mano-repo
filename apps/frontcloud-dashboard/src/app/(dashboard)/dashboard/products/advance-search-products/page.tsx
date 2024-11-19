"use client";
import SectionLayout from '@/components/common/CommonSectionLayout';
import { CustomHeading } from '@/components/custom/CustomHeading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

import { Button } from '@/components/ui/button';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { useForm } from 'react-hook-form';
import AdvanceSearchSchema, { AdvanceSearchFormValues } from '@/zod/advance-search.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchProduct = () => {

    const form = useForm<AdvanceSearchFormValues>({
        resolver: zodResolver(AdvanceSearchSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        criteriaMode: "all",
        progressive: true
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    console.log("errror", errors)
    const onSubmit = (data: AdvanceSearchFormValues) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        // Map form data to query parameters
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                // Handle nested objects (e.g., priceRange)
                Object.entries(value).forEach(([subKey, subValue]) => {
                    if (subValue) {
                        newSearchParams.set(`${key}.${subKey}`, String(subValue));
                    }
                });
            } else if (value) {
                newSearchParams.set(key, String(value));
            } else {
                newSearchParams.delete(key); // Remove empty or null values
            }
        });

        // Update the URL
        router.push(`/dashboard/products?${newSearchParams.toString()}`);
    };

    return (
        <div className='w-full flex flex-col gap-y-6 py-20 '>
            <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>Search Products</CustomHeading>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <SectionLayout title='Advanced Search' >
                        <div className='w-full flex flex-col gap-y-4'>
                            <div className='flex items-center gap-6 max-w-xl'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-52 text-gray-500'>First Name</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={control}
                                        name="firstName"
                                        placeholder='First Name'
                                        className='w-full ring-1 ring-gray-300'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'>Starts With the Letter:</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={control}
                                        name="startsWithLetter"
                                        selectOptions={[
                                            { label: "A", value: "A" },
                                            { label: "B", value: "B" },
                                            { label: "C", value: "C" },
                                            { label: "D", value: "D" },
                                            { label: "E", value: "E" },
                                            { label: "F", value: "F" },
                                            { label: "G", value: "G" },
                                            { label: "H", value: "H" },
                                            { label: "I", value: "I" },
                                            { label: "J", value: "J" },
                                        ]}
                                        className='w-full'
                                        placeholder='Any Letter'

                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'> Brand Name:	</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={control}
                                        name="brandName"
                                        selectOptions={[
                                            { label: "FNO", value: "FNO" },
                                            { label: "USA", value: "USA" },
                                            { label: "FCS", value: "FCS" },
                                        ]}
                                        className='w-full'
                                        placeholder='Select Brand'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 max-w-xl">
                            <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'>   Categories:</Label>
                            <div className='w-[23rem]'>
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    control={control}
                                    name="category"
                                    selectOptions={[
                                        { label: "FNO", value: "FNO" },
                                        { label: "USA", value: "USA" },
                                        { label: "FCS", value: "FCS" },
                                    ]}
                                    className='w-full'
                                    placeholder='Choose Categories'
                                />
                            </div>
                        </div>
                    </SectionLayout>

                    <SectionLayout title='Search by range (optional)'>
                        <div className='w-full flex flex-col gap-y-8'>
                            <div className='flex items-center gap-6 max-w-2xl'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-32 text-gray-500'> Price Range:	</Label>
                                <div className='flex items-center gap-6 w-[34rem]'>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"priceRange.from"}
                                            control={form.control}
                                            placeholder="$"
                                            className='ring-1 ring-gray-300'
                                        />
                                    </div>
                                    <span className='text-gray-500'>To</span>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"priceRange.to"}
                                            control={form.control}
                                            placeholder="$ "
                                            className='ring-1 ring-gray-300'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-6 max-w-2xl'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-32 text-gray-500'>   Quantity Sold:	</Label>
                                <div className='flex items-center gap-6 w-[34rem]'>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"quantitySold.from"}
                                            control={form.control}
                                            placeholder=" "
                                            className='ring-1 ring-gray-300'
                                        />
                                    </div>
                                    <span className='text-gray-500'>To</span>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"quantitySold.to"}
                                            control={form.control}
                                            placeholder=" "
                                            className='ring-1 ring-gray-300'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-6 max-w-2xl'>
                                <Label htmlFor="firstName" className='whitespace-nowrap w-32 text-gray-500'> Inventory Level:	</Label>
                                <div className='flex items-center gap-6 w-[34rem]'>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"inventoryLevel.from"}
                                            control={form.control}
                                            placeholder=" "
                                            className='ring-1 ring-gray-300'
                                        />
                                    </div>
                                    <span className='text-gray-500'>To</span>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"inventoryLevel.to"}
                                            control={form.control}
                                            placeholder=" "
                                            className='ring-1 ring-gray-300'
                                        />
                                    </div>
                                </div>
                            </div>
                            <CustomFormField
                                fieldType={FormFieldType.CHECKBOX}
                                name={"findBelowWarningLevel"}
                                control={form.control}
                                placeholder="Find products below inventory quantity warning level"
                                className='ring-1 ring-gray-300'
                            />
                        </div>

                    </SectionLayout>


                    <SectionLayout title='Search by Setting' >
                        <div className='w-full flex flex-col gap-y-4'>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'>  Product Visibility:</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={control}
                                        name="productVisibility"
                                        selectOptions={[
                                            { label: "only visible products ", value: "visible" },
                                            { label: "only invisible products", value: "hidden" },
                                        ]}
                                        className='w-full'
                                        placeholder='No Preferance'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'>  Featured Product:	</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={control}
                                        name="featuredProduct"
                                        selectOptions={[
                                            { label: "only Featured products ", value: "featured" },
                                            { label: "only NonFeatured products", value: "nonFeatured" },
                                        ]}
                                        className='w-full'
                                        placeholder='No Preferance'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'>Free Shipping:</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={control}
                                        name="freeShipping"
                                        selectOptions={[
                                            { label: "only Free Shiping ", value: "free" },
                                            { label: "only Paid Shiping", value: "paid" },
                                        ]}
                                        className='w-full'
                                        placeholder='No Preferance'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-52 text-gray-500'>  Status:</Label>
                                <div className='w-[23rem]'>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        control={control}
                                        name="status"
                                        selectOptions={[
                                            { label: "Product that can be purchased", value: "purchasable" },
                                            { label: "Product that can't be purchased", value: "nonpurchasable" },
                                            { label: "Product that can be pre-ordered", value: "pre-order" },
                                        ]}
                                        className='w-full'
                                        placeholder='No Preference'
                                    />
                                </div>
                            </div>
                        </div>
                    </SectionLayout>

                    <SectionLayout title='Sort Order' >
                        <div className='w-full flex flex-col gap-y-4'>
                            <div className="flex items-center gap-6 max-w-xl">
                                <Label htmlFor="country" className='whitespace-nowrap w-32 text-gray-500'>  Sort Order:</Label>
                                <div className='w-[28rem] flex gap-x-3'>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            control={control}
                                            name="sortOrder.order"
                                            selectOptions={[
                                                { label: "ID ", value: "id" },
                                                { label: "Product Name", value: "name" },
                                                { label: "SKU", value: "sku" },
                                                { label: "In Stock", value: "inStock" },
                                                { label: "Visible", value: "visible" },
                                                { label: "Proce", value: "price" },
                                            ]}
                                            className='w-full'
                                            defaultValue='id'
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            control={control}
                                            name="sortOrder.order"
                                            selectOptions={[
                                                { label: "Ascending ", value: "ace" },
                                                { label: "Descending", value: "des" },
                                            ]}
                                            className='w-full'
                                            defaultValue='ace'
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </SectionLayout>

                    <ActionBarLayout>
                        <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                        <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Search</Button>
                    </ActionBarLayout>
                </form>
            </Form>

        </div >
    )
}

export default SearchProduct

