"use client"
import React from 'react'
import PageWrapper from '../../../_components/PageWrapper'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import SectionLayout from '@/components/common/CommonSectionLayout';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { CustomParagraph } from '@/components/custom/CustomParagraph';
import { FileUpload } from '@/components/ui/file-upload';
import { FileType } from '@/enum/fileTypes';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { Button } from '@/components/ui/button';
import addBlogSchema, { AddBlogFormValues } from '@/zod/storefront/blog-add.schema';

const BlogAddPage = () => {

    const router = useRouter();

    const form = useForm<AddBlogFormValues>({
        resolver: zodResolver(addBlogSchema),
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };
    return (
        <PageWrapper title='New Blog Post' className='max-w-5xl'>
            <Form {...form}>
                <form className="space-y-6 w-full px-0">
                    <SectionLayout title='Content' className='w-full space-y-6 px-52'>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"title"}
                            control={control}
                            placeholder=' '
                            label='Title'
                            className='ring-1 ring-gray-300'
                        />
                        <div className=' h-[25rem]'>
                            <CustomFormField
                                fieldType={FormFieldType.RICHTEXTEDITOR}
                                name={"body"}
                                control={control}
                                placeholder=' '
                                label='Body'
                                className=''
                            />
                        </div>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"auther"}
                            control={control}
                            placeholder=' '
                            label='Auther'
                            className='ring-1 ring-gray-300'
                        />

                        <TagsInput
                            name='tags'
                            control={control}
                        />

                        <div className=' py-5 space-y-2'>
                            <CustomParagraph variant='medium' className=' text-black text-left'>Blog Image</CustomParagraph>
                            <div className='ring-1 ring-gray-200'>
                                <FileUpload
                                    onChange={(files) => {
                                        setValue("images", files);
                                    }}
                                    fileType={FileType.ANY_IMAGE}
                                />
                            </div>
                        </div>

                    </SectionLayout>
                    <SectionLayout title='Search Engine Optimization' className='space-y-4 px-52 '>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"pageTitle"}
                            control={control}
                            placeholder=' '
                            label='Page Title'
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"metaKeywords"}
                            control={control}
                            placeholder=' '
                            label='Meta Keywords'
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"metaDescription"}
                            control={control}
                            placeholder=' '
                            label='Meta Description'
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"searchKeywords"}
                            control={control}
                            placeholder=' '
                            label='Search Keywords'
                            className='ring-1 ring-gray-300'
                        />

                        <ActionBarLayout>
                            <Button variant={"outline"} type='button' className='px-5' onClick={() => router.back()} >Calcle</Button>
                            <Button type='button' className='px-4'>Save Draft</Button>
                            <Button type='button' onClick={form.handleSubmit(onSubmit)} className='px-4'>Published Blog</Button>
                        </ActionBarLayout>

                    </SectionLayout>
                </form>
            </Form>

        </PageWrapper>
    )
}

export default BlogAddPage



import { useState } from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CircleX } from 'lucide-react';


interface TagsInputProps {
    name: string;
    control: Control<AddBlogFormValues>;
    label?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({ name, control, label }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    const [tag, setTag] = useState('');

    const addTag = () => {
        if (tag && !fields.some((field: any) => field.value === tag)) {
            append({ value: tag }); // Append tag as a value string
            setTag('');
        }
    };

    const handleRemove = (index: number) => {
        remove(index);
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">{label}</label>
            )}

            <div className="flex gap-2">
                <Input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Add a tag"
                    className="ring-1 ring-gray-300"
                />
                <Button type="button" onClick={addTag}>
                    Add
                </Button>
            </div>

            <div className="mt-2 w-full flex flex-wrap gap-5">
                {fields.map((field: any, index) => (
                    <div key={field.id} className="flex w-fit items-center gap-2 mb-2">
                        <Badge className="px-4 py-2 relative">
                            {field.value}
                            <CircleX
                                color="white"
                                onClick={() => handleRemove(index)}
                                className="absolute -top-2 -right-2 cursor-pointer"
                                fill="red"
                            />
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );
};
