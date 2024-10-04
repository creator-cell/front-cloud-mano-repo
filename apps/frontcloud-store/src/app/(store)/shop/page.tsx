'use client'

import ProductCard from '@/components/store/shared/ProductCard';
import { useClothingFilter } from '@/contexts/ClothingFilterContext';
import { useElectronicsFilter } from '@/contexts/ElectronicsFilterContext';
import { useFoodFilter } from '@/contexts/FoodFilterContext';
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'


const fakeProducts = [
    {
        productImg: "/assets/extra/product1.jpg", // Ensure this path is correct
        title: "Stylish Sneakers",
        price: 2999,
        discountPrice: 3999,
        rating: 4.5,
    },
    {
        productImg: "/assets/extra/product2.jpg", // Ensure this path is correct
        title: "Elegant Watch",
        price: 4999,
        discountPrice: 5999,
        rating: 4.0,
    },
    {
        productImg: "/assets/extra/product3.jpg", // Ensure this path is correct
        title: "Wireless Headphones",
        price: 1999,
        discountPrice: 2999,
        rating: 4.8,
    },
    {
        productImg: "/assets/extra/product4.jpg", // Ensure this path is correct
        title: "Leather Backpack",
        price: 3499,
        discountPrice: 4499,
        rating: 4.2,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product1.jpg", // Ensure this path is correct
        title: "Stylish Sneakers",
        price: 2999,
        discountPrice: 3999,
        rating: 4.5,
    },
    {
        productImg: "/assets/extra/product2.jpg", // Ensure this path is correct
        title: "Elegant Watch",
        price: 4999,
        discountPrice: 5999,
        rating: 4.0,
    },
    {
        productImg: "/assets/extra/product3.jpg", // Ensure this path is correct
        title: "Wireless Headphones",
        price: 1999,
        discountPrice: 2999,
        rating: 4.8,
    },
    {
        productImg: "/assets/extra/product4.jpg", // Ensure this path is correct
        title: "Leather Backpack",
        price: 3499,
        discountPrice: 4499,
        rating: 4.2,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
    {
        productImg: "/assets/extra/product5.jpg", // Ensure this path is correct
        title: "Smartphone",
        price: 19999,
        discountPrice: 24999,
        rating: 4.6,
    },
];


const ShopPage = () => {
    const searchParams = useSearchParams()

    const category = searchParams.get('category')

    const { state: clothingFilters } = useClothingFilter();
    const { state: electronicsFilters } = useElectronicsFilter();
    const { state: foodFilters, setFilters } = useFoodFilter();

    const clothingForm = useForm<ClothingFilterFormValues>({
        resolver: zodResolver(clothingFilterSchema),
        defaultValues: {
            priceRange: {
                from: clothingFilters.priceRange[0],
                to: clothingFilters.priceRange[1],
            },
            brand: clothingFilters.brand,
            type: clothingFilters.type,
            rating: clothingFilters.rating || undefined,
            discount: clothingFilters.discount || undefined,
            color: clothingFilters.color || [],
        },
        mode: "onChange",
    });

    const { control, handleSubmit, formState: { errors }, watch } = clothingForm;

    console.log('category', watch('brand'))


    const renderFilters = () => {
        switch (category) {
            case 'clothing':
                return (
                    <div>
                        <ClothingFilterComponent form={clothingForm} />
                    </div>
                );
            case 'electronics':
                return (
                    <div>

                    </div>
                );
            case 'food':
                return (
                    <div>
                        <h4>Category: {foodFilters.category}</h4>
                        <h4>Price Range: {foodFilters.priceRange[0]} - {foodFilters.priceRange[1]}</h4>
                        {/* Add inputs to change filters */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='container flex items-start gap-x-6'>
            {/* filters */}
            <div className='max-w-xs w-full p-3'>
                <div className=''>
                    {renderFilters()}
                </div>
            </div>
            {/* products */}
            <section className='flex-1'>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4' >
                    {
                        fakeProducts.map((category, index) => (
                            <ProductCard key={index} card={category} />
                        ))

                    }
                </div>
            </section>
        </div>


    )
}

export default ShopPage


import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import CustomFormField from "@/components/common/CustomFormField";
import { FormFieldType } from "@/enum/formTypes";

// Define Zod Schema for form validation
const clothingFilterSchema = z.object({
    priceRange: z.object({
        from: z.number().min(0, "Minimum price must be 0 or greater"),
        to: z.number().max(10000, "Maximum price must be 10,000 or less")
    }),
    brand: z.array(z.string()).nonempty("Select at least one brand"),
    type: z.array(z.string()).nonempty("Select at least one type"),
    rating: z.number().optional(),
    discount: z.number().optional(),
    color: z.array(z.string()).optional()
});

// Define TypeScript type from Zod schema
type ClothingFilterFormValues = z.infer<typeof clothingFilterSchema>;

const brandOptions = [
    { value: "Nike", label: "Nike" },
    { value: "Adidas", label: "Adidas" },
    { value: "Puma", label: "Puma" },
];

const typeOptions = [
    { value: "Shirt", label: "Shirt" },
    { value: "Pants", label: "Pants" },
    { value: "Shoes", label: "Shoes" },
];

const ratingOptions = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
];

const discountOptions = [
    { value: "10", label: "10% Discount" },
    { value: "20", label: "20% Discount" },
    { value: "30", label: "30% Discount" },
];

const colorOptions = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Black", label: "Black" },
];

interface ClothingFilterComponentProps {
    form: ReturnType<typeof useForm<ClothingFilterFormValues>>;
}

const ClothingFilterComponent: React.FC<ClothingFilterComponentProps> = ({
    form
}) => {
    const { state: clothingFilters, setFilters } = useClothingFilter();

    // Form setup using react-hook-form and zod for validation


    const { control, handleSubmit, formState: { errors } } = form;

    const onSubmit = (data: ClothingFilterFormValues) => {
        setFilters({
            ...clothingFilters,
            priceRange: [data.priceRange.from, data.priceRange.to],
            brand: data.brand,
            type: data.type,
            rating: data.rating || null,
            discount: data.discount || null,
            color: data.color || [],
        });
        console.log("Form data:", data);
    };

    return (
        <div>
            <Form {...form}>
                <form className="space-y-6">
                    <h4>Category: {clothingFilters.category}</h4>

                    {/* Price Range Slider */}
                    <div className="space-y-3">
                        <Label htmlFor="priceRange" className="whitespace-nowrap w-32 text-gray-500">
                            Price Range: {clothingFilters.priceRange[0]} - {clothingFilters.priceRange[1]}
                        </Label>

                        <Slider
                            range
                            min={0}
                            max={10000}
                            value={clothingFilters.priceRange}
                            // onChange={([from, to]) => form.setValue("priceRange", { from, to })}
                            step={100}
                            allowCross={false}
                        />

                        <div className="flex items-center gap-6 max-w-2xl">
                            <div className="flex items-center gap-2 w-[34rem]">
                                <div className="w-1/2">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name="priceRange.from"
                                        control={control}
                                        placeholder="$"
                                        className="ring-1 ring-gray-300"
                                    />
                                </div>
                                <span className="text-gray-500">To</span>
                                <div className="w-1/2">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        name="priceRange.to"
                                        control={control}
                                        placeholder="$ "
                                        className="ring-1 ring-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Multi-Select for Brands */}
                    <div>
                        <CustomFormField
                            fieldType={FormFieldType.MULTISELECT}
                            name="brand"
                            control={control}
                            label="Select Brands"
                            selectOptions={brandOptions}
                            className="h-fit"
                        />
                    </div>

                    {/* Multi-Select for Types */}
                    <div>
                        <CustomFormField
                            fieldType={FormFieldType.MULTISELECT}
                            name="type"
                            control={control}
                            label="Select Type"
                            selectOptions={typeOptions}
                            className="h-fit"
                        />
                    </div>

                    {/* Multi-Select for Rating */}
                    <div>
                        <CustomFormField
                            fieldType={FormFieldType.MULTISELECT}
                            name="rating"
                            control={control}
                            label="Select Rating"
                            selectOptions={ratingOptions}
                            className="h-fit"
                        />
                    </div>

                    {/* Multi-Select for Discount */}
                    <div>
                        <CustomFormField
                            fieldType={FormFieldType.MULTISELECT}
                            name="discount"
                            control={control}
                            label="Select Discount"
                            selectOptions={discountOptions}
                            className="h-fit"
                        />
                    </div>

                    {/* Multi-Select for Color */}
                    <div>
                        <CustomFormField
                            fieldType={FormFieldType.MULTISELECT}
                            name="color"
                            control={control}
                            label="Select Color"
                            selectOptions={colorOptions}
                            className="h-fit"
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

