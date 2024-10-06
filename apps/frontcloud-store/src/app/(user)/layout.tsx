"use client";

import Footer from "@/components/store/shared/Footer";
import Header from "@/components/store/shared/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="relative flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}
