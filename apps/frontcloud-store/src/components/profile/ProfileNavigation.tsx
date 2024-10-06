import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { FaUser, FaShoppingBag, FaHeart, FaCreditCard, FaAddressBook, FaRegUser, FaClock } from 'react-icons/fa';
import { TbLayoutDashboard, TbLayoutDashboardFilled } from "react-icons/tb";
import { IoBagHandleOutline, IoBagHandleSharp } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { PiAddressBookLight } from "react-icons/pi";
import { GrCreditCard } from "react-icons/gr";

interface NavigationLink {
    name: string;
    icon: IconType;
    activeIcon: IconType;
    link: string;
}
const NavigationLinks: NavigationLink[] = [
    {
        name: 'Dashboard',
        icon: TbLayoutDashboard,
        activeIcon: TbLayoutDashboardFilled,
        link: '/profile'
    },
    {
        name: 'Orders',
        icon: IoBagHandleOutline,
        activeIcon: IoBagHandleSharp,
        link: '/profile/orders'
    },
    {
        name: 'Wishlist',
        icon: LuHeart,
        activeIcon: FaHeart,
        link: '/profile/wishlist'
    },
    {
        name: 'Saved Cards',
        icon: GrCreditCard,
        activeIcon: FaCreditCard,
        link: '/profile/cards'
    },
    {
        name: 'Address',
        icon: PiAddressBookLight,
        activeIcon: FaAddressBook,
        link: '/profile/address'
    },
    {
        name: 'My Account',
        icon: FaRegUser,
        activeIcon: FaUser,
        link: '/profile/my-account'
    }
];


const ProfileNavigation = () => {
    const pathName = usePathname();

    return (
        <div className="space-y-4 py-5">
            {NavigationLinks.map((link) => {
                const isActive = pathName === link.link;
                return (
                    <Link href={link.link} key={link.name}
                        className={cn("flex items-center p-2 pl-4 cursor-pointer transition duration-200",
                            isActive ? "bg-blue-200" : "hover:bg-blue-100")}
                    >
                        {isActive ? <link.activeIcon className="mr-2 size-5" /> : <link.icon className="mr-2 size-5" />}
                        <span className={isActive ? "text-primary" : ""}>{link.name}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProfileNavigation;
