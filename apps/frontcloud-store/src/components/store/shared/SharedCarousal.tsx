"use client";

import React, { forwardRef, useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';
import ArrowButton from './CarousalArrows';


interface CarousalProps {
    data?: any[] | undefined;
    children: React.ReactNode;
}




const SharedCarousal = (({ data, children }: CarousalProps) => {
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
        <div className='size-full relative max-w-[90rem] mx-auto' >
            <Swiper
                ref={swiperRef}
                cssMode={true}
                pagination={true}
                loop
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
                style={{ height: "100%" }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
            >
                {data?.map((_, index) => (
                    <SwiperSlide key={index} style={{ overflow: "hidden" }}>
                        {children}
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <ArrowButton
                direction="prev"
                className={`left-1 size-12 bg-[#00000080] text-white `}
                arrowSize={30}
                onClick={() => handleArrowClick('prev')}
            />

            <ArrowButton
                direction="next"
                className={` right-1 size-12 bg-[#00000080] text-white`}
                arrowSize={30}
                onClick={() => handleArrowClick('next')}
            />
        </div>
    );
});

export default SharedCarousal;
