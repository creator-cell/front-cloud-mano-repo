"use client";


import React, { useState } from 'react';
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
import { SignUpFormValues, signUpSchema } from '@/zod/auth/sign-up.schema';

import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSignUpMutation } from '@/store/api/auth';
import { toast } from 'sonner';
import Success from '@/components/Success';

const businessOptions = [
    { value: '50k', label: '50k' },
    { value: '50k to 250k', label: '50k to 250k' },
    { value: '250k to 1m', label: '250k to 1m' },
    { value: '1m to 20m', label: '1m to 20m' },
    { value: '20m to 50m', label: '20m to 50m' },
    { value: '50m to 100m', label: '50m to 100m' },
    { value: '100m+', label: '100m+' },
    { value: 'none', label: 'None' },
];

const hostedOptions = [
    { value: 'NorthAmerica', label: 'North America' },
    { value: 'Europe', label: 'Europe' },
    { value: 'AsiaPacific', label: 'Asia Pacific' },
];
const SignUp = () => {

    const [SignUp, { isLoading, isSuccess }] = useSignUpMutation()


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

        try {

            const promise = SignUp(data).unwrap();

            toast.promise(promise, {
                loading: 'Creating your store...',
                success: (res) => {
                    return (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex justify-center items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M9 11l3 3L22 4"></path>
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-800">{res?.data?.Message ?? "Store created successfully 🎉"}</span>
                                <span className="block text-xs text-gray-600">Activation Link has been sent to your email</span>
                            </div>
                        </div>

                    )
                },
                error: (err) => {
                    console.log("🚀 ~ onSubmit ~ err:", err)

                    return (
                        <div className="flex items-center gap-3">
                            <div className="!w-8 !h-8 aspect-square bg-red-500 rounded-full flex justify-center items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M12 9v2m0 4v2M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12C3 7.03 7.03 3 12 3s9 4.03 9 9z"></path>
                                </svg>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-800">{err?.data?.Message ?? "Failed to create Store"}</span>
                                <span className="block text-xs text-gray-600">There was an error while creating your store. Please try again.</span>
                            </div>
                        </div>
                    )

                }
            })

        } catch (err) {
            console.log("error", err)
        }
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
            {
                isSuccess ? (
                    <Success
                        title="Store Created Successfully"
                        description="Activation Link has been sent to your email"
                        buttonText="Go to Dashboard"
                        onClick={() => {
                            window.location.href = "/dashboard"
                        }}
                    />
                ) : (

                    <div className='flex max-md:flex-col  max-md:gap-y-12  gap-x-12 sm:px-12 md:px-0 pb-12 w-full'>
                        <div className='w-[50%] max-md:w-full flex flex-col  gap-y-12  '>
                            <div>
                                <CustomHeading variant={"small"} className={`text-black text-[20px]  lg:text-[26px] xl:text-[30px] text-center md:text-left tracking-tight `} >
                                    Create your beautiful store today
                                </CustomHeading>
                                <CustomHeading variant={"small"} className={`text-gray-400  text-[12px] lg:text-[15px] text-center md:text-left tracking-tight `} >
                                    Start your free 15-day trial, no credit card required.
                                </CustomHeading>
                            </div>

                            <Image
                                src={left_img}
                                alt='signup'
                                width={500}
                                height={500}
                                className='self-center max-md:hidden'
                            />
                        </div>

                        <div className='w-[50%] max-md:w-full bg-white sm:px-8 px-3 py-6 shadow-lg '>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"FirstName"}
                                        control={control}
                                        placeholder='First Name'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"LastName"}
                                        control={control}
                                        placeholder='Last Name'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"Phone"}
                                        control={control}
                                        placeholder='Phone Number'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"Email"}
                                        control={control}
                                        placeholder='Email Address'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"Password"}
                                        type='password'
                                        control={form.control}
                                        placeholder='******'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"StoreName"}
                                        control={control}
                                        placeholder='Store'
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                        name={"Location"}
                                        control={control}
                                        placeholder='Location'
                                    />
                                    <CustomFormField
                                        control={control}
                                        fieldType={FormFieldType.SELECT}
                                        name="Business"
                                        placeholder="What Size is Your Onlne Buisness"
                                        className=' focus:ring-0  '
                                        selectOptions={businessOptions}
                                    />
                                    <CustomFormField
                                        control={control}
                                        fieldType={FormFieldType.SELECT}
                                        name="Hosted"
                                        placeholder="Where should your store be hosted"
                                        className=' focus:ring-0  '
                                        selectOptions={hostedOptions}
                                    />
                                    <div
                                        style={{
                                            width: "280px"
                                        }}
                                    >
                                        <ReCAPTCHA
                                            className=''
                                            sitekey="6LeyLTMqAAAAALL5UAdynoq-GfriGL4zB4mAgNJg"
                                            security='6LeyLTMqAAAAADuMlt2fW51o_ioTSzFgbZ6butsF'
                                            onChange={(token) => {
                                                register("recaptcha").onChange({ target: { name: "recaptcha", value: token } });
                                            }}
                                            onExpired={() => {
                                                register("recaptcha").onChange({ target: { name: "recaptcha", value: "" } });
                                            }}
                                        />
                                    </div>

                                    <Button disabled={isLoading} variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Create Your Store</Button>
                                </form>
                            </Form>

                            <div className='flex flex-col py-6 gap-y-5 '>
                                <Label size={"small"} className='text-gray-600 text-[15px]' >
                                    By providing your email, you are agreeing to our <Link href={"#"} className='text-blue-500'>terms of service.</Link>
                                </Label>
                                <Label size={"small"} className='text-gray-600 text-[15px]' >

                                    This site is protected by reCAPTCHA Enterprise and the Google <Link href={"#"} className='text-blue-500'>privacy policy </Link> and  <Link href={"#"} className='text-blue-500'>terms of service </Link>apply.

                                </Label>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SignUp;
