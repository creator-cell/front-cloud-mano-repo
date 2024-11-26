"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageWrapper from "../../../_components/PageWrapper";
import BannerAddEditForm from "@/components/dashboard/Marketing/BannerAddEditForm";
import { useGetBannerByIdQuery } from "@/store/api/store/marketing";

const CreateBanners = () => {
    const router = useRouter();

    const searchParams = useSearchParams()

    const id = searchParams.get("id");


    const { data } = useGetBannerByIdQuery(id ?? '')
    console.log("🚀 ~ CreateBanners ~ data:", data)


    return (
        <PageWrapper
            title="Create a banner"
            subTitle="Banners are a great way to advertise sales, display coupon codes and promotions, relay important information, and to add design elements such as images and video"
        >
            {
                id ? data?.Data && data.Data.length && <BannerAddEditForm data={data?.Data?.[0]} id={id} /> : <BannerAddEditForm />
            }

        </PageWrapper>
    );
};

export default CreateBanners;
