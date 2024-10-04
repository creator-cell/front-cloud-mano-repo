"use client";
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { CustomHeading } from '../custom/CustomHeading';

// Zod schema for validation
const verificationSchema = z.object({
    email: z.string().email("Invalid email address").optional(),
    otp: z.string().min(6, "Enter a valid OTP").max(6, "Enter a valid otp").optional()
});

type verificationFormValues = z.infer<typeof verificationSchema>;

interface ForgotPasswordFormProps {
    title: string;
}

const ForgotPasswordForm = ({ title }: ForgotPasswordFormProps) => {

    const [isOtpSent, setIsOtpSent] = useState(false);

    const form = useForm<verificationFormValues>({
        resolver: zodResolver(verificationSchema),
        // mode: "all"
    });


    const { control, formState: { errors }, handleSubmit } = form;

    const onSubmit = (data: verificationFormValues) => {
        console.log(`${data.email ? 'Email' : 'Phone'} submitted:`, data);
        setIsOtpSent(true);
        toast.success(`Check your ${data.email ? 'email' : 'phone'} for the OTP.`);
    };


    const onVerifyOtp = (data: verificationFormValues) => {
        console.log("OTP data verified:", data);
        setIsOtpSent(false);
        toast.success("Two-factor authentication enabled.");
    };


    return (
        <div className='w-full max-w-sm space-y-6 px-4'>
            <CustomHeading variant={'small'} className='text-black'>{title}</CustomHeading>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"email"}
                        control={control}
                        disabled={isOtpSent}
                        placeholder={'Email Address'}
                        label='Enter your Email'
                        className='ring-1 ring-gray-400'
                    />

                    {isOtpSent ? (
                        <div className='space-y-5'>
                            <CustomFormField
                                fieldType={FormFieldType.OTP_INPUT}
                                name="otp"
                                control={control}
                                label='Enter OTP'
                                className='ring-1 ring-gray-400'
                            />
                            <Button onClick={handleSubmit(onVerifyOtp)} type="button">Verify OTP</Button>
                        </div>
                    ) : (
                        <div className='mt-4'>
                            <Button type="submit">Send OTP</Button>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm;
