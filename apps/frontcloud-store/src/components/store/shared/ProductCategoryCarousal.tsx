"use client";

import React, { forwardRef, useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import ArrowButton from './CarousalArrows';
import { SwiperOptions, Swiper as type } from 'swiper/types';
import { cn } from '@/lib/utils';

interface Breakpoints {
    [key: number]: SwiperOptions; // Numeric keys for breakpoints
    [key: string]: SwiperOptions; // Allow string keys for ratio
}

interface CarousalProps {
    children: React.ReactNode;
    breakpoints: Breakpoints; // Add breakpoints prop
    autoplay?: boolean; // Add autoplay prop
    className?: string;
}

const ProductCategoryCarousal = ({ children, breakpoints, autoplay = false, className }: CarousalProps) => {
    const swiperRef = useRef<SwiperRef>(null);

    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(0);
    const [isClickable, setIsClickable] = React.useState(true);

    React.useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.on('slideChange', () => {
                setActiveIndex(swiperRef.current?.swiper.realIndex);
            });
        }
    }, []);

    const handleArrowClick = useCallback((direction: 'prev' | 'next') => {
        if (isClickable && swiperRef.current) {
            setIsClickable(false);
            direction === 'prev' ? swiperRef.current.swiper.slidePrev() : swiperRef.current.swiper.slideNext();
            setTimeout(() => setIsClickable(true), 500);
        }
    }, [isClickable]);

    return (
        <div className='size-full relative w-full mx-auto'>
            <Swiper
                ref={swiperRef}
                cssMode={true}
                pagination={true}
                loop
                autoplay={autoplay ? { delay: 3500, disableOnInteraction: false } : false} // Use autoplay from props
                modules={[Autoplay]}
                className="mySwiper"
                style={{ height: "100%" }}
                breakpoints={breakpoints} // Use breakpoints from props
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index} style={{ overflow: "hidden" }} className={cn(className)}>
                        {child}
                        {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
                    </SwiperSlide>
                ))}
            </Swiper>

            <ArrowButton
                direction="prev"
                className={`right-16 -top-14 size-10 bg-[#00000080] text-white max-sm:hidden`}
                arrowSize={30}
                onClick={() => handleArrowClick('prev')}
            />

            <ArrowButton
                direction="next"
                className={`right-3 -top-14 size-10 bg-[#00000080] text-white max-sm:hidden`}
                arrowSize={30}
                onClick={() => handleArrowClick('next')}
            />
        </div>
    );
};

export default ProductCategoryCarousal;
