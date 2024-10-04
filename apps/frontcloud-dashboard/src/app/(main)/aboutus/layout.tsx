import AboutusNav from "@/components/AboutusNav";
import { CustomHeading } from "@/components/custom/CustomHeading";
import { Button } from "@/components/ui/button";


export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-0 h-full">
            <AboutusNav />
            <div className="">
                {children}
            </div>
            <div className='bg-[#ECEFF3] w-full mt-[100px]' >
                <div className='container py-[100px] flex flex-col gap-y-6'>
                    <CustomHeading variant={"medium"} className='text-black text-center max-md:text-left'>
                        Want to learn more about BigCommerce and our career opportunities?
                    </CustomHeading>
                    <p className='text-[16px] font-[400] leading-[1.6]  text-gray-500 text-center md:px-7 max-md:text-left'>Here at BigCommerce, we&apos;re interested in sharing who we are and the exciting plans we have for redefining the ecommerce industry. Join our BigNetwork to stay up to date on BigCommerce news, events, and potential career opportunities.</p>
                    <div className='flex w-full  md:justify-center '>
                        <Button variant="default" className='uppercase text-[0.875rem] leading-[1.375rem] font-medium tracking-[0.05em] py-2 px-6 max-sm:py-0   ' >Join Our Big NewWork</Button>
                    </div>
                </div>
            </div >
        </div>
    );
}
