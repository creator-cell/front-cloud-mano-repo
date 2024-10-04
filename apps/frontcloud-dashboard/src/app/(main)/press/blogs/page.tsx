"use client";
import React from 'react'
import BlogContent from "@/enum/main/blog.json"
import ContentCard from '@/components/common/ContentCard';

const BlogPage = () => {
    return (
        <div className='space-y-2'>

            {
                BlogContent.blogs.map((blog, index) => (
                    <div key={index} className='flex flex-col gap-y-5 border rounded-md'>
                        <ContentCard
                            title={blog.title}
                            description={blog.description}
                            button={{
                                text: blog.linkText,
                                onClick: () => { }
                            }}
                            date={blog.date}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default BlogPage
