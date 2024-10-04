"use client";

import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '@/zod/login.schema'
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from '../common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import Link from 'next/link';


interface LoginFormProps {
    title: string
}

const LoginForm: React.FC<LoginFormProps> = ({
    title,
}) => {
    const [showPassword, setShowPassword] = useState(false);


    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: FormSchema) => {
        console.log(values)
        form.reset()
    }


    return (
        <div className=' rounded-[5px] px-3 w-full max-w-sm' >
            <div className='pb-12'>
                <h1 className='text-[25px] font-semibold text-dark-800   text-black text-center '>{title && title}</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="relative">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                            Email
                        </Label>
                        <div className="relative ring-1 ring-gray-300 rounded-md">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"email"}
                                control={form.control}
                                placeholder='example@gmail.com'
                                className=' px-4 pl-10'
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>


                    <div className="relative">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                            Password
                        </Label>
                        <div className="relative ring-1 ring-gray-300 rounded-md">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"password"}
                                type='password'
                                control={form.control}
                                placeholder='password'
                                className='px-12'
                            />
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Button
                                variant={"ghost"}
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>
                    </div>
                    <Button type="submit" variant={"default"} className='w-full border-none !mt-8 bg-primary text-white text-[15px] rounded-[5px] py-6'>Submit</Button>
                </form>
            </Form>

        </div>
    )
}

export default LoginForm



import { useState } from 'react';
import * as z from 'zod';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '../ui/label';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const LoginForms = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle login logic here
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                                placeholder="Enter your email"
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <AnimatePresence>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {/* {errors.email.message} */}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                {...register('password')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10"
                                placeholder="Enter your password"
                            />
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {/* {errors.password.message} */}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Sign In
                    </motion.button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

