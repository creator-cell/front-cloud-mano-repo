"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface Option {
    label: string;
    value: string;
}

interface CustomMultiSelectProps {
    name: string;
    options: Option[];
    category?: string | null;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({ name, options }) => {
    const dispatch = useAppDispatch();

    const handleCheckboxChange = (value: string) => {

    };

    return (
        <Accordion type="single" collapsible className="w-full border-b py-2 px-1 rounded-md shadow-none">
            <AccordionItem value={`item-${name}`}>
                <AccordionTrigger className='pt-0'>{name}</AccordionTrigger>
                {options.map(option => (
                    <AccordionContent key={option.value} className='flex items-center space-x-2 pl-3 '>
                        <Checkbox
                            // checked={selectedOptions.includes(option.value)}
                            onCheckedChange={() => handleCheckboxChange(option.value)}
                            iconClassName='size-4'
                            className='size-4 rounded-[2px]'
                        />
                        <Label className="text-gray-700">{option.label}</Label>
                    </AccordionContent>
                ))}
            </AccordionItem>
        </Accordion>
    );
};

export default CustomMultiSelect;
