"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import addressSchema, { AddressFormValues } from '@/zod/shiping-address.schema';
import { Button } from '@/components/ui/button';

interface AddressFormProps {
    onSubmit: (data: AddressFormValues) => void;
    onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, onCancel }) => {
    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        mode: "all"
    });

    const { control, formState: { errors } } = form;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"name"}
                        control={control}
                        placeholder='e.g., Home, Work'
                        label='Name'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"street"}
                        control={control}
                        placeholder='Street Name'
                        label='Street'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"city"}
                        control={control}
                        placeholder='City'
                        label='City'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"zipCode"}
                        control={control}
                        placeholder='Zip Code'
                        label='Zip Code'
                        className='ring-1 ring-gray-300'
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Add Address</Button>
                </div>
            </form>
        </Form>
    );
};

export default AddressForm;
