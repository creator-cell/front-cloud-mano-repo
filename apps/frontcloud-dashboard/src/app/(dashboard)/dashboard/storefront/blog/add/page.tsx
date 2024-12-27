"use client"
import React, { Suspense } from 'react'
import BlogPage from '@/components/dashboard/storefront/BlogPage';

const BlogAddPage = () => {

    return (

        <Suspense fallback={<div>Loading...</div>}>

            <BlogPage />
        </Suspense>
    )
}

export default BlogAddPage

