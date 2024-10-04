import { cva, VariantProps } from "class-variance-authority";
import React from "react";


const CustomPageAlartVariants = cva('text-left', {
    variants: {
        variant: {
            default: "text-[20px] font-[400] leading-[1.5] tracking-wide",
            large: "text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-[1.5] tracking-wide",
            medium: "text-[14px] sm:text-[16px]  font-[400] leading-[1.5] tracking-wide",
            xmedium: "text-[15px] font-[400] leading-[1.5] tracking-wide",
            small: "text-[13px] font-[400] leading-[1.5] tracking",

        },
        type: {
            success: `bg-[#E1F4E1] border-l-8 border-[#65C96D]  text-gray-700 px-3 py-4`,
            error: "bg-red-100 border-l-8 border-red-400 text-red-800 px-3 py-4",
            warning: "bg-yellow-100 border-l-8 border-yellow-300 text-yellow-800 px-3 py-4",
            info: "bg-blue-100 border-l-8 border-blue-400 text-gray-600 px-3 py-4",
        },
    },
    defaultVariants: {
        variant: "default",
        type: "success",
    },
});

export interface CustomVariantProps extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof CustomPageAlartVariants> {
    asChild?: boolean;
}

const CustomPageAlart = React.forwardRef<HTMLDivElement, CustomVariantProps>(
    ({ className, variant, type, asChild = false, ...props }, ref) => {
        const Comp = asChild ? "div" : "div";
        return (
            <div className="">
                <Comp
                    className={CustomPageAlartVariants({ variant, type, className })}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
CustomPageAlart.displayName = "CustomPageAlart";

export { CustomPageAlart, CustomPageAlartVariants };

