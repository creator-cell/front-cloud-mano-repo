"use client"
import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { ArrowLeft, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CustomMultiSelect from '@/components/store/shared/filters/MultiSelect';


interface CustomSheetProps {
    filters: { [key: string]: string[] };
    handleRemoveFilter: (type: string, value: string) => void;
    category?: string | null;
    // brandOptions: string[];
    // typeOptions: string[];
    // colorOptions: string[];
    // ratingOptions: string[];
    // discountOptions: string[];
}



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




const CustomSheet: React.FC<CustomSheetProps> = ({
    filters,
    handleRemoveFilter,
    category
    // brandOptions,
    // typeOptions,
    // colorOptions,
    // ratingOptions,
    // discountOptions,
}) => {
    return (
        <Sheet >
            <SheetTrigger >
                Filters
            </SheetTrigger>
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
    );
};

export default CustomSheet;
