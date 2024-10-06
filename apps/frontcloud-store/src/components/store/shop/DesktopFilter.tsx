"use client";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import React from 'react'
import CustomMultiSelect from '../shared/filters/MultiSelect';
import { XIcon } from 'lucide-react';


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


interface FilterProps {
    category: string;
    filters: { [key: string]: string[] };
    handleRemoveFilter: (type: string, value: string) => void;
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


export default DesktopFilter
