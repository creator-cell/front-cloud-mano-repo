import React from 'react';
import PageWrapper from '../../_components/PageWrapper';
import MarketingBannerTable from '@/components/dashboard/Marketing/MarketingBannerTable';
import { fetchAllBanners } from '@/server-apis/fetch-all-marketing-banners';

const BannerPage = async () => {

    const AllBannerData = await fetchAllBanners();
    console.log("🚀 ~ BannerPage ~ AllBannerData:", AllBannerData)


    return (
        <PageWrapper title='Create Banner' subTitle='Marketing Banners allow you to provide customers with discounts on products available for purchase from your store.'>
            {
                AllBannerData?.data && AllBannerData?.data?.length > 0 &&
                <MarketingBannerTable data={AllBannerData?.data} />
            }
        </PageWrapper>
    );
};

export default BannerPage;
