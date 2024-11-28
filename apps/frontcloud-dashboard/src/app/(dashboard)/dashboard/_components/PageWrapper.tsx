"use client";
import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { LanguageContext, SupportedLanguages } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'
import React, { useContext } from 'react'

interface PageWrapperProps {
    title?: string
    subTitle?: string
    className?: string
    children: React.ReactNode
    childrenClassName?: string
    dir?: 'ltr' | 'rtl'
}

const PageWrapper = ({ title, subTitle, children, className, childrenClassName }: PageWrapperProps) => {

    const { state: { lang } } = useContext(LanguageContext)

    return (
        <div className={cn("w-full flex flex-col gap-y-6  py-20 min-h-screen ", className)}
            dir={lang === SupportedLanguages.English ? "ltr" : 'rtl'}
        >
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>{title}</CustomHeading>
                <CustomParagraph variant={"small"} className='text-gray-500 text-left'>{subTitle}</CustomParagraph>
            </div>
            <div className={cn('w-full', childrenClassName)}>
                {children}
            </div>

        </div >
    )
}

export default PageWrapper
