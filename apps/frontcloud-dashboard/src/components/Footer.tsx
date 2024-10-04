import React from 'react'
import { logo } from "@/assets/logo/index"
import Image from 'next/image'
import Link from 'next/link'

import { footerData } from "@/enum/main/index"

const Footer = () => {

    return (
        <footer className='bg-black text-gray-50  py-12 border-t-[1px] border-gray-600 '>
            <div className=' container space-y-8 '>
                <div className='flex justify-between items-start  w-full'>
                    <div className=''>
                        <Image src={logo} alt="logo" className='w-24 h-24' />
                    </div>

                    <div className='grid grid-cols-2 gap-6 '>

                        {footerData.find((data) => data.title === "FooterLinks")?.sections.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold mb-2">{section.section}</h3>
                                <ul className='space-y-1'>
                                    {section.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link href={link.href} className="hover:underline  text-[14px] font-[200]">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='space-y-2 flex flex-col items-center justify-center'>
                    <div className='flex items-center gap-x-3 text-[13px]'>
                        <Link href={"/#"} className='' >X</Link>
                        <Link href={"/#"} className='' >Facebook</Link>
                        <Link href={"/#"} className='' >LinkedIn</Link>
                        <Link href={"/#"} className='' >YouTube</Link>
                        <Link href={"/#"} className='' >Pinterest</Link>
                        <Link href={"/#"} className='' >Instagram</Link>
                    </div>

                    <div className="text-gray-100 font-[300] text-[12px] w-full text-center">
                        © Copyright 2003 - 2024 Front Cloud Pty. Ltd. |{' '}
                        <Link href="/privacy-policy" className="underline underline-offset-1">
                            Privacy Policy
                        </Link>{' '}
                        |{' '}
                        <Link href="/cookie-settings" className="underline underline-offset-1">
                            Cookie Settings
                        </Link>
                    </div>

                </div>
            </div >
        </footer >
    )
}

export default Footer
