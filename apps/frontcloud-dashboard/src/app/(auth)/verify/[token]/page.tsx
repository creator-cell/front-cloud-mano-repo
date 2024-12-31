"use client";
import React from 'react';
import ActiveAccount from '@/components/ActiveAccount';


export default async function Page({
    params,
}: {
    params: Promise<{ token: string }>
}) {
    const token = (await params).token

    return (
        <>
            {
                token ? <ActiveAccount token={token} /> : <div>Invalid token</div>
            }
        </>
    )
}
