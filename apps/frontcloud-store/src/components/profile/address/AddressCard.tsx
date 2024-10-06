"use client";

import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from "react-icons/md";

// Address type
interface AddressCardProps {
    id: number;
    name: string;
    street: string;
    city: string;
    zipCode: number;
    isDefault: boolean;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ id, name, street, city, zipCode, isDefault, isSelected, onSelect }) => {
    return (
        <Card
            className={`p-4 border shadow-lg rounded-lg relative transition-all duration-200 ease-in-out cursor-pointer ${isDefault ? 'border-primary bg-primary/10' : 'bg-white'}`}
            onClick={() => onSelect(id)}
        >
            <CardHeader className="flex justify-between items-start">
                <div>
                    <Label className="font-semibold text-lg">{name}</Label>
                    <div className="space-y-1 ml-3 mt-4">
                        <div className="flex items-center">
                            <Label className="font-medium mr-2 w-24">Street:</Label>
                            <Label className="text-sm text-gray-600">{street}</Label>
                        </div>
                        <div className="flex items-center">
                            <Label className="font-medium mr-2 w-24">City:</Label>
                            <Label className="text-sm text-gray-600">{city}</Label>
                        </div>
                        <div className="flex items-center">
                            <Label className="font-medium mr-2 w-24">Zip Code:</Label>
                            <Label className="text-sm text-gray-600">{zipCode}</Label>
                        </div>
                    </div>
                </div>

                {isDefault && <Badge className="bg-green-500 text-white ml-4 absolute right-2 -top-4">Default</Badge>}
                <div className='absolute right-2 top-2 flex items-start gap-x-2'>
                    <Button variant={"ghost"} className='px-2 '>
                        <CiEdit className='size-5 text-primary' />
                    </Button>
                    <Button variant={"ghost"} className='px-2 '>
                        <MdDelete className='size-5 text-red-600' />
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
};

export default AddressCard;
