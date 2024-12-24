"use client";
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormValues, signUpSchema } from '@/zod/sign-up.schema';
import { useCreateUserMutation, useSendOtpMutation, useVerifyOtpMutation } from '@/Redux/api/user';
import { toast } from 'sonner';
import CustomFormField from '../common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { ActiveForm } from '../store/shared/Header';

interface SignUpFormProps {
    title: string;
    setActiveForm: Dispatch<SetStateAction<ActiveForm>>;
}

const SignUpForm = ({ title, setActiveForm }: SignUpFormProps) => {
    const [isOtpScreen, setIsOtpScreen] = useState(false); // Toggle for OTP screen
    const [email, setEmail] = useState<string | null>(null); // Store email during the flow
    const [SignUp, { isLoading: isSigningUp }] = useCreateUserMutation();
    const [SendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [VerifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: 'all',
        reValidateMode: 'onBlur',
    });

    const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = form;
    console.log("🚀 ~ SignUpForm ~ errors:", errors)

    // Step 1: Handle Send OTP
    const handleSendOtp = async (data: SignUpFormValues) => {
        console.log("🚀 ~ handleSendOtp ~ data:", data)

        const userEmail = watch('email');
        if (!userEmail) {
            toast.error('Please enter an email address.');
            return;
        }
        const promise = SendOtp({ Email: userEmail })
        try {
            const response = toast.promise(
                promise,
                {
                    loading: 'Sending OTP...',
                    success: 'OTP sent successfully!',
                    error: 'Failed to send OTP. Please try again.',
                }
            );
            console.log('OTP Sent Response:', response);
            setEmail(userEmail); // Store email for further API calls
            setIsOtpScreen(true); // Move to OTP screen
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    // Step 2: Handle Verify OTP
    const handleVerifyOtp = async (otp: string) => {
        if (!email) {
            toast.error('Email is missing. Please restart the process.');
            return;
        }
        try {
            const response = toast.promise(
                VerifyOtp({ Email: email, OTP: otp }),
                {
                    loading: 'Verifying OTP...',
                    success: (response) => {
                        console.log('OTP verified successfully:', response);
                        reset(); // Reset form after successful verification
                        setEmail(null); // Clear email after successful verification
                        setActiveForm("login"); // Move to login screen
                        return 'OTP verified successfully!';
                    },
                    error: 'Failed to verify OTP. Please try again.',
                }
            );
            console.log('OTP Verification Response:', response);

        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    // Step 3: Handle Sign Up
    const handleSignUp = async (data: SignUpFormValues) => {

        const modifiedData = {
            UserName: `${data.firstName} ${data.lastName}`,
            Email: data.email,
            Password: data.password,
            StoreId: 1,
            RoleName: "customer"
        };
        const userEmail = watch('email');
        try {
            toast.promise(
                SignUp(modifiedData).unwrap(),
                {
                    loading: 'Creating User...',
                    success: (response) => {
                        console.log('User created successfully:', response);
                        setEmail(userEmail);
                        setIsOtpScreen(true);
                        return 'User created successfully!';
                    },
                    error: (error) => {
                        console.error('Error signing up user:', error);
                        return 'Failed to create user. Please try again.';
                    },
                }
            );
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    return (
        <div className="w-full bg-white flex flex-col gap-y-5 px-3 py-2">
            <div>
                <h1 className="text-[25px] font-semibold text-dark-800 text-black text-center">
                    {title && title}
                </h1>
            </div>

            <Form {...form}>
                {isOtpScreen ? (
                    // OTP Screen
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleVerifyOtp(watch('otp') ?? "000000");
                        }}
                        className="space-y-6"
                    >
                        <CustomFormField
                            fieldType={FormFieldType.OTP_INPUT}
                            name="otp"
                            control={control}
                            placeholder="Enter OTP"
                            className="ring-1 ring-gray-300"
                        />
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6"
                            disabled={isVerifyingOtp}
                        >
                            {isVerifyingOtp ? 'Verifying OTP...' : 'Verify OTP'}
                        </Button>
                    </form>
                ) : (
                    // Sign Up Form
                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name="firstName"
                            control={control}
                            placeholder="First Name"
                            className="ring-1 ring-gray-300"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name="lastName"
                            control={control}
                            placeholder="Last Name"
                            className="ring-1 ring-gray-300"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name="email"
                            control={control}
                            placeholder="Email Address"
                            className="ring-1 ring-gray-300"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name="password"
                            type="password"
                            control={control}
                            placeholder="Password"
                            className="ring-1 ring-gray-300"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name="confirmPassword"
                            type="text"
                            control={control}
                            placeholder="Confirm Password"
                            className="ring-1 ring-gray-300"
                        />
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? 'Sending OTP...' : 'Send OTP'}
                        </Button>
                    </form>
                )}
            </Form>
        </div>
    );
};

export default SignUpForm;
