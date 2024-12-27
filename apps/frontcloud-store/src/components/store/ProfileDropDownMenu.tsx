import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserData } from "@/Redux/api/user/types/user.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"
import { Label } from "../ui/label"
import Link from "next/link"


interface Props {
    userData: UserData
    refetch: () => void
}

const ProfileDropDownMenu: React.FC<Props> = ({ userData, refetch }) => {



    const handleLogout = () => {
        // Remove the token from cookies
        document.cookie
            .split(";")
            .forEach((c) => (document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)))
        // Redirect to /sign-in
        window.location.href = "/"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex items-center  gap-2 z-50 '>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{userData?.UserName ?? "user"}</AvatarFallback>
                    </Avatar>
                    <Label className='text-white text-xl'>{userData?.UserName?.split(" ")?.[0] ?? "user"}</Label>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 absolute  -right-14 z-[90]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                >
                    <LogOut />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default ProfileDropDownMenu