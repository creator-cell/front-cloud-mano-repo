'use client';
import PageWrapper from '@/app/(dashboard)/dashboard/_components/PageWrapper';
import { useGetBannerByIdQuery } from '@/store/api/store/marketing';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const BannerPage = () => {
    const searchParams = useSearchParams()

    const id = searchParams.get("id");


    const { data } = useGetBannerByIdQuery(id ?? '')
    console.log("🚀 ~ CreateBanners ~ data:", data)
    return (
        <PageWrapper
            title="Create a banner"
            subTitle="Banners are a great way to advertise sales, display coupon codes and promotions, relay important information, and to add design elements such as images and video"
        >
            {/* {
            id ? data?.Data && data.Data.length && <BannerAddEditForm data={data?.Data?.[0]} id={id} /> : <BannerAddEditForm />
        } */}
            <div>

            </div>

        </PageWrapper>
    )
}

export default BannerPage

