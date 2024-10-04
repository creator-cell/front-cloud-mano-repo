"use client";
import React from 'react'

import ArticalImages from "@/assets/press/articalImages/index"
import ArtiCalContent from "@/enum/main/articals.json"
import Image from 'next/image'
import ContentCard from '@/components/common/ContentCard'


const Articals = () => {
    return (
        <div className='space-y-9 pb-12 '>
            {
                ArtiCalContent.articles.map((article, index) => (
                    <div key={index} className='flex flex-col gap-y-5 border rounded-md pl-2 pt-2'>
                        <div className='flex  max-sm:flex-col gap-x-5'>
                            <div className='md:w-[20%] max-w-[300px]'>
                                <Image
                                    src={ArticalImages[article.imageUrl as keyof typeof ArticalImages]}
                                    alt={article.title}
                                />

                            </div>
                            <div className='md:w-2/3'>
                                <ContentCard
                                    title={article.title}
                                    description={article.description}
                                    button={{
                                        text: 'Read More',
                                        onClick: () => { }
                                    }}
                                    date={article.date}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
            <Paginations />

        </div>
    )
}

export default Articals


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Paginations = () => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
