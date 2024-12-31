"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { logo, small_logo } from "@/assets/logo/index"
import { Button } from './ui/button'
import { ChevronDown, Menu } from 'lucide-react';
import { Plus } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { countryList } from '@/assets/data/countryData';

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MegaMenuData } from '@/assets/data/megamenuData';
import useMediaQuery from '@/hooks/useMedia';
import { useRouter } from 'next/navigation';
import useScroll from '@/hooks/useScroll';



const Nav = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 640px)');
    const isSticky = useScroll()


    const [openCountry, setOpenCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(0);



    const handleCountrySelect = (index: number) => {
        setSelectedCountry(index);
        setOpenCountry(false);
    };

    console.log("Component Rendered");

    return (
        <>
            {
                isSticky &&
                <div className='w-full h-24' />
            }
            {
                openMenu ?
                    <MobileNavBar isMobile={isMobile} openMenu={openMenu} setOpenMenu={setOpenMenu} />
                    :
                    <div className={` flex flex-col  bg-white w-full text-deep_blue-100 ${isSticky ? 'fixed z-40 top-0 border-b border-deep_blue-300 shadow-md' : ''}`}>
                        <nav className=' container w-full h-24 flex items-center justify-between'>
                            <div className='flex gap-12 items-center h-full '>
                                <Link href={"/"}>
                                    <Image
                                        src={isMobile ? small_logo : logo}
                                        alt="logo"
                                        width={isMobile ? 40 : 80}
                                        height={30}
                                    />
                                </Link>
                                <div className='flex gap-4 h-full items-end max-lg:hidden'>

                                    {
                                        MegaMenuData.map((menu, index) => (
                                            <div key={index}
                                                // onMouseEnter={() => handleMouseEnter(index)}
                                                // onMouseLeave={handleMouseLeave}
                                                className='relative group/parent h-full flex items-center hover:bg-gray-200 cursor-pointer justify-center'>
                                                <h1
                                                    className='capitalize text-[13px] font-[500]   px-3'>
                                                    {
                                                        menu?.link ?
                                                            <Link href={menu.link} className=''>
                                                                {menu?.title}
                                                            </Link>
                                                            :
                                                            <>
                                                                {menu?.title}
                                                            </>
                                                    }
                                                </h1>
                                                {
                                                    menu.subMenu.length > 0 &&
                                                    <div className={`absolute left-0 z-50 top-full  py-8 bg-white min-w-max text-left  border-l-4 border-primary group-hover/parent:flex hidden shadow-md gap-9`}>
                                                        {
                                                            menu.subMenu.map((subMenu, subIndex) => (
                                                                <div
                                                                    key={subIndex}
                                                                    className='flex flex-col  gap-4 min-w-max  w-full  z-20 '>
                                                                    <h1 className='text-[13px] font-[500] text-gray-300 pl-8 '>{subMenu.title}</h1>
                                                                    {
                                                                        subMenu.menu.map((item, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className='relative w-full group/child min-w-[250px] pl-8 z-20'
                                                                            // onMouseEnter={() => {
                                                                            //     if (item?.subSubMenu?.length && item?.subSubMenu?.length > 0) {
                                                                            //         handleSubMenuEnter(subIndex);
                                                                            //     }
                                                                            // }}
                                                                            // onMouseLeave={() => {
                                                                            //     if (item?.subSubMenu?.length && item?.subSubMenu?.length > 0) {
                                                                            //         handleSubMenuLeave();
                                                                            //     }
                                                                            // }}
                                                                            >
                                                                                <Link href={item.link} className=''>
                                                                                    <h1 className='text-[13px] font-[500]  hover:underline '>{item.title}</h1>
                                                                                </Link>
                                                                                {/* SubSubMenu  */}
                                                                                {item?.subSubMenu?.length && item?.subSubMenu?.length > 0 && (
                                                                                    <div
                                                                                        className={`absolute top-0 bg-white  z-20 min-w-[140px] shadow-md border-l-4 border-primary hidden group-hover/child:block  `}
                                                                                        style={{ left: 'calc(100%)' }}
                                                                                    >
                                                                                        {item?.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                                                                                            <Link key={subSubIndex} href={subSubMenuItem.link} className=''>
                                                                                                <h1 className="text-[13px] font-[500]  hover:underline px-4 my-2 py-1">
                                                                                                    {subSubMenuItem.title}
                                                                                                </h1>
                                                                                            </Link>
                                                                                        ))}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='flex gap-6 max-md:gap-4 items-center '>
                                <div
                                    // onMouseEnter={handleMouseEnterCountry}
                                    // onMouseLeave={handleMouseLeaveCountry}
                                    className='relative flex gap-2 group items-center cursor-pointer'
                                >
                                    {/* country */}
                                    <div className='flex gap-2 items-center px-4 h-8'>
                                        <Image
                                            src={countryList[selectedCountry].flag}
                                            alt="country"
                                            width={20}
                                            height={20}
                                        />
                                        <ChevronDown size={12} />
                                    </div>
                                    <div className={`absolute left-2 top-[100%] z-20 bg-white w-44 group-hover:block hidden  shadow-md`}>
                                        {
                                            countryList.map((country, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2 items-center py-1 cursor-pointer h-8 px-2 hover:bg-gray-300 rounded-sm transition duration-200"
                                                    onClick={() => handleCountrySelect(index)}
                                                >
                                                    <Image
                                                        src={country.flag}
                                                        alt="country"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <h1 className='text-[.75rem] text-gray-500 hover:text-gray-700 font-[500] capitalize '>
                                                        {country.name}
                                                    </h1>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <Button asChild variant="default" className='uppercase text-[0.875rem] leading-[1.375rem] font-medium tracking-[0.05em] py-2 px-6 max-md:px-3 max-sm:py-0' >
                                        <Link href={"/sign-up"}>Get Started</Link>
                                    </Button>
                                </div>
                                <Link href={"/sign-in"} className='text-[.75rem] text-gray-500 hover:text-gray-700 cursor-pointer leading-9 font-[500] capitalize'>Log in</Link>

                                <div className='lg:hidden'>
                                    <Menu size={32} onClick={() => setOpenMenu(true)} />
                                </div>
                            </div>
                        </nav>
                    </div>
            }
        </>
    )
}

export default Nav

interface MobileNavBarProps {
    openMenu: boolean;
    setOpenMenu: (value: boolean) => void;
    isMobile: boolean;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({
    openMenu,
    setOpenMenu,
    isMobile
}) => {

    const router = useRouter()

    return (
        <Sheet onOpenChange={setOpenMenu} open={openMenu}  >
            <SheetContent className='flex flex-1 flex-col bg-white min-h-0' >
                <div className=' w-full gap-6   flex h-24 items-center  justify-between px-2 pr-[1.6rem]'>
                    <Link href={"/"}>
                        <Image
                            src={isMobile ? small_logo : logo}
                            alt="logo"
                            width={isMobile ? 40 : 80}
                            height={30}
                        />
                    </Link>
                    <div className='flex gap-5 items-center '>
                        <div>
                            <Button variant="default" className='uppercase text-[0.875rem] leading-[1.375rem] font-medium tracking-[0.05em] py-2 px-6 max-sm:py-0' >Request a Demo</Button>
                        </div>
                        {/* <SheetTrigger className='lg:hidden'>
                            <Plus size={32} className='rotate-45' />
                        </SheetTrigger> */}
                    </div>
                </div>

                <nav className=' bg-white  flex flex-1  flex-col  overflow-y-auto '>
                    <div className=' flex-1 container '>
                        <Accordion type="single" collapsible >
                            {
                                MegaMenuData.map((menu, index) => {

                                    const isContent = menu.subMenu.length > 0;
                                    return (
                                        isContent ?
                                            <AccordionItem key={index} value={`item-${index}`}>
                                                <AccordionTrigger className='text-gray-500'>{menu?.title}</AccordionTrigger>
                                                {
                                                    menu.subMenu.length > 0 &&
                                                    <AccordionContent>
                                                        <div className={` min-w-max flex gap-9`}>
                                                            {
                                                                menu.subMenu.map((subMenu, index) => (
                                                                    <div
                                                                        key={index}
                                                                        // onClick={() => router.push(subMenu.link)}
                                                                        className='flex flex-col gap-4 p-2 min-w-[140px]'>
                                                                        <h1 className='text-[13px] font-[500] text-gray-400'>{subMenu.title}</h1>
                                                                        {
                                                                            subMenu.menu.map((item, index) => (
                                                                                <Link key={index} href={item.link}>
                                                                                    <h1 className='text-[13px] font-[500] text-gray-700 hover:underline'>{item.title}</h1>
                                                                                </Link>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </AccordionContent>
                                                }
                                            </AccordionItem>
                                            :
                                            <h1 className=' font-[500] text-gray-500  mt-4'>{menu.title}</h1>
                                    )
                                }
                                )
                            }
                        </Accordion>
                    </div>
                    <div className=' flex flex-col   container gap-4 relative py-5 px-6 border-t-[1px] border-gray-200 ' >
                        <h1 className='text-[.85rem] text-gray-700 cursor-pointer  font-[500] capitalize  '>call sales : 1-888-248-9325</h1>
                        <h1 className='text-[.85rem] text-gray-700 cursor-pointer  font-[500] capitalize '>Help center</h1>
                        <Link href={"/login"} className='text-[.85rem] text-gray-700  cursor-pointer font-[500] capitalize '>Log in</Link>
                    </div>

                    <div className='w-full border-t-[1px] border-gray-200 pt-3 container'>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-12">
                                <AccordionTrigger className='gap-4 flex items-center justify-start '>
                                    <div className='flex gap-2 items-center'>
                                        <Image
                                            src={countryList[0].flag}
                                            alt="country"
                                            width={20}
                                            height={20}
                                        />
                                        change country
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent >
                                    {
                                        countryList.map((country, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2 items-center py-1 cursor-pointer h-8 px-2 pl-4 hover:bg-gray-300 rounded-sm transition duration-200"
                                            // onClick={() => router.push(i)}
                                            >
                                                <Image
                                                    src={country.flag}
                                                    alt="country"
                                                    width={20}
                                                    height={20}
                                                />
                                                <h1 className='text-[.75rem] text-gray-500 hover:text-gray-700 font-[500] capitalize '>
                                                    {country.name}
                                                </h1>
                                            </div>
                                        ))
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}