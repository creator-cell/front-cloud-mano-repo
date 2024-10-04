"use client";


import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import Image from 'next/image';
import { CustomHeading } from '@/components/custom/CustomHeading';
import { logo } from "@/assets/logo/index";
import left_img from "@/assets/extra/signup_left_img.webp";
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { SignUpFormValues, signUpSchema } from '@/zod/sign-up.schema';


const SignUp = () => {
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
        <div className='w-full bg-white flex flex-col gap-y-12 xl:px-32 px-4 '>
            <div className='flex items-center justify-center'>
                <Image
                    src={logo}
                    alt='logo'
                    width={100}
                    height={100}
                />
            </div>
            <div className='flex max-md:flex-col max-md:gap-y-12  gap-x-12 sm:px-12 md:px-0 w-full'>


                <div className='w-[50%] max-md:w-full bg-white sm:px-8 px-3 py-6 shadow-lg '>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"firstName"}
                                control={control}
                                placeholder='First Name'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"lastName"}
                                control={control}
                                placeholder='Last Name'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"phone"}
                                control={control}
                                placeholder='Phone Number'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"email"}
                                control={control}
                                placeholder='Email Address'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"password"}
                                type='password'
                                control={form.control}
                                placeholder='******'
                            />
                            <Button type="submit" variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Create Your Store</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
