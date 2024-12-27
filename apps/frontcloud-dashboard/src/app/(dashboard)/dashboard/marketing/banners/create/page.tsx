"use client";
import BannerPage from "@/components/dashboard/Marketing/BannerPage";
import React, { Suspense } from "react";

const CreateBanners = () => {

    return (

        <Suspense fallback={<div>Loading...</div>}>
            <BannerPage />
        </Suspense>
    );
};

export default CreateBanners;
