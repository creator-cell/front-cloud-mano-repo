"use client";
import React from 'react'
import PageWrapper from '../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { Button } from '@/components/ui/button';
import profileSchema, { ProfileFormValues } from '@/zod/profile/edit-profile.schema';

const LanguageOptions =
    [
        { label: 'English', value: 'en' },
        { label: 'Hindi', value: 'hi' },
        { label: 'Odia', value: 'or' },
    ]

const ProfilePage = () => {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            language: 'en'

        },
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"firstName"}
                            control={control}
                            placeholder='First Name'
                            label='First Name'
                            className='ring-1 ring-gray-400'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"lastName"}
                            control={control}
                            placeholder='Last Name'
                            label='Last Name'
                            className='ring-1 ring-gray-400'
                        />
                        <CustomFormField
                            control={control}
                            fieldType={FormFieldType.SELECT}
                            name="language"
                            defaultValue={LanguageOptions[0].value}
                            className=' focus:ring-0  '
                            selectOptions={LanguageOptions}
                            label='Language'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"email"}
                            control={control}
                            placeholder='Email Address'
                            label='Email Address'
                            className='ring-1 ring-gray-400'
                        />
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

export default ProfilePage


