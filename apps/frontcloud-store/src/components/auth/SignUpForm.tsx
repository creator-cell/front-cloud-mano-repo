"use client";
import { SignUpFormValues, signUpSchema } from '@/zod/sign-up.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomFormField from '../common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

interface SignUpFormProps {
    title: string
}

const SignUpForm = ({ title }: SignUpFormProps) => {
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: SignUpFormValues) => {
        console.log("Form data:", data);
    };

    return (
        <div className='w-full  bg-white  px-3 py-2  '>
            <div className='pb-12'>
                <h1 className='text-[25px] font-semibold text-dark-800   text-black text-center '>{title && title}</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"firstName"}
                        control={control}
                        placeholder='First Name'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"lastName"}
                        control={control}
                        placeholder='Last Name'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"phone"}
                        control={control}
                        placeholder='Phone Number'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"email"}
                        control={control}
                        placeholder='Email Address'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"password"}
                        type='password'
                        control={form.control}
                        placeholder='password'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"confirmPassword"}
                        type='text'
                        control={form.control}
                        placeholder='Confirm Password'
                        className='ring-1 ring-gray-300'
                    />
                    <Button type="submit" variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Sign Up</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignUpForm
