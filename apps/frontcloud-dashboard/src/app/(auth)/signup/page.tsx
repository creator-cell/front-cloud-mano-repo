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

import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

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
                <div className='w-[40%] max-md:w-full flex flex-col  gap-y-12  '>
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <CustomFormField
                                fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                name={"firstName"}
                                control={control}
                                placeholder='First Name'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                name={"lastName"}
                                control={control}
                                placeholder='Last Name'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                name={"phone"}
                                control={control}
                                placeholder='Phone Number'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                name={"email"}
                                control={control}
                                placeholder='Email Address'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                name={"password"}
                                type='password'
                                control={form.control}
                                placeholder='******'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                                name={"store"}
                                control={control}
                                placeholder='Store'
                            />
                            <CustomFormField
                                control={control}
                                fieldType={FormFieldType.SELECT}
                                name="buisnes_size"
                                placeholder="What Size is Your Onlne Buisness"
                                className=' focus:ring-0  '
                                selectOptions={[
                                    { label: 'I Have Not Started Selling yet : No Revenue ', value: 'no' },
                                    { label: 'Just Started Out : <$50K', value: '<$50K' },
                                    { label: 'Building a Buisness : $50K to $250K', value: '$50k-$250k' },
                                    { label: 'Growing Buisness : $250K to $1M', value: '$250k-$1M' },
                                    { label: 'Maturing Buisness : $1M to $20M', value: '$1M-20M' },
                                ]}
                            />
                            <CustomFormField
                                control={control}
                                fieldType={FormFieldType.SELECT}
                                name="buisness_location"
                                placeholder="Where should your store be hosted"
                                className=' focus:ring-0  '
                                selectOptions={[
                                    { label: 'North America', value: 'north_america' },
                                    { label: 'Europe', value: 'europe' },
                                    { label: 'Asia-Specific', value: 'asia_specific' },
                                ]}
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

                            <Button type="submit" variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Create Your Store</Button>
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
        </div>
    )
}

export default SignUp;
