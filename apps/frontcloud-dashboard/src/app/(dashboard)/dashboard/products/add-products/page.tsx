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
import { AddProductFormSchema, addProductFormValues } from '@/zod/addProduct.schema';
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

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const AddProduct = () => {

    const form = useForm<addProductFormValues>({
        resolver: zodResolver(AddProductFormSchema),
        mode: 'all',
    });

    const {
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
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



    const selectedCategory = watch("category");

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

    // React.useEffect(() => {
    //     const category = CategoryOptions.categories.find(cat => cat.value === selectedCategory);
    //     setSubcategories(category ? category.subcategories : []);
    // }, [selectedCategory]);

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
                                        name={"visibleToStorefront"}
                                        control={control}
                                        placeholder='Visible on Storefront'
                                        className='w-6 h-6'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Product Name</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"name"}
                                            control={control}
                                            placeholder='Sample Product Name'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>SKU</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"SKU"}
                                            control={control}
                                            placeholder='THX-1138'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Product Type</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            name={"type"}
                                            control={control}
                                            selectOptions={[
                                                { label: "Physical", value: "physical" },
                                                { label: "Digital", value: "digital" }]}
                                            defaultValue='physical'
                                            className='ring-1 focus:border-none  ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Default Price * (excluding tax)</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"defaultPriceExcludingTax"}
                                            control={control}
                                            placeholder='$ 35'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'> Brand</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.SELECT}
                                            name={"type"}
                                            control={control}
                                            selectOptions={[
                                                { label: "Physical", value: "physical" },
                                                { label: "Digital", value: "digital" }]}
                                            placeholder=' '
                                            className='ring-1 focus:border-none  ring-gray-300 rounded-md'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Weight</Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"weight"}
                                            control={control}
                                            placeholder='20'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-5'>
                                    {/* catagories  */}
                                    <CustomFormField
                                        control={control}
                                        fieldType={FormFieldType.SELECT}
                                        name={`category`}
                                        placeholder="Select Category"
                                        className="focus:ring-0"
                                        selectOptions={
                                            CategoryOptions.categories.map((category) => ({
                                                label: category.label,
                                                value: category.value
                                            }))
                                        }
                                    />
                                    {
                                        selectedCategory &&
                                        <CustomFormField
                                            control={control}
                                            fieldType={FormFieldType.SELECT}
                                            name={`subCategory`}
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
                                    value={watch("description")}
                                    onChange={(value) => setValue("description", value)}
                                    modules={modules}
                                />
                            </div>
                        </SectionLayout>


                        {/* Images & Videos */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.IMAGES_AND_VIDEOS} offsetHeight>
                            <div className='flex items-center justify-between'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Images & Videos</CustomParagraph>
                                {/* <div className='space-x-2'>
                                            <Button variant={"outline"} className="text-blue-500 w-fit px-5"> <Plus size={20} className='mr-2' /> Add Image</Button>
                                            <Button variant={"outline"} className="text-blue-500 w-fit px-5"> <UploadCloud size={20} className='mr-2' /> Upload File</Button>
                                        </div> */}
                            </div>
                            <div className='w-full flex flex-col gap-y-1 border'>
                                <FileUpload
                                    onChange={(files) => {
                                        setValue("images", files);
                                    }}
                                    fileType={FileType.ANY_IMAGE}
                                />
                            </div>
                        </SectionLayout>



                        {/* Product Identifiers */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.PRODUCT_IDENTIFIERS} offsetHeight>
                            <CustomParagraph variant='medium' className=' text-black text-left'>Product Identifiers</CustomParagraph>

                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>SKU</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productIdentifiers.sku"}
                                        control={control}
                                        placeholder='THX-1138'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Manufacturer Part Number (MPN)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productIdentifiers.manufacturerPartNumber"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Product UPC/EAN     </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productIdentifiers.UPC_EAN"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Global Trade Item Number (GTIN)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productIdentifiers.globalTradeItemNumber"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Bin Picking Number (BPN)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"productIdentifiers.binPickingNumber"}
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
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Default Price * (excluding tax)                                    </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"pricing.defaultPrice"}
                                        control={control}
                                        placeholder='$ 35'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            <div>
                                <Label variant='gray' size={"medium"} className=' font-[400]'>Tax Class</Label>
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    name={"pricing.taxClass"}
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
                            {/* advance pricing */}

                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Cost                                   </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"pricing.cost"}
                                        control={control}
                                        placeholder='$ 0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>MSRP                                   </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"pricing.MSRP"}
                                        control={control}
                                        placeholder='$ 0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Sale Price                                   </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"pricing.salePrice"}
                                        control={control}
                                        placeholder='$ 0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-5'>
                                <CustomParagraph variant='medium' className=' text-black font-[700] text-left'>Tax Configuration</CustomParagraph>
                                <CustomParagraph variant='small' className=' text-black  text-left'>
                                    Map the tax codes defined by your external tax provider to ensure accurate tax calculations at cart and checkout. If this product has additional tax properties, you can <Link href={"#"} className="text-blue-500">configure tax properties</Link>  to show on this page. Once configured, enter the associated values here.
                                </CustomParagraph>

                                <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                    <div className='w-full flex flex-col gap-y-1'>
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Tax Provider Tax Code                                   </Label>
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            name={"pricing.taxProviderTaxCode"}
                                            control={control}
                                            placeholder='THX-1138'
                                            className='ring-1 ring-gray-300 rounded-md'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-5'>
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
                            </div>
                        </SectionLayout>


                        {/* Inventory */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.INVENTORY} offsetHeight >
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

                        </SectionLayout>



                        <div className='w-full flex flex-col py-5 items-center justify-center gap-y-1'>
                            <CustomParagraph variant='large' className='text-gray-700 font-[500]'>Product Options</CustomParagraph>
                            <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Create product variations and customizations.</CustomParagraph>
                        </div>

                        {/* variations */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.VARIATIONS} offsetHeight>
                            <div className='flex flex-col gap-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Variations</CustomParagraph>
                                <CustomParagraph variant='small' className='text-gray-700 font-[300]'>Add variant options like size and color to create variants for this product.</CustomParagraph>
                            </div>
                            <div className='flex flex-col gap-y-3'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Variant Options                                    </CustomParagraph>
                                <div className='flex items-center flex-col gap-y-4'>
                                    <CustomParagraph variant='small' className='text-gray-700 font-[300]'>No Option has been added yet.</CustomParagraph>
                                    {/* <Button type='button' variant={"outline"} className="text-blue-500 w-fit px-5"> <Plus size={20} className='mr-2' /> Add Option</Button> */}
                                    <VariantAttributeForm control={control} errors={errors} />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Variants                                    </CustomParagraph>
                                <div className='py-8 px-10 border rounded-md'>

                                    <CustomParagraph variant='small' className='text-gray-700 text-center font-[300]'>Variants will be created after adding Options.</CustomParagraph>
                                </div>
                            </div>

                        </SectionLayout>
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



                        <div className='space-y-2'>
                            <CustomParagraph variant='medium' className=' text-black text-center'>Storefront                                    </CustomParagraph>

                            <CustomParagraph variant='small' className='text-gray-700 text-center font-[300]'>Setup what customers will see on the storefront.
                            </CustomParagraph>
                        </div>

                        {/* Storefront */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.STOREFRONT_DETAILS} offsetHeight >
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
                        </SectionLayout>


                        {/* Custom Fields */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.CUSTOM_FIELDS} offsetHeight >
                            <div className='flex flex-col gap-y-2'>
                                <CustomParagraph variant='medium' className=' text-black text-left'>Custom Fields</CustomParagraph>
                                <CustomParagraph variant='small' className='text-gray-700 font-[300]'>
                                    Custom fields allow you to specify additional information that will appear on the products page. Custom fields appear automatically in the product&apos;s details if they are defined on the product. If you don&apos;t want to show any custom fields, simply remove them from the product.
                                </CustomParagraph>
                            </div>
                            <Button variant={"ghost"} className="text-blue-500 w-fit px-5"> <Plus size={20} className='mr-2' /> Add Custom Fields</Button>
                        </SectionLayout>

                        {/* Related Products */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.RELATED_PRODUCTS} offsetHeight>
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
                        </SectionLayout>


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
                                        name={"dimensionsWeight.weight"}
                                        control={control}
                                        placeholder='0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Width (Inches)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"dimensionsWeight.width"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Height (Inches)      </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"dimensionsWeight.height"}
                                        control={control}
                                        placeholder=' '
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Depth (Inches)</Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"dimensionsWeight.depth"}
                                        control={control}
                                        placeholder=' '
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
                            <div className='grid grid-cols-2 gap-x-7 gap-y-8 '>
                                <div className='w-full flex flex-col gap-y-1'>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Fixed Shipping Price                           </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name={"fixedShipingPrice"}
                                        control={control}
                                        label='Default'
                                        placeholder='$ 0'
                                        className='ring-1 ring-gray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-y-1 '>
                                    <Label variant='gray' size={"medium"} className=' font-[400]'>Sort Order                                </Label>
                                    <CustomFormField
                                        fieldType={FormFieldType.CHECKBOX}
                                        name={"sortOrder"}
                                        control={control}
                                        placeholder='Free Shiping'
                                        className='ring-1 ring-gray-300 w-6 h-6 mt-2 '
                                    />
                                </div>
                            </div>
                        </SectionLayout>


                        {/* Purchasability */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.PURCHASABILITY} offsetHeight >
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
                        </SectionLayout>


                        {/* Gift Wrapping */}
                        <SectionLayout className='px-6  space-y-6 ' idName={ProductFormSectionIds.GIFT_WRAPPING} offsetHeight >
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
                        </SectionLayout>



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
                                        <Label variant='gray' size={"medium"} className=' font-[400]'>Product URL  </Label>
                                        <div className='w-full '>
                                            <CustomFormField
                                                fieldType={FormFieldType.INPUT}
                                                name={"seo.url"}
                                                control={control}
                                                placeholder='/product-url'
                                                className='ring-1 ring-gray-300 '
                                            />
                                        </div>
                                    </div>
                                    <Button variant={"outline"} className="text-blue-500 w-fit px-5 ">  Reset</Button>
                                </div>
                            </div>
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
                            <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Save</Button>
                        </ActionBarLayout>

                    </form>
                </Form>
            </div>
        </div >

    )
}

export default AddProduct
