"use client";

import Footer from "@/components/store/shared/Footer";
import Header from "@/components/store/shared/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="relative">
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}
