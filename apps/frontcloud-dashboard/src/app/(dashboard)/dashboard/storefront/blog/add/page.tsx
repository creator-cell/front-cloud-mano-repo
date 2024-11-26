"use client"
import React from 'react'
import PageWrapper from '../../../_components/PageWrapper'
import { useRouter, useSearchParams } from 'next/navigation';
import BlogAddEditForm from '@/components/dashboard/storefront/BlogAddEditForm';
import { useGetBlogByIdQuery } from '@/store/api/store/marketing/blog';

const BlogAddPage = () => {

    const router = useRouter();

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

export default BlogAddPage

