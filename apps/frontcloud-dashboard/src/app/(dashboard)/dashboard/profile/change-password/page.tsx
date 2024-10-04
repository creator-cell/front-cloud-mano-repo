"use client";
import React from 'react'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { Button } from '@/components/ui/button';
import PageWrapper from '../../_components/PageWrapper';
import changePasswordSchema, { ChangePasswordFormValues } from '@/zod/profile/change-password.schema';

const ChangePasswordPage = () => {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };

    return (
        <PageWrapper>
            <SectionLayout title='My Profile'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 ">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"current_password"}
                            control={control}
                            placeholder='Current Password'
                            label="Current Password"
                            className='ring-1 ring-gray-400'
                        />
                        <div className='space-y-7 '>
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"new_password"}
                                control={control}
                                placeholder='New Password'
                                label='New Password'
                                className='ring-1 ring-gray-400'
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={"confirm_password"}
                                control={control}
                                placeholder='Confirm Password'
                                label='Confirm Password'
                                className='ring-1 ring-gray-400'
                            />
                        </div>
                        <ActionBarLayout>
                            <Button variant="ghost" className="text-gray-500 h-9 px-6">Cancle</Button>
                            <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Save</Button>
                        </ActionBarLayout>
                    </form>
                </Form>
            </SectionLayout>

        </PageWrapper>
    )
}

export default ChangePasswordPage


