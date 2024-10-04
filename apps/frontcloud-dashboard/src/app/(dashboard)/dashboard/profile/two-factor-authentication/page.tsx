"use client";
import React, { useState } from 'react';
import PageWrapper from '../../_components/PageWrapper';
import SectionLayout from '@/components/common/CommonSectionLayout';
import { Mail, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import {
    Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';

// Zod schema for validation
const verificationSchema = z.object({
    email: z.string().email("Invalid email address").optional(),
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Only numeric values are allowed") // Ensure only digits
        .length(10, "Phone number must be exactly 10 digits") // Enforce 10 characters
        .optional(),
    otp: z.string().min(6, "Enter a valid OTP").max(6, "Enter a valid otp").optional()
});

type verificationFormValues = z.infer<typeof verificationSchema>;

interface TwoFactorAuthModalProps {
    type: string;
    onSubmit: (data: verificationFormValues) => void;
    isOtpSent: boolean;
    onVerifyOtp: (data: verificationFormValues) => void;
}

const TwoFactorAuthModal = ({ type, onSubmit, isOtpSent, onVerifyOtp }: TwoFactorAuthModalProps) => {
    const form = useForm<verificationFormValues>({
        resolver: zodResolver(verificationSchema),
        mode: "all"
    });

    const { control, formState: { errors }, handleSubmit } = form;

    return (
        <DialogContent className="sm:max-w-xl py-7">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Enter {type === 'email' ? 'Email' : 'Phone Number'}</DialogTitle>
                        <CustomFormField
                            fieldType={type === 'email' ? FormFieldType.INPUT : FormFieldType.PHONE_INPUT}
                            name={type === 'email' ? "email" : "phone"}
                            control={control}
                            placeholder={type === 'email' ? 'Email Address' : 'Mobile Number'}
                            className='ring-1 ring-gray-400'
                        />
                    </DialogHeader>

                    {isOtpSent ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                                <CustomFormField
                                    fieldType={FormFieldType.OTP_INPUT}
                                    name="otp"
                                    control={control}
                                    placeholder="Enter OTP"
                                    className='ring-1 ring-gray-400'
                                />
                            </DialogHeader>
                            <DialogFooter>
                                <Button onClick={handleSubmit(onVerifyOtp)} type="button">Verify OTP</Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <DialogFooter>
                            <Button type="submit">Send OTP</Button>
                        </DialogFooter>
                    )}
                </form>
            </Form>
        </DialogContent>
    );
};


const TwoFactorAuthentication = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [openModal, setOpenModal] = useState({ email: false, phone: false });

    const onSubmit = (data: verificationFormValues) => {
        console.log(`${data.email ? 'Email' : 'Phone'} submitted:`, data);
        setIsOtpSent(true);
        toast.success(`Check your ${data.email ? 'email' : 'phone'} for the OTP.`);
    };

    const onVerifyOtp = (data: verificationFormValues) => {
        console.log("OTP data verified:", data);
        setIsOtpSent(false);
        setOpenModal({ email: false, phone: false });
        toast.success("Two-factor authentication enabled.");
    };

    return (
        <PageWrapper title='Two-factor authentication' subTitle="Two-factor authentication protects your account with an extra security step.">
            <SectionLayout title='2FA'>

                {/* Email verification */}
                <VerificationSection
                    icon={<Mail />}
                    title="Email verification"
                    description="Verify your email address to enable two-factor authentication."
                    openModal={openModal.email}
                    setOpenModal={(open) => setOpenModal({ ...openModal, email: open })}
                    type="email"
                    onSubmit={onSubmit}
                    isOtpSent={isOtpSent}
                    onVerifyOtp={onVerifyOtp}
                />

                {/* Phone verification */}
                <VerificationSection
                    icon={<MessageSquareText />}
                    title="Phone verification"
                    description="Verify your mobile number to enable two-factor authentication."
                    openModal={openModal.phone}
                    setOpenModal={(open) => setOpenModal({ ...openModal, phone: open })}
                    type="phone"
                    onSubmit={onSubmit}
                    isOtpSent={isOtpSent}
                    onVerifyOtp={onVerifyOtp}
                />
            </SectionLayout>
        </PageWrapper>
    );
};

interface VerificationSectionProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    type: string;
    onSubmit: (data: verificationFormValues) => void;
    isOtpSent: boolean;
    onVerifyOtp: (data: verificationFormValues) => void;
}

const VerificationSection = ({ icon, title, description, openModal, setOpenModal, type, onSubmit, isOtpSent, onVerifyOtp }: VerificationSectionProps) => (
    <div className='bg-white w-full flex p-6 rounded-md border shadow-lg divide-x-2 mt-7'>
        <div className='p-6'>
            {icon}
        </div>
        <div className='pl-7 flex items-start w-full justify-between '>
            <div className='flex-1'>
                <Label>{title}</Label>
                <p className='text-gray-500 text-sm'>{description}</p>
            </div>
            <Button onClick={() => setOpenModal(true)}>Enable</Button>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <TwoFactorAuthModal
                    type={type}
                    onSubmit={onSubmit}
                    isOtpSent={isOtpSent}
                    onVerifyOtp={onVerifyOtp}
                />
            </Dialog>
        </div>
    </div>
);

export default TwoFactorAuthentication;
