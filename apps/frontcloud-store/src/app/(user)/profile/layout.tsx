"use client";

import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileNavigation from "@/components/profile/ProfileNavigation";
import { cn } from "@/lib/utils";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className='w-full flex-col bg-white space-y-12 mb-12'>
            <div className='w-full flex  h-full'>
                <div className="flex justify-center relative space-x-3 rounded-md w-full">
                    <div
                        className={cn(
                            "hidden lg:block h-[85vh] bg-gray-50 shadow-md w-full max-w-xs rounded-md space-y-6 border divide-y-2 sticky top-24 overflow-hidden"
                        )}
                    >
                        <ProfileDetails />
                        <ProfileNavigation />
                    </div>

                    <div className="relative flex items-start px-4 w-full" style={{ maxWidth: "calc(1156px - 20rem)" }}>
                        <div className="max-w-full bg-gray-50 mt-4 p-4 rounded-md min-h-screen w-full flex flex-col gap-5">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

