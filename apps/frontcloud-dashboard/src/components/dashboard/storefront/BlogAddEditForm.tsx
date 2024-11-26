"use client"
import React from 'react'
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

interface BlogAddEditFormProps {
    data?: BlogData;
    StoreBlogID?: string;
}

const BlogAddEditForm: React.FC<BlogAddEditFormProps> = ({
    data,
    StoreBlogID
}) => {

    const router = useRouter();

    const [CreateBlog, { isLoading }] = useCreateBlogMutation()

    const form = useForm<AddBlogFormValues>({
        resolver: zodResolver(addBlogSchema),
        mode: "all",
        defaultValues: data ? {
            ...data,
        } : {
            StoreID: "1",
            IsDraft: false
        }
    });

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;
    console.log("🚀 ~ BlogAddPage ~ watch:", watch("BlogTag"))

    console.log("errror", errors)
    const onSubmit = async (data: AddBlogFormValues) => {
        console.log("Form data:", data);
        try {
            const { Image, BlogTag, Seo, ...rest } = data;

            const formData = new FormData();

            // Append the basic fields
            Object.keys(rest).forEach((key) => {
                formData.append(key, data[key as keyof AddBlogFormValues]);
            });

            // Handle SEO fields individually
            if (Seo) {
                formData.append('Seo.MetaTitle', Seo.MetaTitle || '');
                formData.append('Seo.MetaKeywords', Seo.MetaKeywords || '');
                formData.append('Seo.MetaDescription', Seo.MetaDescription || '');
                formData.append('Seo.SearchKeywords', Seo.SearchKeywords || '');
            }

            // Handle tags: Check if blogTag has values and convert it to JSON
            if (BlogTag && BlogTag.length > 0) {
                formData.append('BlogTag', JSON.stringify(BlogTag));  // If you want to store tags as a string array
            } else {
                formData.append('BlogTag', '[]');  // Empty array if no tags
            }

            // Handle images if available
            if (Image && Image.length > 0) {
                Image.forEach((file: File) => {
                    formData.append('Image', file);
                });
            }

            // Use your API or mutation to send the data
            const promise = CreateBlog(formData).unwrap();

            // Show toast based on the promise's state
            toast.promise(promise, {
                loading: 'Creating Blog...',
                success: 'Blog Created Successfully',
                error: 'Error While Creating Blog',
            });

            try {
                // Await the result of the promise and perform redirection
                await promise;
                router.replace('/dashboard/storefront/blog');
            } catch (err) {
                console.error("Error while handling promise:", err);
            }

        } catch (err) {
            console.error("Error in onSubmit:", err);
        }
    };






    return (
        <Form {...form}>
            <form className="space-y-6 w-full px-0">
                <SectionLayout title='Content' className='w-full space-y-6 px-52'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"BlogTitle"}
                        control={control}
                        placeholder=' '
                        label='Title'
                        className='ring-1 ring-gray-300'
                    />
                    <div className=' h-[25rem]'>
                        <CustomFormField
                            fieldType={FormFieldType.RICHTEXTEDITOR}
                            name={"BlogBody"}
                            control={control}
                            placeholder=' '
                            label='Body'
                            className=''
                        />
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"BlogAuthor"}
                        control={control}
                        placeholder=' '
                        label='Auther'
                        className='ring-1 ring-gray-300'
                    />

                    <TagsInput
                        name='blogTag'
                        control={control}
                    />

                    <div className=' py-5 space-y-2'>
                        <CustomParagraph variant='medium' className=' text-black text-left'>Blog Image</CustomParagraph>
                        <div className='ring-1 ring-gray-200'>
                            <FileUpload
                                onChange={(files) => {
                                    setValue("Image", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                            />
                        </div>
                    </div>

                </SectionLayout>
                <SectionLayout title='Search Engine Optimization' className='space-y-4 px-52 '>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.MetaTitle"}
                        control={control}
                        placeholder=' '
                        label='Page Title'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.MetaKeywords"}
                        control={control}
                        placeholder=' '
                        label='Meta Keywords'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.MetaDescription"}
                        control={control}
                        placeholder=' '
                        label='Meta Description'
                        className='ring-1 ring-gray-300'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"Seo.SearchKeywords"}
                        control={control}
                        placeholder=' '
                        label='Search Keywords'
                        className='ring-1 ring-gray-300'
                    />

                    <ActionBarLayout>
                        <Button variant={"outline"} type='button' className='px-5' onClick={() => router.back()} >Calcle</Button>
                        {/* <Button type='button' className='px-4'>Save Draft</Button> */}
                        <Button type='button' disabled={isLoading} onClick={form.handleSubmit(onSubmit)} className='px-4'>Published Blog</Button>
                    </ActionBarLayout>

                </SectionLayout>
            </form>
        </Form>

    )
}

export default BlogAddEditForm



import { useState } from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CircleX } from 'lucide-react';
import { useCreateBlogMutation } from '@/store/api/store/marketing/blog';
import { toast } from 'sonner';
import { BlogData } from '@/store/api/store/marketing/types/blog-types';


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
        if (tag && !fields.some((field: any) => field === tag)) {
            append({ value: tag });
            // Append tag directly as a string
            setTag('');
        }
    };

    const handleRemove = (index: number) => {
        remove(index); // Directly remove by index
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
                    <div key={index} className="flex w-fit items-center gap-2 mb-2">
                        <Badge className="px-4 py-2 relative">
                            {field.value} {/* Since it's a string, render directly */}
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

