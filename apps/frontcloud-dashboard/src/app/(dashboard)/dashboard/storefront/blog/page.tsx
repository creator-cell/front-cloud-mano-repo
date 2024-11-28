
import React from 'react'
import PageWrapper from '../../_components/PageWrapper'
import BlogTable from '@/components/dashboard/storefront/BlogTable'
import { fetchAllBlogposts } from '@/server-apis/fetch-all-blogposts'

const BlogPage = async () => {

    const allBlogPoosts = await fetchAllBlogposts()
    console.log("🚀 ~ BlogPage ~ allBlogPoosts:", allBlogPoosts)

    return (
        <PageWrapper title='Blog' >
            {
                allBlogPoosts?.Data && allBlogPoosts?.Data?.length > 0 &&
                <BlogTable data={allBlogPoosts.Data} />
            }
        </PageWrapper>
    )
}

export default BlogPage



