"use client";
import { Button } from '@/components/ui/button'
import { Heart, Search, SearchIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { logo } from "@/assets/logo/index"
import { Badge } from '@/components/ui/badge'
import useScroll from '@/hooks/useScroll';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';


import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion } from "framer-motion";
import LoginForm from '@/components/auth/LoginForm';

type ActiveForm = "login" | "register" | "forgot-password";

const Header = () => {
    const isSticky = useScroll();


    const [activeForm, setActiveForm] = useState<ActiveForm>("login");

    const AuthForm = ({ activeForm }: { activeForm: ActiveForm }) => {
        switch (activeForm) {
            case "login":
                return <LoginForm title='Login' />;
            case "register":
                return <SignUpForm title='Create an account' />;
            case "forgot-password":
            // return <ForgotPasswordForm title='Forgot password' />;
            default:
                return null;
        }
    };



    return (
        <div className={cn('z-[80] bg-store-primary relative pb-3 h-20',
            {
                'sticky top-0 shadow-md': isSticky,
            }
        )}>
            <div className='container w-full pt-3 px-0 h-16 flex items-center  justify-between  '>
                <Link href={"/"} className='flex items-center gap-2 ml-2'>
                    <div className='w-20 h-20 aspect-square'>
                        <Image
                            src={logo}
                            alt="logo"
                            width={100}
                            height={100}
                            className='  '
                        />
                    </div>
                </Link>
                <div className=" hidden sm:flex items-center justify-center flex-1 w-full">
                    <div className='border rounded-md flex items-center pl-4 gap-1 bg-white w-full max-w-xl'>
                        <Input placeholder='Search' className='w-full border-none focus:ring-0' />
                        <Button variant='ghost' className='border-none hover:bg-inherit'>
                            <SearchIcon size={20} className='cursor-pointer' />
                        </Button>
                    </div>
                </div>
                <div className='text-lg flex  gap-2 items-center font-semibold mr-2'>
                    <Search size={20} className='block sm:hidden cursor-pointer' />
                    <Button variant={"ghost"} className='relative group'>
                        <ShoppingCart size={20} className='text-white cursor-pointer relative group-hover:text-black duration-150' />
                    </Button>
                    <Button variant={"ghost"} className='relative group' asChild>
                        <Link href='/wishlist'>
                            <Heart size={20} className='text-white cursor-pointer relative group-hover:text-black duration-100' />
                        </Link>
                    </Button>
                    <Modal>
                        <ModalTrigger variant={"outline"}>
                            Login
                        </ModalTrigger>
                        <ModalBody className='!p-0 border-none  min-h-[80%]'>
                            <ModalContent className='grid grid-cols-1 xsm:grid-cols-7 gap-3 xsm:gap-0 sm:gap-3 !p-0 items-center'>
                                <div className='col-span-3 overflow-hidden max-xsm:hidden h-full '>
                                    <SideImages />
                                </div>
                                <div className='col-span-4 px-6 xsm:px-0 sm:px-6  flex flex-col items-center justify-center '>
                                    {/* render form here  */}
                                    <AuthForm activeForm={activeForm} />
                                    <div className='w-full flex items-center justify-between text-gray-500 max-w-sm px-4'>
                                        {
                                            activeForm === "login" ? (
                                                <div className='flex gap-2 '>
                                                    <h1 className='text-[12px] cursor-pointer max-xsm:hidden'>Do&apos;t have an account</h1>
                                                    <Button onClick={() => setActiveForm("register")} variant='ghost' className='text-primary text-[14px] p-0 h-fit hover:bg-transparent hover:text-primary hover:underline'>sign Up</Button>
                                                </div>
                                            ) : activeForm === "register" ? (
                                                <div className='flex gap-2'>
                                                    <h1 className='text-[12px] cursor-pointer max-xsm:hidden '>Already have an account</h1>
                                                    <Button onClick={() => setActiveForm("login")} variant='ghost' className='text-primary text-[14px] p-0 h-fit hover:bg-transparent hover:text-primary hover:underline'>Login</Button>
                                                </div>
                                            ) : activeForm === "forgot-password" ? (
                                                <div className='flex gap-2'>
                                                    <h1 className=' text-[12px] cursor-pointer'>Already have an account</h1>
                                                    <Button onClick={() => setActiveForm("login")} variant='ghost' className='text-primary text-[14px] p-0 h-fit hover:bg-transparent hover:text-primary hover:underline'>Login</Button>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            activeForm === "forgot-password" ? null : (
                                                <Button onClick={() => setActiveForm("forgot-password")} variant='ghost' className='text-primary text-[14px] p-0 h-fit hover:bg-transparent hover:text-primary hover:underline'>Forgot?</Button>
                                            )
                                        }
                                    </div>

                                </div>
                            </ModalContent>
                        </ModalBody>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default Header

const SideImages = () => {
    return (
        <div className='h-full w-full'>
            <Image
                src={images[0]}
                className="h-full w-full object-cover "
                height="800"
                width="500"
                alt="thumbnail"
            />
        </div>
    )
}


import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import SignUpForm from '@/components/auth/SignUpForm';

export function ParallaxScrollDemo() {
    return <ParallaxScroll images={images} />;
}

const images = [
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
];
