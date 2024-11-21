"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useMemo, useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import 'react-quill/dist/quill.snow.css';

import { AdProductFormSections, ProductFormSectionIds } from '@/enum/dashboard/products/add';
import { AddProductFormSchemaNew, addProductFormValuesNew } from '@/zod/addProduct.schema';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import SectionLayout from '@/components/common/CommonSectionLayout';
import CustomFormField from '@/components/common/CustomFormField';

import useMediaQuery from '@/hooks/useMedia';

import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';

import { FormFieldType } from '@/enum/formTypes';
import { FileType } from '@/enum/fileTypes';
import VariantAttributeForm from '@/components/VariantOptionsForm';
import { toast } from 'sonner';
import { useAddProductsMutation, useGetProductByIdQuery, useUpdateProductMutation } from '@/store/api/products';
import { useRouter, useSearchParams } from 'next/navigation';
import camelcaseKeys from "camelcase-keys";
import { useGetAllCategoriesQuery } from '@/store/api/products/category';
import { AddProductType } from '@/store/api/products/types/products-types';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });




interface ProductData {
    product: {
        productId: number;
        productName: string;
        sku: string;
        productType: string;
        brand: string;
        manufacturePartNumber: string;
        productUpc: string;
        globalTradeItemNumber: string;
        description: string;
        isDropShipped: number;
        createdAt: string;
        updatedAt: string;
    };
    productDimensions: {
        weight: string;
        height: string;
        width: string;
        depth: string;
    };
    productTax: {
        taxClass: string;
        taxProviderTaxCode: string;
    };
    productInventory: {
        stockQuantity: number;
        binPickingNumber: string;
        minPurchaseQty: number;
        maxPurchaseQty: number;
    };
    productPricing: {
        storePrice: string;
        supplierPrice: string;
        priceType: string;
        discountType: string;
    };
    productShipping: {
        shippingType: string;
        shippingCost: string;
        shippingWeight: string;
        shippingHeight: string;
        shippingWidth: string;
        shippingDepth: string;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        metaKeywords: string;
        searchKeywords: string;
    };
}


interface ExampleWithProvidersProps {
    productData?: AddProductType
    parentCategoryOptions: { label: string, value: string }[]
}


