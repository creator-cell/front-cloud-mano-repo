"use client"

import React, { Suspense } from 'react'
import LogoPage from '@/components/dashboard/storefront/LogoPage';

const Logo = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LogoPage />
        </Suspense>
    )
}



export default Logo
