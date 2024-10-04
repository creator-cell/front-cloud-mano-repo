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
;

interface LoginFormProps {
    title: string
    setShowForm?: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<LoginFormProps> = ({
    title,
    setShowForm,
}) => {

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setShowForm?.(false)
        console.log(values)
        form.reset()
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
                    <Button type="submit" variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Submit</Button>
                </form>
            </Form>
            <div className='w-full flex items-center justify-between text-white mt-5'>
                <h1 className='text-[14px] cursor-pointer'> Login with SSO</h1>
                <div className='flex gap-3'>
                    <h1 className='text-[14px] cursor-pointer'>Forgot?</h1>
                    <Link href={"/signup"} className='text-[14px] cursor-pointer'>sign Up</Link>
                </div>
            </div>

        </div>
    )
}

export default LoginForm
