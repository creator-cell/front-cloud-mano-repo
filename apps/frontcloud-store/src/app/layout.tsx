import type { Metadata } from "next";
import "./globals.css";
import 'swiper/css';
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from 'sonner';

import AppProvider from "@/Redux/provider";

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
        <html lang="en">
            <body >
                <AppProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster
                            position="top-right"
                            richColors
                        />
                    </ThemeProvider>
                </AppProvider>
            </body>
        </html>
    );
}
