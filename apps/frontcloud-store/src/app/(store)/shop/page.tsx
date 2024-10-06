'use client'

import ProductCard from '@/components/store/shared/ProductCard';
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"


import CustomMultiSelect from '@/components/store/shared/filters/MultiSelect';
import { ArrowLeft, Divide, X, XIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { removeFilter, setCategory } from '@/Redux/slice/filterSlice';

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


    const dispatch = useAppDispatch();
    const { category: cta, filters } = useAppSelector(state => state.productFilters)
    console.log("🚀 ~ ShopPage ~ cta:", cta, filters)

    useEffect(() => {
        if (category) {
            dispatch(setCategory(category))
        }
    }, [category])

    const handleRemoveFilter = (type: string, value: string) => {
        dispatch(removeFilter({ type, value }));
    }


    return (
        <div className='container flex max-lg:flex-col items-start gap-x-6 mt-8'>
            {/* filters */}
            <DesktopFilter
                category={cta}
                filters={filters}
                handleRemoveFilter={handleRemoveFilter}
            />
            <div className='w-full lg:hidden pb-3'>
                <MobileFilter
                    category={cta}
                    filters={filters}
                    handleRemoveFilter={handleRemoveFilter}
                />
            </div>
            {/* products */}
            <section className='flex-1 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full' >
                    {
                        fakeProducts.map((category, index) => (
                            <ProductCard key={index} card={category} />
                        ))

                    }
                </div>
            </section>
        </div >


    )
}

export default ShopPage
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';




interface FilterProps {
    category: string;
    filters: { [key: string]: string[] };
    handleRemoveFilter: (type: string, value: string) => void;
}

const MobileFilter = ({
    category,
    filters,
    handleRemoveFilter
}: FilterProps) => {
    return (
        <Sheet >
            <div className='grid grid-cols-2 w-full border divide-x-2  rounded-md text-center py-1'>
                <label className='my-auto '>Sort</label>
                <SheetTrigger >
                    Filters
                </SheetTrigger>

            </div>
            <SheetContent className='max-w-md overflow-hidden overflow-y-auto flex flex-col '>
                <div className=' w-full  p-6 space-y-5 mx-auto rounded-md flex-1  ' >
                    <div className='border-b pb-5 space-y-4'>
                        <Label className='flex gap-x-2'>
                            <SheetTrigger asChild>
                                <ArrowLeft className='cursor-pointer' />
                            </SheetTrigger>
                            Applied Filters
                        </Label>
                        {Object.keys(filters).length > 0 ? (
                            <div className='flex flex-wrap gap-2'>

                                {Object.entries(filters).length > 0 && Object.entries(filters).map(([key, value]) => {
                                    return value.map(val => (
                                        <Badge key={`${key}-${val}`} className='shadow-lg'>
                                            {val}
                                            <XIcon onClick={() => handleRemoveFilter(key, val)} className='w-3 h-3 text-black ml-1 cursor-pointer' />
                                        </Badge>
                                    ))
                                })}
                            </div>
                        ) : (
                            <Label className='text-xs text-gray-500 '>No filters selected</Label>
                        )}
                    </div>
                    <div className='w-full'>
                        <CustomMultiSelect
                            category={category}
                            options={brandOptions}
                            name='brand'
                        />
                        <CustomMultiSelect
                            options={typeOptions}
                            name='Category'
                        />
                        <CustomMultiSelect
                            options={colorOptions}
                            name='color'
                        />
                        <CustomMultiSelect
                            options={ratingOptions}
                            name='rating'
                        />
                        <CustomMultiSelect
                            options={discountOptions}
                            name='discount'
                        />
                    </div>
                </div >
                {/* <SheetFooter className='p-6'>
                    <SheetClose asChild>
                        <Button type="submit" className='w-fit px-8'>Aply Filter </Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}



const DesktopFilter = ({
    category,
    filters,
    handleRemoveFilter
}: FilterProps) => {
    return (
        <div className='max-w-xs w-full p-3 space-y-5 border min-h-screen rounded-md max-lg:hidden' >
            <div className='border-b pb-5 space-y-4'>
                <Label>
                    Applied Filters
                </Label>
                {Object.keys(filters).length > 0 ? (
                    <div className='flex flex-wrap gap-2'>

                        {Object.entries(filters).length > 0 && Object.entries(filters).map(([key, value]) => {
                            return value.map(val => (
                                <Badge key={`${key}-${val}`} className='shadow-lg'>
                                    {val}
                                    <XIcon onClick={() => handleRemoveFilter(key, val)} className='w-3 h-3 text-black ml-1 cursor-pointer' />
                                </Badge>
                            ))
                        })}
                    </div>
                ) : (
                    <Label className='text-xs text-gray-500 ml-4'>No filters selected</Label>
                )}
            </div>
            <div className=''>
                <CustomMultiSelect
                    category={category}
                    options={brandOptions}
                    name='brand'
                />
                <CustomMultiSelect
                    options={typeOptions}
                    name='Category'
                />
                <CustomMultiSelect
                    options={colorOptions}
                    name='color'
                />
                <CustomMultiSelect
                    options={ratingOptions}
                    name='rating'
                />
                <CustomMultiSelect
                    options={discountOptions}
                    name='discount'
                />
            </div>
        </div >
    )
}