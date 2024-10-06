"use client";


import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Button } from '@/components/ui/button';
import changePasswordSchema, { ChangePasswordFormValues } from '@/zod/change-password.schema';
import { Label } from '@/components/ui/label';



const AccountInfoPage = () => {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };

    return (
        <div className='flex flex-col gap-y-6 p-5'>
            <Label className='text-2xl font-semibold'>Change Password</Label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 ">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"current_password"}
                        control={control}
                        placeholder='Current Password'
                        label="Current Password"
                        className='ring-1 ring-gray-400'
                    />
                    <div className='space-y-7 '>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"new_password"}
                            control={control}
                            placeholder='New Password'
                            label='New Password'
                            className='ring-1 ring-gray-400'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"confirm_password"}
                            control={control}
                            placeholder='Confirm Password'
                            label='Confirm Password'
                            className='ring-1 ring-gray-400'
                        />
                    </div>
                    <Button type='submit' className='w-full bg-primary text-white py-2 rounded-md w-fit'>Change Password</Button>
                </form>
            </Form>
        </div>
    )
}

export default AccountInfoPage


