"use client";

import React, { use, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { ShoppingBag, House, ExternalLink, ChevronRight, ChevronLeft, Bell } from 'lucide-react';

import { logo, small_logo } from "@/assets/logo/index";

import { Sidebar, SidebarBody, useSidebar } from "@/components/ui/sidebar";
import { CustomHeading } from "@/components/custom/CustomHeading";
import SearchInput from "@/components/dashboard/SearchInput";
import { sidebarLinks } from "@/enum/sidebarlinks";
import { CustomParagraph } from "@/components/custom/CustomParagraph";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SideBarOpenCloseContext } from "@/hooks/useSideBarOpenClode";
import ActionBarLayout from "@/components/common/CommonActionBarLayout";
import useMediaQuery from "@/hooks/useMedia";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSideBar, closeSubSidebarLink, openSideBar, openSubSidebarLink } from "@/store/sidebar";



export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname()
    const router = useRouter()

    const { openedSidebarLink, isSideBarOpen } = useAppSelector(state => state.sidebar)

    const isTablet = useMediaQuery('(max-width: 1024px)');

    const dispatch = useAppDispatch()

    const handleSidebarToggle = () => {
        if (isSideBarOpen && !isTablet) {
            dispatch(closeSideBar());
        } else {
            dispatch(openSideBar());
        }
    };


    const sidebarSubLinks = useMemo(() => {
        // Find the category that matches the openedSidebarLink?.category
        const foundCategory = sidebarLinks.find(category => category.category === openedSidebarLink?.category);

        // If a category is found, then find the link that matches the openedSidebarLink?.label
        const foundLink = foundCategory?.links.find(link => link.label === openedSidebarLink?.label);

        // Return the subLinks of the found link, or an empty array if not found
        return foundLink ? foundLink.subLinks : [];
    }, [sidebarLinks, openedSidebarLink]);



    return (
        <div
            className={cn(
                "rounded-md flex flex-col lg:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={isSideBarOpen} setOpen={handleSidebarToggle} animate={false}  >
                <SidebarBody className="justify-between gap-10 bg-light_medium_blue-100 text-white">
                    {/* #338ba8 */}
                    <div className="flex flex-col gap-y-8 flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="h-auto  ">
                            {isSideBarOpen ?
                                <div className="flex px-4 items-start">
                                    <div className="flex items-center justify-center  w-full">
                                        <Logo />
                                    </div>
                                    <Button variant={"ghost"} className=" hover:bg-transparent px-0 py-0" onClick={() => { dispatch(closeSideBar()) }}>
                                        <ChevronLeft size={20} />
                                    </Button>
                                </div>
                                :
                                <div className="px-4">
                                    <LogoIcon />
                                </div>
                            }
                            {
                                isSideBarOpen &&
                                <div className="mt-8 flex flex-col gap-y-5 ">
                                    <>
                                        <div className="px-4">
                                            <CustomHeading variant={"small"} className="text-left  whitespace-nowrap" >Rabin Karmakar</CustomHeading>
                                            <Label className="text-left text-[13px]  whitespace-nowrap" >Trial Plan Store </Label>
                                        </div>

                                        <div className="flex flex-col gap-y-1 ">
                                            <div className="flex gap-2 items-center justify-between cursor-pointer hover:bg-gray-200 hover:text-black duration-200 py-1 px-2">
                                                <div className="flex items-center gap-2 ">
                                                    <ShoppingBag size={20} /> <Label size={"small"} className="text-left  whitespace-nowrap" >View Store</Label>
                                                </div>
                                                <ExternalLink size={20} />
                                            </div>
                                            <Link href={"/dashboard"} className={`flex gap-2 px-2 items-center justify-start cursor-pointer hover:bg-gray-300  ${pathName === "/dashboard" && "bg-gray-300 text-black"} duration-200 py-1  px-1`}>
                                                <House size={20} /> <Label size={"small"} className="text-left  whitespace-nowrap" >Home</Label>
                                            </Link>
                                            <div className="  w-[300x] mt-1 px-2" >
                                                {/* <TypewriterEffectSmooth words={words} /> */}
                                                <SearchInput />
                                            </div>
                                        </div>
                                    </>
                                </div>
                            }
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                        <div className={`cursor-pointer ${isSideBarOpen && "hidden"} px-4`} onClick={() => { dispatch(openSideBar()) }} >
                            <ChevronRight size={24} />
                        </div>
                        {
                            isSideBarOpen && (
                                <motion.div
                                    className="flex flex-col gap-y-1 overflow-hidden"
                                >
                                    {!openedSidebarLink ? (
                                        <div className="flex flex-col  overflow-y-auto overflow-x-hidden gap-y-1 white-scrollbar ">
                                            {
                                                sidebarLinks.map((category, index) => (
                                                    <div className="first:mt-0 mt-4 group" key={index} >
                                                        {category.links.map((link, index) => {
                                                            const isActive = pathName.split("/").includes(link.label.toLowerCase()) || pathName.split("/").includes(link.page.toLowerCase())
                                                            return (
                                                                <motion.div
                                                                    key={index}
                                                                    onClick={() => dispatch(openSubSidebarLink({ category: category.category, label: link.label }))}
                                                                    className={`w-full items-center group/link flex justify-between cursor-pointer first:mt-0 mt-1 py-1 px-3 hover:bg-gray-200 duration-100 hover:text-black  ${isActive ? "bg-gray-200 text-black " : "text-white"} duration-300`}
                                                                    initial={{ opacity: 0, x: 0 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: 0 }}
                                                                    transition={{ duration: 0.3 }}

                                                                >
                                                                    <Label size={"small"} className={`text-left  group-hover:cursor-pointer  whitespace-nowrap`}>
                                                                        {link.label}
                                                                    </Label>
                                                                    <ChevronRight size={20} className="group-hover/link:translate-x-1 duration-200 transform" />
                                                                </motion.div>
                                                            )
                                                        })}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-y-5 justify-start overflow-y-auto overflow-x-hidden">
                                            <motion.div
                                                onClick={() => dispatch(closeSubSidebarLink())}
                                                className="flex items-center justify-start gap-2 cursor-pointer"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronLeft size={24} />
                                                <CustomParagraph variant={"medium"} className="text-left text-white  whitespace-nowrap">
                                                    {openedSidebarLink.label}
                                                </CustomParagraph>
                                            </motion.div>
                                            <motion.div
                                                className="flex flex-col gap-y-1  items-center justify-start h-full overflow-y-auto overflow-x-hidden white-scrollbar"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {sidebarSubLinks.map((link, index) => {
                                                    const isActive = pathName === link.page
                                                    // console.log("🚀 ~ sidebarLinks.map ~ link.label.toLowerCase():", link.page.toLowerCase())
                                                    const subPageActive = link.subpage?.some(sub => pathName.startsWith(sub.page));

                                                    return (
                                                        <motion.div
                                                            key={index}
                                                            onClick={() => router.push(link.page)}
                                                            className={`w-full items-center flex justify-between  cursor-pointer  hover:text-black hover:bg-gray-200 ${isActive || subPageActive ? "bg-gray-200 text-black" : "text-white"} pl-6 py-1 `}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 20 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <Label size={"small"} className={`text-left cursor-pointer whitespace-nowrap`}>
                                                                {link.label}
                                                            </Label>
                                                        </motion.div>
                                                    )
                                                }
                                                )}
                                            </motion.div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        }
                    </div>
                    <div className="border-t pt-3 border-gray-300 px-4 ">
                        <Link href="/help" className="text-white text-left cursor-pointer whitespace-nowrap" >Help</Link>
                    </div>
                </SidebarBody>
            </Sidebar>
            {/* <DashboardContent /> */}


            <div className="flex flex-1 flex-col bg-muted  overflow-hidden   relative">

                <ActionBarLayout position="top">
                    <TopSection />
                </ActionBarLayout>
                <motion.div
                    className={`flex flex-col gap-2 overflow-auto mx-auto ${isSideBarOpen ? "px-6" : "pl-4"} `}
                    animate={{ width: isTablet ? "100vw" : isSideBarOpen ? 'calc(100vw - 301px)' : 'calc(100vw - 61px)' }}
                >
                    <div className="min-w-[1024px] max-w-screen-2xl mx-auto">
                        {children}
                    </div>

                </motion.div>
            </div>

        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium  dark:text-white whitespace-pre"
            >
                <Image
                    src={logo}
                    alt="BigCommerce Logo"
                    width={80}
                    height={80}
                />
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
        >
            <Image
                src={small_logo}
                alt="BigCommerce Logo"
                width={28}
                height={28}
            />
        </Link>
    );
};



const TopSection = () => {

    return (
        <div className="flex items-center justify-between w-full  px-4 py-2 h-10  ">
            <div className="flex gap-2 items-center">
                <Bell fill="blue" color="blue" />
                <CustomParagraph variant={"xmedium"} className="text-left  whitespace-nowrap" >Roger Owen</CustomParagraph>
            </div>
            <div className=" flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-200 w-6 h-8 flex items-center justify-center rounded-[3px] text-[13px]">
                            1
                        </div>
                        <div className="bg-gray-200  w-6 h-8 flex items-center justify-center rounded-[3px] text-[13px]">
                            5
                        </div>
                    </div>
                    <CustomParagraph variant={"small"} className="text-left text-gray-400 whitespace-nowrap" >Days left in your trial.</CustomParagraph>
                </div>
                <Button variant="default" className="text-white capitalize tracking-wider h-9 px-6">Select a Plan</Button>
            </div>
        </div>
    )
}
