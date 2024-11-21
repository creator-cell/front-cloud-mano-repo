
import React from 'react'
import PageWrapper from '../../_components/PageWrapper'
import BlogTable from '@/components/dashboard/storefront/BlogTable'
import { fetchAllBlogposts } from '@/server-apis/fetch-all-blogposts'

const BlogPage = async () => {

    const allBlogPoosts = await fetchAllBlogposts()

    return (
        <PageWrapper title='Blog'>
            {
                allBlogPoosts?.data && allBlogPoosts?.data?.length > 0 &&
                <BlogTable data={allBlogPoosts.data} />
            }
        </PageWrapper>
    )
}

export default BlogPage



