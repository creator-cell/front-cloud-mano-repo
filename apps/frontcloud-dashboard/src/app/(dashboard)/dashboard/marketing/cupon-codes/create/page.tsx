"use client";
import React, { useEffect } from 'react'
import PageWrapper from '../../../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import couponSchema, { CouponFieldvalues } from '@/zod/marketing/create-coupon.schema';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { DollarSignIcon } from 'lucide-react';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const categoryOptions = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
]

const productOptions = [
    { label: 'Product 1', value: 'product1' },
    { label: 'Product 2', value: 'product2' },
    { label: 'Product 3', value: 'product3' },
]

const CreateCoupon = () => {
    const router = useRouter();
    const form = useForm<CouponFieldvalues>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            discountType: "order_total_dollar"
        },
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
        setValue
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: CouponFieldvalues) => {
        console.log("Form data:", data);
    };


    const appliedTo = watch("coupon_applied.appliedTo")
    const limitTotalUses = watch("numberOfUses.limitTotalUses")
    const limitUsesPerCustomer = watch("numberOfUses.limitUsesPerCustomer")

    useEffect(() => {
        if (appliedTo === "all_products") {
            setValue("coupon_applied.category", [])
            setValue("coupon_applied.products", [])
        } else if (appliedTo === "specific_category") {
            setValue("coupon_applied.products", [])
        } else if (appliedTo === "specific_products") {
            setValue("coupon_applied.category", [])
        }

    }, [appliedTo])

    useEffect(() => {
        if (!limitTotalUses) {
            setValue("numberOfUses.totalusers", 0)
        }
        else if (!limitUsesPerCustomer) {

            setValue("numberOfUses.totalusers", 0)

        }
    }, [limitTotalUses, limitUsesPerCustomer])



    console.log("values", watch("coupon_applied.category"))
    return (
        <PageWrapper className='pb-40'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <SectionLayout title='Coupon details' className='space-y-7'>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"couponCode"}
                            control={control}
                            placeholder='AJSG6SD43B'
                            label='Coupon code'
                            className='ring-1 ring-gray-400'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"couponName"}
                            control={control}
                            label='Coupon Name'
                            className='ring-1 ring-gray-400'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"discountType"}
                            control={control}
                            label='Discount type'
                            defaultValue='order_total_dollar'
                            selectOptions={[
                                { label: "Dollar amount off the order total", value: "order_total_dollar" },
                                { label: "Dollar amount off each item in the order", value: "item_dollar" },
                                { label: "Percentage off each item in the order", value: "item_percentage" },
                                { label: "Dollar amount off the shipping total", value: "shipping_dollar" },
                                { label: "Free shipping", value: "free_shipping" },
                            ]}
                        />
                        {
                            watch("discountType") != "free_shipping" &&
                            <div className='flex w-full items-center gap-x-8 '>

                                <div className='w-52'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"discountAmount"}
                                        control={control}
                                        label='Discount amount'
                                        placeholder='$0.00'
                                        className='ring-1 ring-gray-400'
                                    />
                                </div>
                                <p className='pt-6'>
                                    {/* Dynamically update description based on selected discountType */}
                                    {(() => {
                                        const discountType = watch("discountType");
                                        switch (discountType) {
                                            case "order_total_dollar":
                                                return " amount off the order total";
                                            case "item_dollar":
                                                return " amount off each item in the order";
                                            case "item_percentage":
                                                return "% off each item in the order";
                                            case "shipping_dollar":
                                                return " amount off the shipping total";
                                            default:
                                                return "";
                                        }
                                    })()}
                                </p>

                            </div>
                        }
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"minimumPurchase"}
                            control={control}
                            label='Minimum purchase'
                            placeholder='$0.00'
                            className='ring-1 ring-gray-400'
                        />


                        <div className=''>
                            <CustomFormField
                                fieldType={FormFieldType.CHECKBOX}
                                name={"numberOfUses.limitTotalUses"}
                                control={control}
                                label='Limit total uses'
                                placeholder='Limit total number of uses'
                            />
                            {
                                watch("numberOfUses.limitTotalUses") &&
                                <div className='pl-7 w-32'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"numberOfUses.totalusers"}
                                        control={control}
                                        placeholder='0'
                                        className='ring-1 ring-gray-400'
                                    />
                                </div>
                            }
                        </div>
                        <div className=''>
                            <CustomFormField
                                fieldType={FormFieldType.CHECKBOX}
                                name={"numberOfUses.limitUsesPerCustomer"}
                                control={control}
                                label='Limit number of uses per customer'
                                placeholder='Limit number of uses per customer'
                            />
                            {
                                watch("numberOfUses.limitUsesPerCustomer") &&
                                <div className='pl-7 w-32'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"numberOfUses.usersPerCustomer"}
                                        control={control}
                                        placeholder='0'
                                        className='ring-1 ring-gray-400'
                                    />
                                </div>
                            }
                        </div>

                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"excludeCartLevelDiscounts"}
                            control={control}
                            label='Exclude cart level discounts'
                            placeholder='This coupon does not apply on top of cart level discounts'
                        />

                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"enabled"}
                            control={control}
                            label='Enabled'
                            placeholder='This coupon code is enabled and can be used.'
                        />

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            name={"expiration"}
                            control={control}
                            label='Expiration date'
                        />


                    </SectionLayout>

                    <SectionLayout title='Coupon conditions'>
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"coupon_applied.appliedTo"}
                            control={control}
                            label='Apply coupon to'
                            selectOptions={[
                                { label: "All products", value: "all_products" },
                                { label: "Specific category", value: "specific_category" },
                                { label: "Specific products", value: "specific_products" },
                            ]}
                            className='w-fit'
                        />
                        {appliedTo === "specific_category" &&
                            <CustomFormField
                                fieldType={FormFieldType.MULTISELECT}
                                name={"coupon_applied.category"}
                                control={control}
                                label={"Select category"}
                                selectOptions={categoryOptions}
                            />
                        }
                        {
                            appliedTo === "specific_products" &&
                            <CustomFormField
                                fieldType={FormFieldType.MULTISELECT}
                                name={"coupon_applied.products"}
                                control={control}
                                label={"Select products"}
                                selectOptions={productOptions}
                            />
                        }
                    </SectionLayout>

                    <ActionBarLayout>
                        <Button variant={"outline"} type='button' className='px-5' onClick={() => router.back()} >Calcle</Button>
                        <Button className='px-4'>Create Coupon</Button>
                    </ActionBarLayout>
                </form>
            </Form>

        </PageWrapper>
    )
}

export default CreateCoupon
