"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@repo/ui/accordion"

interface Option {
    label: string;
    value: string;
}

interface CustomMultiSelectProps {
    name: string;
    options: Option[];
    onChange: (selectedValues: string[]) => void;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({ name, options, onChange }) => {
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (value: string) => {
        const updatedSelectedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter(option => option !== value) // Deselect if already selected
            : [...selectedOptions, value]; // Add to selection if not selected

        setSelectedOptions(updatedSelectedOptions);
        onChange(updatedSelectedOptions); // Dispatch to Redux or handle state update
    };

    return (
        <Accordion type="single" collapsible className="w-full border-b py-2 px-1 rounded-md shadow-none">
            <AccordionItem value={`item-${name}`}>
                <AccordionTrigger className='pt-0'>{name}</AccordionTrigger>
                {options.map(option => (
                    <AccordionContent className='flex items-center space-x-2 pl-3 '>
                        <Checkbox
                            checked={selectedOptions.includes(option.value)}
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
