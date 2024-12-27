"use client"
import PageWrapper from '@/app/(dashboard)/dashboard/_components/PageWrapper';
import { useGetBlogByIdQuery } from '@/store/api/store/marketing/blog';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import BlogAddEditForm from './BlogAddEditForm';

const BlogPage = () => {


    const searchParams = useSearchParams();

    const id = searchParams.get('id');


    const { data } = useGetBlogByIdQuery(id ?? "")
    console.log("🚀 ~ BlogAddPage ~ data:", data)

    return (
        <PageWrapper title='New Blog Post' className='max-w-5xl'>

            {
                id ? data?.Data && data?.Data?.length > 0 && < BlogAddEditForm data={data?.Data?.[0]} StoreBlogID={id} /> : <BlogAddEditForm />
            }

        </PageWrapper>
    )
}

export default BlogPage
