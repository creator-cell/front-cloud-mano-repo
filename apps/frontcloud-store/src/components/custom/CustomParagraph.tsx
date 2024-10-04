import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";



const CustomParagraphVariants = cva('text-left text-black', {
    variants: {
        variant: {
            default: "text-[20px] font-[400] leading-[1.5] tracking-wide",
            large: "text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-[1.5] tracking-wide",
            medium: "text-[14px] sm:text-[16px]  font-[400] leading-[1.5] tracking-wide",
            xmedium: "text-[15px] font-[400] leading-[1.5] tracking-wide",
            small: "text-[13px] font-[400] leading-[1.5] tracking",

        },
    },
    defaultVariants: {
        variant: "default",
    },
});


// Define the props for CustomParagraph, including the variant from CustomParagraphVariants * Props Accept variant , as and className 
interface CustomParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof CustomParagraphVariants> {
    asChild?: boolean;
    as?: React.ElementType;
}


// Create the Customaragraph component ** default it work as h1 tag and also can modify as per requirement
const CustomParagraph = React.forwardRef<HTMLParagraphElement, CustomParagraphProps>(
    ({ className, variant, asChild = false, as: Component = 'p', ...props }, ref) => {
        const Comp = asChild ? 'span' : Component;
        return (
            <Comp
                className={cn(CustomParagraphVariants({ variant }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

CustomParagraph.displayName = 'CustomParagraph';

export { CustomParagraph, CustomParagraphVariants };


