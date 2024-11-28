import type { Metadata } from "next";
import "./globals.css";
import 'swiper/css';
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from 'sonner';
import SideBarOpenCloseContextProvider from "@/hooks/useSideBarOpenClode";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StoreProvider from "@/store/StoreProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
    title: {
        default: "Front Cloud",
        template: "%s | Front Cloud",
    },
    description: "Best DropShiping Platform",
    icons: [
        {
            url: "/png-logo.png",
            sizes: "192x192",
            type: "image/png",
            href: "/png-logo.png"

        }
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" >
            <body >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StoreProvider>
                        <SideBarOpenCloseContextProvider>
                            <LanguageProvider>
                                {children}
                                <Toaster
                                    position="top-right"
                                    richColors
                                    closeButton
                                />
                            </LanguageProvider>
                        </SideBarOpenCloseContextProvider>
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
