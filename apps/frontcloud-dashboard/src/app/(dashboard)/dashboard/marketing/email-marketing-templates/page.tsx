"use client"
import React from 'react'
import PageWrapper from '../../_components/PageWrapper'
import SectionLayout from '@/components/common/CommonSectionLayout'
import { Ellipsis, PenLineIcon, ShieldBan } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const EmailTemplatePage = () => {
    const router = useRouter()
    return (
        <PageWrapper title='Email Templates'>
            <SectionLayout title='Templates' className='px-8' >
                <div className='flex items-center justify-between shadow-lg px-4 py-3 rounded-md border'>
                    <div>
                        <h2 className='text-2xl font-semibold'>Account Settings Edited</h2>
                        <p className='text-sm text-gray-500'>Sent when a customer or store admin edits account settings</p>

                    </div>

                    <div className='flex items-center gap-x-6'>
                        <Badge className='uppercase'>
                            Enabled
                        </Badge>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Ellipsis size={20} color="green" className='cursor-pointer' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/dashboard/marketing/email-marketing-templates/edit")}>
                                        <PenLineIcon className="mr-2 h-4 w-4" />
                                        <span>
                                            Edit
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <ShieldBan className="mr-2 h-4 w-4" />
                                        <span>Disable</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </SectionLayout>
        </PageWrapper>
    )
}

export default EmailTemplatePage
