"use client"
import React, { useEffect, useRef } from 'react'
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

import { useState } from 'react';
import { useCreateBlogMutation, useUpdateBlogMutation } from '@/store/api/store/marketing/blog';
import { toast } from 'sonner';
import { BlogData } from '@/store/api/store/marketing/types/blog-types';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';



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
    const [UpdateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation()

    const form = useForm<AddBlogFormValues>({
        resolver: zodResolver(addBlogSchema),
        mode: "all",
        defaultValues: data ? {
            BlogTitle: data.BlogTitle,
            BlogBody: data.BlogBody ?? "",
            BlogAuthor: data.BlogAuthor,
            StoreID: data.StoreID.toString(),
            IsDraft: data.IsDraft && data.IsDraft === 1 ? true : false,
            BlogTag: data.BlogTag ?? "",
            Image: data.ImageURL,
            Seo: {
                MetaTitle: data.MetaTitle,
                MetaKeywords: data.MetaKeywords,
                MetaDescription: data.MetaDescription,
                SearchKeywords: data.SearchKeywords
            },
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
    console.log("🚀 ~ BlogAddPage ~ watch adasd--->>>:", watch("BlogTag"))

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


            try {

                if (data && StoreBlogID) {

                    const promise = UpdateBlog({ id: StoreBlogID, data: formData }).unwrap();

                    toast.promise(promise, {
                        loading: 'Updating Blog...',
                        success: 'Blog Updated Successfully',
                        error: 'Error While Updating Blog',
                    });

                    await promise;
                } else {

                    // Use your API or mutation to send the data
                    const promise = CreateBlog(formData).unwrap();

                    // Show toast based on the promise's state
                    toast.promise(promise, {
                        loading: 'Creating Blog...',
                        success: 'Blog Created Successfully',
                        error: 'Error While Creating Blog',
                    });
                    // Await the result of the promise and perform redirection
                    await promise;
                }
                router.replace('/dashboard/storefront/blog');
            } catch (err) {
                console.error("Error while handling promise:", err);
            }

        } catch (err) {
            console.error("Error in onSubmit:", err);
        }
    };




    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setValue("Image", files[0]); // Use `files[0]` as the selected image
        }
    };

    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input dialog
        }
    };

    const imageValue = watch("Image"); // Either a file object or a hosted URL
    const isFile = imageValue instanceof File; // Check if the value is a File object
    const imageUrl = isFile ? URL.createObjectURL(imageValue) : imageValue; // Generate preview if file, else use the URL



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
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"BlogTag"}
                        control={control}
                        placeholder='eg: tag1, tag2, tag3'
                        label='Blog Tags'
                        className='ring-1 ring-gray-300'
                    />


                    <div className="py-5 space-y-2 group">
                        <CustomParagraph variant="medium" className="text-black text-left">
                            Blog Image
                        </CustomParagraph>
                        {watch("Image") ? (
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={imageUrl}
                                    alt="blog image"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        right: "0",
                                        bottom: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        borderRadius: "4px",
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                    onClick={handleEditClick}
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        style={{ color: "white" }}
                                        className="hover:bg-transparent"
                                    >
                                        <PencilIcon />
                                    </Button>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        ) : (
                            <div className="ring-1 ring-gray-200">
                                <FileUpload
                                    onChange={(files) => {
                                        setValue("Image", files[0]); // Ensure you get the first file only
                                    }}
                                    fileType={FileType.ANY_IMAGE}
                                />
                            </div>
                        )}
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
                        <Button type='button' disabled={isLoading} onClick={form.handleSubmit(onSubmit)} className='px-4'>{data && StoreBlogID ? "Update" : "Create"}</Button>
                    </ActionBarLayout>

                </SectionLayout>
            </form>
        </Form>

    )
}

export default BlogAddEditForm


