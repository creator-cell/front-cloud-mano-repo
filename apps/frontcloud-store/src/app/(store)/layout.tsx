"use client";
import Footer from "@/components/store/shared/Footer";
import Header from "@/components/store/shared/Header";
import useScroll from "@/hooks/useScroll";
import { Suspense } from "react";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const isSticky = useScroll();
    return (
        <div className="min-h-screen w-full flex gap-6 flex-col bg-white">
            {
                isSticky && <div className="h-[11px] w-full" />
            }
            <Header />
            {/* <NavBar /> */}
            <div className="flex-1">
                <Suspense fallback={null}>
                    {children}
                </Suspense>

            </div>

            <div className="mt-20">
                <Footer />
            </div>

        </div>
    );
}
