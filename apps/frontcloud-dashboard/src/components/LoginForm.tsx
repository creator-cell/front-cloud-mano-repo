"use client";

import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '@/zod/schema'
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from './common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import Link from 'next/link';
import { useSignInMutation } from '@/store/api/auth';
import { toast } from 'sonner';
;

interface LoginFormProps {
    title: string
    setShowForm?: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<LoginFormProps> = ({
    title,
    setShowForm,
}) => {
    const [SignIn, { isLoading }] = useSignInMutation()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setShowForm?.(false)
        console.log(values)

        try {

            const promise = SignIn({ Email: values.email, Password: values.password }).unwrap()

            toast.promise(promise, {
                loading: 'Loading...',
                success: (data) => {
                    console.log(data)
                    form.reset()
                    return data?.IsVerify ? 'Login successful' : "Account not verified , Verification link sent to your email"
                },
                error: (error) => {
                    console.log(error)
                    return 'Login failed'
                }
            })

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className=' rounded-[5px] px-3 w-full py-5 shadow-lg'>
            <div className='pb-12'>
                <h1 className='text-[25px] font-semibold text-dark-800   text-white text-center '>{title && title}</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"email"}
                        control={form.control}
                        placeholder='example@gmail.com'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"password"}
                        type='password'
                        control={form.control}
                        placeholder='******'
                    />
                    <Button type="submit" disabled={isLoading} variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Submit</Button>
                </form>
            </Form>
            <div className='w-full flex items-center justify-between text-white mt-5'>
                <h1 className='text-[14px] cursor-pointer'> Login with SSO</h1>
                <div className='flex gap-3'>
                    <h1 className='text-[14px] cursor-pointer'>Forgot?</h1>
                    <Link href={"/sign-up"} className='text-[14px] cursor-pointer'>sign Up</Link>
                </div>
            </div>

        </div>
    )
}

export default LoginForm
