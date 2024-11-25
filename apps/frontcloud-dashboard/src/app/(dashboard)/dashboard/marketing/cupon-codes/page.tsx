
import React, { useState } from "react";
import PageWrapper from "../../_components/PageWrapper";
import { fetchAllCoupons } from "@/server-apis/fetch-all-coupones";
import CouponTable from "@/components/dashboard/storefront/CouponCodesTable";


const page = async () => {

    const AllCoupons = await fetchAllCoupons();
    console.log("🚀 ~ CouponTable ~ AllCoupons:", AllCoupons)



    return (
        <PageWrapper
            title="Coupon codes"
            subTitle="Coupon codes allow you to provide customers with discounts on products available for purchase from your store."
        >
            {
                AllCoupons && AllCoupons?.Data &&
                <CouponTable data={AllCoupons?.Data} />
            }
        </PageWrapper>
    );
};

export default page;
