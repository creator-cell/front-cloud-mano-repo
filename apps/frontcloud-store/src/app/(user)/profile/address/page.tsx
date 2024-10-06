"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import addressSchema, { AddressFormValues } from '@/zod/shiping-address.schema';
import AddressCard from '@/components/profile/address/AddressCard';
import AddressForm from '@/components/profile/address/AddressForm';



// Address type
interface Address {
    id: number;
    name: string;
    street: string;
    city: string;
    zipCode: number;
    isDefault: boolean;
}

const AddressPage: React.FC = () => {
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            name: 'Home',
            street: '123 Main St',
            city: 'Los Angeles',
            zipCode: 90001,
            isDefault: true
        },
        {
            id: 2,
            name: 'Work',
            street: '456 Office Blvd',
            city: 'San Francisco',
            zipCode: 94103,
            isDefault: false
        },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);



    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        mode: "all"
    });

    const {
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: AddressFormValues) => {
        console.log("Form data:", data)
        const newAddress = {
            ...data,
            id: addresses.length + 1,
            isDefault: false,
        };
        setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
        setIsDialogOpen(false);
    };


    return (
        <div className="space-y-6 p-4">
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-bold">Select Your Address</h2>

                {/* Button to trigger add address modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Add New Address</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                        </DialogHeader>
                        <AddressForm
                            onSubmit={onSubmit}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <AddressList
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
            />

        </div>
    );
};



interface AddressListProps {
    addresses: Address[];
    selectedAddress: number | null;
    onSelectAddress: (id: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, selectedAddress, onSelectAddress }) => {
    return (
        <RadioGroup value={selectedAddress?.toString()} onValueChange={(value) => onSelectAddress(Number(value))}>
            {addresses.map((address) => (
                <AddressCard
                    key={address.id}
                    id={address.id}
                    name={address.name}
                    street={address.street}
                    city={address.city}
                    zipCode={address.zipCode}
                    isDefault={address.isDefault}
                    isSelected={selectedAddress === address.id}
                    onSelect={onSelectAddress}
                />
            ))}
        </RadioGroup>
    );
};



export default AddressPage;