const AddProductFrom: React.FC<ExampleWithProvidersProps> = ({
    productData,
    parentCategoryOptions
}) => {
    console.log("🚀 ~ parentCategoryOptions:", parentCategoryOptions)
    console.log("🚀 ~ productData:", productData)
    let camelCaseData: ProductData | undefined;
    if (productData) {
        camelCaseData = camelcaseKeys(productData as any, { deep: true });
        console.log("🚀 ~ camelCaseData:", camelCaseData)

    }


    console.log(Number(camelCaseData?.productShipping.shippingCost))

    const form = useForm<addProductFormValuesNew>({
        resolver: zodResolver(AddProductFormSchemaNew),
        mode: 'all',
        criteriaMode: 'all',
        progressive: true,
        reValidateMode: 'onChange',
        defaultValues: productData && {
            product: {
                storeID: "1",
                productName: productData?.product?.ProductName,
                SKU: productData?.product?.SKU,
                productType: productData?.product?.ProductType,
                brand: productData?.product?.Brand,
                manufacturePartNumber: productData?.product?.ManufacturePartNumber,
                productUPC: productData?.product?.ProductUPC,
                globalTradeItemNumber: productData?.product?.GlobalTradeItemNumber,
                description: productData?.product?.Description,
                isDropShipped: productData?.product?.IsDropShipped === 0 as any ? false : true,
            },
            productDimensions: {
                weight: productData?.productDimensions?.Weight,
                height: productData?.productDimensions?.Height,
                width: productData?.productDimensions?.Width,
                depth: productData?.productDimensions?.Depth,
            },
            productPricing: {
                storePrice: productData?.productPricing?.StorePrice,
                supplierPrice: productData?.productPricing?.SupplierPrice,
                priceType: productData?.productPricing?.PriceType,
                discountType: productData?.productPricing?.DiscountType,
            },
            productShipping: {
                shippingType: productData?.productShipping?.ShippingType,
                shippingPrice: productData?.productShipping?.ShippingCost,
                weight: productData?.productShipping?.ShippingWeight,
                height: productData?.productShipping?.ShippingHeight,
                width: productData?.productShipping?.ShippingWidth,
                depth: productData?.productShipping?.ShippingDepth,
            },
            seo: {
                metaTitle: productData?.seo?.MetaTitle,
                metaDescription: productData?.seo?.MetaDescription,
                metaKeywords: productData?.seo?.MetaKeywords,
            }
        },
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = form;

    console.log("errror", errors)
    const router = useRouter();
    const [AddProduct, { isLoading }] = useAddProductsMutation()
    const [UpdateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

    const onSubmit = async (data: any) => {
        console.log("Form data:", data);
        try {
            if (productData) {
                await UpdateProduct(data).unwrap().then(res => {
                    router.replace('/dashboard/products')
                });
            } else {
                await AddProduct(data).unwrap().then(res => {
                    router.replace('/dashboard/products')
                });
            }
        } catch (err) {
            console.log("Error", err)
            toast.error("Error")
        }
    };

    const { state } = useContext(SideBarOpenCloseContext);
    const isTablet = useMediaQuery('(max-width: 768px)');

    const modules = {
        toolbar: [

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'font': [] }],

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction



            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    }

    const handleScrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };



    const selectedCategory = watch("product.categoryID");

    const CategoryOptions = {
        "categories": [
            {
                "label": "Electronics",
                "value": "electronics",
                "subcategories": [
                    { "label": "Smartphones", "value": "smartphones" },
                    { "label": "Laptops", "value": "laptops" },
                    { "label": "Headphones", "value": "headphones" }
                ]
            },
            {
                "label": "Clothing",
                "value": "clothing",
                "subcategories": [
                    { "label": "Men", "value": "men" },
                    { "label": "Women", "value": "women" },
                    { "label": "Kids", "value": "kids" }
                ]
            },
        ]
    }
    const discountTypeOptions = [
        { label: "Percentage", value: "percentage" },
        { label: "Fixed Amount", value: "fixed_amount" },
        { label: "Buy One Get One Free (BOGO)", value: "bogo" },
        { label: "Free Shipping", value: "free_shipping" },
    ];
    const priceTypeOptions = [
        { label: "Retail Price", value: "retail_price" },
        { label: "Wholesale Price", value: "wholesale_price" },
        { label: "Cost Price", value: "cost_price" },
        { label: "Discounted Price", value: "discounted_price" },
        { label: "Dynamic Pricing", value: "dynamic_pricing" },
    ];
    const shippingTypeOptions = [
        { label: "Standard Shipping", value: "standard_shipping" },
        { label: "Express Shipping", value: "express_shipping" },
        { label: "Overnight Shipping", value: "overnight_shipping" },
        { label: "International Shipping", value: "international_shipping" },
        { label: "Free Shipping", value: "free_shipping" },
        { label: "Local Pickup", value: "local_pickup" },
    ];



    const subcategories = useMemo(() => {
        const category = CategoryOptions.categories.find(cat => cat.value === selectedCategory);
        return category ? category.subcategories : [];
    }, [selectedCategory, CategoryOptions.categories]);

    return (
        <div className='w-full flex gap-x-2 h-full'>
            {
                !isTablet &&
                <motion.div className=' fixed bg-white  bottom-0 w-[225px] h-full  self-center  z-20'
                    animate={{ width: state.sideBarOpen ? 'left-[60px]' : 'left-[300px]' }}  >
                    <div className=" rounded-md  w-full overflow-hidden overflow-y-auto  "
                        style={{
                            height: "calc(100vh - 4rem)"
                        }}
                    >
                        <div className="pt-20 px-4">
                            {
                                AdProductFormSections.map((section, index) => (
                                    <div key={index} className='w-full   flex flex-col gap-y-1 '>

                                        <div className={` ${index == 0 && "hidden"} h-px bg-gray-200 w-full py-2 mt-2`} />
                                        {
                                            section.sections.map((subSection, index) => (
                                                <Label
                                                    size={"small"}
                                                    key={index}
                                                    onClick={() => handleScrollToSection(subSection.idName)}
                                                    className={`text-sm font-normal cursor-pointer hover:bg-gray-200 py-1  px-2 rounded-md`}>
                                                    {subSection.label}
                                                </Label>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </motion.div>
            }


            <div className={` ${isTablet ? "w-full" : "w-[80%]"}   my-20 relative left-[225px] px-5 `}>
                <div className='w-full flex flex-col py-5 items-center justify-center gap-y-1' id={"basic_information"}>
                    <CustomParagraph variant='large' className='text-gray-700 font-[500]'>Product Information</CustomParagraph>
                    <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Information to help define a product.</CustomParagraph>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>

                        {/* Basic information */}
                        <SectionLayout className='px-6'  >
                            <CustomParagraph variant='medium' className=' text-black text-left'>Basic information</CustomParagraph>
                            <div className="space-y-6">

                                <div className='flex items-center gap-x-3 h-6 '>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"product.isDropShipped"}
                                        checked={watch("product.isDropShipped") || productData?.product?.IsDropShipped}
                                        control={control}
                                        placeholder='Is Drop Shipped'
                                        className='w-6 h-6'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Product Name</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"product.productName"}
                                            control={control}
                                            placeholder='Sample Product Name'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>SKU</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"product.SKU"}
                                            control={control}
                                            placeholder='THX-1138'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Product Type</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            name={"product.productType"}
                                            control={control}
                                            selectOptions={[
                                                { label: "Physical", value: "physical" },
                                                { label: "Digital", value: "digital" }]}
                                            defaultValue='physical'
                                            placeholder='Select Product Type'
                                            className='ring-1 focus:border-none  ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'> Brand</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            name={"product.brand"}
                                            control={control}
                                            selectOptions={[
                                                { label: "Physical", value: "physical" },
                                                { label: "Digital", value: "digital" }]}
                                            placeholder='Select Brand'
                                            className='ring-1 focus:border-none  ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    {/* <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Weight</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"weight"}
                                            control={control}
                                            placeholder='20'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div> */}
                                </div>
                                <div className='grid grid-cols-2 gap-x-5'>
                                    {/* catagories  */}
                                    <CustomFormField
                                        control={control}
                                        fieldType={FormFieldType.SELECT}
                                        name={`product.categoryID`}
                                        placeholder="Select Category"
                                        className="focus:ring-0"
                                        selectOptions={parentCategoryOptions}
                                    />
                                    {
                                        selectedCategory &&
                                        <CustomFormField
                                            control={control}
                                            fieldType={FormFieldType.SELECT}
                                            name={`product.subCategoryID`}
                                            placeholder="Select SubCategory"
                                            className="focus:ring-0"
                                            selectOptions={subcategories}
                                        />
                                    }
                                </div>
                            </div>
                        </SectionLayout>

                        {/* Description */}
                        <SectionLayout className='px-6 h-[28rem] ' idName={ProductFormSectionIds.DESCRIPTION} offsetHeight >
                            <CustomParagraph variant='medium' className=' text-black text-left'>Description</CustomParagraph>
                            <div className='w-full flex flex-col gap-y-1'>
                                <ReactQuill
                                    theme="snow"
                                    className='h-72'
                                    value={watch("product.description")}
                                    onChange={(value) => setValue("product.description", value)}
                                    modules={modules}
                                />
                            </div>
                        </SectionLayout>


                        {/* Images & Videos */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.IMAGES_AND_VIDEOS} offsetHeight>
                            <div className='flex items-center justify-between'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Images & Videos</CustomParagraph>

                            </div>
                            <div className='w-full flex flex-col gap-y-1 border'>
                                <FileUpload
                                    onChange={(files) => {
                                        setValue("images", files);
                                    }}
                                    fileType={FileType.ANY_IMAGE}
                                />
                            </div>
                        </SectionLayout> */}



                        {/* Product Identifiers */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.PRODUCT_IDENTIFIERS} offsetHeight>
                            <CustomParagraph variant='medium' className=' text-black text-left'>Product Inventory</CustomParagraph>

                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Stock Quentity</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productInventory.stockQuantity"}
                                        control={control}
                                        placeholder='123'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Manufacturer Part Number (MPN)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"product.manufacturePartNumber"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Product UPC/EAN     </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"product.productUPC"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Global Trade Item Number (GTIN)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"product.globalTradeItemNumber"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Bin Picking Number (BPN)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productInventory.binPickingNumber"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                        </SectionLayout>


                        {/* Pricing */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.PRICING} offsetHeight >
                            <CustomParagraph variant='medium' className=' text-black text-left'>Pricing</CustomParagraph>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Store Price * (excluding tax)                                    </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productPricing.storePrice"}
                                        control={control}
                                        placeholder='35'
                                        startAdornment='$'
                                        endAdornment='USD'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>

                                {/* advance pricing */}
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Supplier Price</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productPricing.supplierPrice"}
                                        control={control}
                                        placeholder='20'
                                        startAdornment='$'
                                        endAdornment='USD'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Discount Type                                   </Label>
                                    {/* <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"ProductPricing.DiscountType"}
                                        control={control}
                                        placeholder='$ 0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    /> */}
                                    <CustomFormField
                                        control={control}
                                        fieldType={FormFieldType.SELECT}
                                        name={`productPricing.discountType`}
                                        placeholder="Select Discount Type"
                                        className="focus:ring-0"
                                        selectOptions={discountTypeOptions}
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'> Price Type                                   </Label>
                                    {/* <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"pricing.salePrice"}
                                        control={control}
                                        placeholder='$ 0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    /> */}
                                    <CustomFormField
                                        control={control}
                                        fieldType={FormFieldType.SELECT}
                                        name={`productPricing.priceType`}
                                        placeholder="Select Price Type"
                                        className="focus:ring-0"
                                        selectOptions={priceTypeOptions}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-5'>
                                <CustomParagraph variant='medium' className=' text-black font-[700] text-left'>Tax Configuration</CustomParagraph>
                                <CustomParagraph variant='small' className=' text-black  text-left'>
                                    Map the tax codes defined by your external tax provider to ensure accurate tax calculations at cart and checkout. If this product has additional tax properties, you can <Link href={"#"} className="text-blue-500">configure tax properties</Link>  to show on this page. Once configured, enter the associated values here.
                                </CustomParagraph>

                                <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                    <div>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Tax Class</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            name={"productTax.taxClass"}
                                            control={control}
                                            selectOptions={[
                                                { label: "Default Tax Class", value: "default_tax_class" },
                                                { label: "Non Taxable", value: "non_taxable" },
                                                { label: "Shiping", value: "shiing" },
                                                { label: "Gift Wrapping", value: "gift_wrapping" }
                                            ]}
                                            placeholder=' '
                                            className='ring-1 focus:border-none  ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Tax Provider Tax Code                                   </Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"productTax.taxProviderTaxCode"}
                                            control={control}
                                            placeholder='THX-1138'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex flex-col gap-y-5'>
                                <CustomParagraph variant='medium' className=' text-black font-[700] text-left'>Bulk Pricing</CustomParagraph>
                                <CustomParagraph variant='small' className=' text-black  text-left'>
                                    Create bulk pricing rules to offer price discounts based on quantity breaks.
                                </CustomParagraph>

                                <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Diccount Type                                </Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            name={"bulkPricing.overallDiscount"}
                                            control={control}
                                            selectOptions={[
                                                { label: "% Discount", value: "discount" },
                                                { label: "$ Fixed Amount", value: "fixed_price" },
                                                { label: "$ Off/Unit", value: "off_nit" },
                                            ]}
                                            placeholder=' '
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                </div>
                            </div> */}
                        </SectionLayout>


                        {/* Inventory */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.INVENTORY} offsetHeight >
                            <CustomParagraph variant='medium' className=' text-black text-left'>Inventory</CustomParagraph>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"track_inventory"}
                                        control={control}
                                        placeholder='Track Inventory'
                                        className='ring-1 w-7 h-7 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>

                        </SectionLayout> */}



                        {/* <div className='w-full flex flex-col py-5 items-center justify-center gap-y-1'>
                            <CustomParagraph variant='large' className='text-gray-700 font-[500]'>Product Options</CustomParagraph>
                            <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Create product variations and customizations.</CustomParagraph>
                        </div> */}

                        {/* variations */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.VARIATIONS} offsetHeight>
                            <div className='flex flex-col gap-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Variations</CustomParagraph>
                                <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Add variant options like size and color to create variants for this product.</CustomParagraph>
                            </div>
                            <div className='flex flex-col gap-y-3'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Variant Options                                    </CustomParagraph>
                                <div className='flex items-center flex-col gap-y-4'>
                                    <CustomParagraph variant='small' className='text-gray-700 font-[300]'>No Option has been added yet.</CustomParagraph>
                                    <VariantAttributeForm control={control} errors={errors} />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Variants                                    </CustomParagraph>
                                <div className='py-8 px-10 border rounded-md'>

                                    <CustomParagraph variant='small' className='text-gray-700 text-center font-[300]'>Variants will be created after adding Options.</CustomParagraph>
                                </div>
                            </div>

                        </SectionLayout> */}
                        {/* <ExampleWithProviders /> variant table */}



                        {/* customizations */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.CUSTOMIZATIONS} offsetHeight>
                            <div className='flex flex-col gap-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Customizations</CustomParagraph>
                                <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Add modifier options like a text box, checkbox, or file upload to enable further product customization.</CustomParagraph>
                            </div>
                            <div className='flex flex-col gap-y-3'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Modifier Options                                    </CustomParagraph>
                                <div className='flex items-center flex-col gap-y-4'>
                                    <CustomParagraph variant='small' className='text-gray-700 font-[300]'>No modifier option has been added yet.</CustomParagraph>
                                    <Button variant={"outline"} className="text-blue-500 w-fit px-5"> <Plus size={20} className='mr-2' /> Add Option</Button>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Rules                                    </CustomParagraph>
                                <div className='py-8 px-10  rounded-md'>

                                    <CustomParagraph variant='small' className='text-gray-700 text-center font-[300]'>No rule has been added yet.</CustomParagraph>
                                    <CustomParagraph variant='small' className='text-gray-700 text-center font-[300]'>Rules can be added after adding Multiple Choice, Pick List, or Checkbox modifier options.</CustomParagraph>
                                </div>
                            </div>
                        </SectionLayout> */}



                        {/* <div className='space-y-2'>
                            <CustomParagraph variant='medium' className=' text-black text-center'>Storefront                                    </CustomParagraph>

                            <CustomParagraph variant='small' className='text-gray-700 text-center font-[300]'>Setup what customers will see on the storefront.
                            </CustomParagraph>
                        </div> */}

                        {/* Storefront */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.STOREFRONT_DETAILS} offsetHeight >
                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Storefront Details</CustomParagraph>
                                <CustomParagraph variant='small' className='text-gray-700 font-[300] flex items-center gap-x-3'> <Star /> Set as a Featured Product on my Storefront </CustomParagraph>
                            </div>
                            <div className='w-full flex flex-col gap-y-1'>
                                <Label variant='gray' size={"medium"} className=' font-[400]'>Search Keywords                                </Label>
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    name={"tags"}
                                    control={control}
                                    placeholder='THX-1138'
                                    className='ring-1 ring-gray-300 rounded-md'
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Sort Order                                </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"sortOrder"}
                                        control={control}
                                        placeholder='THX-1138'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Template Layout File                             </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        name={"templateLayoutFile"}
                                        control={control}
                                        selectOptions={[
                                            { label: "Default", value: "default" },
                                            { label: "Custom", value: "custom" }
                                        ]}
                                        // label='Default'
                                        placeholder='Default'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-y-1'>
                                <Label variant='gray' size={"medium"} className=' font-[400]'>Warranty Information     </Label>
                                <CustomFormField
                                    fieldType={FormFieldType.TEXTAREA}
                                    name={"warrentyInfo"}
                                    control={control}
                                    placeholder='Warranty Information'
                                    className='ring-1 ring-gray-300 rounded-md'
                                />
                            </div>
                            <div className='w-full flex flex-col gap-y-1'>
                                <Label variant='gray' size={"medium"} className=' font-[400]'>Availability Text                                 </Label>
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    name={"availabilityText"}
                                    control={control}
                                    placeholder='Usually Shi in 24 hours'
                                    className='ring-1 ring-gray-300 rounded-md'
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>

                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Condition                           </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        name={"condition"}
                                        control={control}
                                        selectOptions={[
                                            { label: "New", value: "new" },
                                            { label: "Used", value: "used" },
                                            { label: "Refurbished", value: "refurbished" }
                                        ]}
                                        // label='Default'
                                        placeholder='Default'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1 '>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Sort Order                                </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"sortOrder"}
                                        control={control}
                                        placeholder='Show condition on storefront'
                                        className='ring-1 ring-gray-300 w-6 h-6 mt-2 '
                                    />
                                </div>
                            </div>
                        </SectionLayout> */}


                        {/* Custom Fields */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.CUSTOM_FIELDS} offsetHeight >
                            <div className='flex flex-col gap-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Custom Fields</CustomParagraph>
                                <CustomParagraph variant='small' className='text-gray-700 font-[300]'>
                                    Custom fields allow you to specify additional information that will appear on the products page. Custom fields appear automatically in the product&apos;s details if they are defined on the product. If you don&apos;t want to show any custom fields, simply remove them from the product.
                                </CustomParagraph>
                            </div>
                            <Button variant={"ghost"} className="text-blue-500 w-fit px-5"> <Plus size={20} className='mr-2' /> Add Custom Fields</Button>
                        </SectionLayout> */}

                        {/* Related Products */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.RELATED_PRODUCTS} offsetHeight>
                            <CustomParagraph variant='medium' className=' text-black text-left'>Related Products</CustomParagraph>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"showRelatedProducts"}
                                        control={control}
                                        placeholder='Automatically show related products on my storefront'
                                        className='ring-1 w-7 h-7 ring-gray-300 rounded-md '
                                    />
                                </div>
                            </div>
                        </SectionLayout> */}


                        {/* Fulfillment */}
                        <div className='w-full flex flex-col py-5 items-center justify-center gap-y-1'>
                            <CustomParagraph variant='large' className='text-gray-700 font-[500]'> Fulfillment</CustomParagraph>
                            <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Setup shipping and inventory details for this product.</CustomParagraph>
                        </div>

                        {/* Dimensions & Weight */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.DIMENSIONS_AND_WEIGHT} offsetHeight>
                            <div className='space-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Dimensions & Weight</CustomParagraph>
                                <CustomParagraph variant='small' className=' text-gray-600 text-left'>Enter the dimensions and weight of this product to help calculate shipping rate. These measurements are for the product&apos;s shipping container. They are used to help calculate shipping price and do not show up on your storefront.</CustomParagraph>
                            </div>

                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Weight (Ounces) </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productDimensions.weight"}
                                        control={control}
                                        placeholder='0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Width (Inches)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productDimensions.width"}
                                        control={control}
                                        placeholder='2'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Height (Inches)      </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productDimensions.height"}
                                        control={control}
                                        placeholder='12'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Depth (Inches)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productDimensions.depth"}
                                        control={control}
                                        placeholder='3'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                        </SectionLayout>


                        {/* Shipping Details */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.SHIPPING_DETAILS} offsetHeight >
                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Shipping Details</CustomParagraph>
                            </div>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 items-end'>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productShipping.shippingPrice"}
                                        control={control}
                                        label='Shiping Price'
                                        placeholder='10'
                                        startAdornment='$'
                                        endAdornment='USD'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    name={"productShipping.shippingType"}
                                    control={control}
                                    selectOptions={shippingTypeOptions}
                                    placeholder='select shipping type'
                                    className='ring-1 focus:border-none  ring-gray-300 rounded-md'
                                />
                                {/* <div className='w-full flex flex-col gap-y-1 '>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Sort Order                                </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"sortOrder"}
                                        control={control}
                                        placeholder='Free Shiping'
                                        className='ring-1 ring-gray-300 w-6 h-6 mt-2 '
                                    />
                                </div> */}
                            </div>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Weight (Ounces) </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productShipping.weight"}
                                        control={control}
                                        placeholder='0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Width (Inches)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productShipping.width"}
                                        control={control}
                                        placeholder='2'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Height (Inches)      </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productShipping.height"}
                                        control={control}
                                        placeholder='12'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Depth (Inches)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productShipping.depth"}
                                        control={control}
                                        placeholder='3'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                        </SectionLayout>


                        {/* Purchasability */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.PURCHASABILITY} offsetHeight >
                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Purchasability</CustomParagraph>
                            </div>
                            <div className='grid grid-cols-1 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <CustomFormField
                                        fieldType={FormFieldType.RADIOGROUP}
                                        name={"purchaseablity"}
                                        control={control}
                                        selectOptions={[
                                            { label: "This product can be purchased in my online store", value: "This product can be purchased in my online store" },
                                            { label: "This product is coming soon but I want to take pre-orders", value: "This product is coming soon but I want to take pre-orders" },
                                            { label: "This product cannot be purchased in my online store", value: "This product cannot be purchased in my online store" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Minimum Purchase Quantity  </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"minPurchaseQuantity"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Maximum Purchase Quantity                                     </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"maxPurchaseQuantity"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                            </div>
                        </SectionLayout> */}


                        {/* Gift Wrapping */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.GIFT_WRAPPING} offsetHeight >
                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Gift Wrapping</CustomParagraph>
                            </div>
                            <div className='grid grid-cols-1 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Gift Wrapping options  </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.RADIOGROUP}
                                        name={"giftWrapping.giftWrappingOptions"}
                                        control={control}
                                        selectOptions={[
                                            { label: "Use all visible gift wrapping options I've created", value: "Use all visible gift wrapping options I've created" },
                                            { label: "Don't allow this item to be gift wrapped", value: "Don't allow this item to be gift wrapped" },
                                            { label: "This product cannot be purchased in my online store", value: "This product cannot be purchased in my online store" }
                                        ]}
                                    />
                                </div>
                            </div>
                        </SectionLayout> */}



                        {/* Customs Information */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.CUSTOMS_INFORMATION} offsetHeight >
                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Customs Information</CustomParagraph>
                                <CustomParagraph variant='small' className=' text-black text-left'>Provide customs information for this product to assist border officers to calculate customs duties and fees when shipping internationally. Will be used by installed apps that require this information.</CustomParagraph>
                            </div>
                            <div className='grid grid-cols-1 gap-x-7 gap-y-8 '>
                                <CustomFormField
                                    fieldType={FormFieldType.CHECKBOX}
                                    name={"giftWrapping.giftWrappingOptions"}
                                    control={control}
                                    placeholder='Manage customs information'
                                />
                            </div>
                        </SectionLayout> */}



                        {/* SEO & Sharing */}
                        <section className='w-full flex flex-col py-5 items-center justify-center gap-y-1' >
                            <span id={"seo"} className='mt-[-90px] pb-[60px] block'>
                                &nbsp;
                            </span>
                            <CustomParagraph variant='large' className='text-gray-700 font-[500]'> SEO & Sharing</CustomParagraph>
                            <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Boost traffic to your online business.</CustomParagraph>
                        </section>


                        {/* Search Engine Optimization */}
                        <SectionLayout className='px-6  space-y-6 '  >
                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Search Engine Optimization</CustomParagraph>
                            </div>
                            <div className='grid grid-cols-2 gap-x-7  '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Page Title  </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"seo.metaTitle"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300'
                                    />
                                </div>
                                <div className='w-full flex  gap-x-2 items-end'>
                                    <div className='flex flex-col w-full gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Search Keywords  </Label>
                                        <div className='w-full '>
                                            <CustomFormField
                                                fieldType={FormFieldType.INPUT}
                                                name={"seo.SearchKeywords"}
                                                control={control}
                                                placeholder='Search Keywords'
                                                className='ring-1 ring-gray-300 '
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 w-full gap-6'>
                                <div className='flex flex-col w-full gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Meta Description                                 </Label>
                                    <div className='w-full '>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"seo.metaDescription"}
                                            control={control}
                                            placeholder=' '
                                            className='ring-1 ring-gray-300 '
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col w-full gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Meta Keywords                                 </Label>
                                    <div className='w-full '>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"seo.metaKeywords"}
                                            control={control}
                                            placeholder=' garden, home, kitchen'
                                            className='ring-1 ring-gray-300 '
                                        />
                                    </div>
                                </div>


                            </div>
                        </SectionLayout>


                        {/* Open Graph Sharing */}
                        {/* <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.OPEN_GRAPH_SHARING} offsetHeight>

                            <div className='flex flex-col gap-y-6'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Open Graph Sharing                                </CustomParagraph>
                            </div>
                            <div className='grid grid-cols-1 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Object Type  </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        name={"openGraphSharing.objectType"}
                                        control={control}
                                        selectOptions={[
                                            { label: "product", value: "product" },
                                            { label: "album", value: "album" },
                                            { label: "book", value: "book" }
                                        ]}
                                        placeholder='product'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Title  </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"openGraphSharing.useProductName"}
                                        control={control}
                                        placeholder='Use Product Name'
                                    />
                                    {
                                        watch("openGraphSharing.useProductName") === false &&
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"openGraphSharing.ogTitle"}
                                            control={control}
                                            placeholder=' '
                                            className='ring-1 ring-gray-300 ml-6'
                                        />
                                    }
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Image  </Label>

                                    <CustomFormField
                                        fieldType={FormFieldType.RADIOGROUP}
                                        name={"openGraphSharing.ogImage"}
                                        control={control}
                                        selectOptions={[
                                            { label: "Use thumbnail image", value: "Use thumbnail image" },
                                            { label: "Don’t use an image", value: "Don’t use an image" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </SectionLayout> */}


                        <ActionBarLayout>
                            <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                            <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6" disabled={isLoading || isSubmitting || isUpdating}>
                                {
                                    productData ? " Update" : " Add"
                                }
                            </Button>
                        </ActionBarLayout>

                    </form>
                </Form>
            </div>
        </div >

    )
}

export default AddProductFrom
