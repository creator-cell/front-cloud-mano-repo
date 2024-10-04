import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// Define the heading variants using cva
const CustomHeadingVariants = cva('text-left text-white', {
    variants: {
        variant: {
            default: " text-[34px] md:text-[42px] font-[700] leading-[1.2] tracking-wide",
            large: "text-[34px] sm:text-[42px] md:text-[56px] font-[700] leading-[1.2] tracking-wide",
            medium: "text-[28px] sm:text-[30px] md:text-[34px] font-[700] leading-[1.2] tracking-wide",
            pageHeading: "text-[24px] sm:text-[28px] md:text-[30px] font-[200] leading-[1.5] tracking-wide",
            small: "text-[20px] font-[500] leading-[1.75rem] tracking-wide",
            subtitle: "text-[15px] font-[400] leading-[1.6] tracking-wide",
            tiny: "text-[12px] font-[400] leading-[1.6] tracking-wide",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

// Define the props for CustomHeading, including the variant from CustomHeadingVariants * Props Accept variant , as and className 
interface CustomHeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof CustomHeadingVariants> {
    asChild?: boolean;
    as?: React.ElementType;
}

// Create the CustomHeading component ** default it work as h1 tag and also can modify as per requirement
const CustomHeading = React.forwardRef<HTMLHeadingElement, CustomHeadingProps>(
    ({ className, variant, asChild = false, as: Component = 'h1', ...props }, ref) => {
        const Comp = asChild ? 'span' : Component;
        return (
            <Comp
                className={cn(CustomHeadingVariants({ variant }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

CustomHeading.displayName = 'CustomHeading';

export { CustomHeading, CustomHeadingVariants };
