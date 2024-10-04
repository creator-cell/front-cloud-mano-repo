import { cn } from "@/lib/utils";
import { CustomHeading } from "../custom/CustomHeading";

interface SectionLayoutProps {
    children?: React.ReactNode;
    title?: string;
    className?: string;
    ispadding?: string;
    idName?: string
    offsetHeight?: boolean
}


const SectionLayout: React.FC<SectionLayoutProps> = ({
    children,
    title,
    className,
    idName,
    offsetHeight
}) => {

    return (
        <section className={` mx-auto relative z-0`}>
            {
                offsetHeight &&
                <span id={idName} className='mt-[-80px] pb-[60px] block'>
                    &nbsp;
                </span>
            }
            <div className='w-full flex flex-col gap-y-4' >
                <CustomHeading variant={"small"} className='text-[24px] font-[500] text-black text-left'>{title}</CustomHeading>
                <div className={cn(`w-full flex flex-col gap-y-3 bg-white px-24 pt-6 pb-16`, className)}>
                    {children}
                </div>
            </div>
        </section >
    )

}

export default SectionLayout;