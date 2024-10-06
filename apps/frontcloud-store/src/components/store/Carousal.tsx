"use client";

import React, { forwardRef, useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';
import ArrowButton from './shared/CarousalArrows';




const Carousal = forwardRef(({ images, children }: { images?: StaticImageData[] | undefined, children: React.ReactNode }, ref) => {
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
            setTimeout(() => setIsClickable(true), 1500);
        }
    }, [isClickable]);

    return (
        <div className='size-full relative max-w-full mx-auto' >
            <Swiper
                ref={swiperRef}
                cssMode={true}
                pagination={true}
                loop
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
                style={{ height: "100%" }}
            >
                {images?.map((image, index) => (
                    <SwiperSlide key={index} style={{ overflow: "hidden" }}>

                        {children}
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <ArrowButton
                direction="prev"
                className={`left-4 size-12 bg-[#00000080] text-white `}
                arrowSize={30}
                onClick={() => handleArrowClick('prev')}
            />

            <ArrowButton
                direction="next"
                className={` right-4 size-12 bg-[#00000080] text-white`}
                arrowSize={30}
                onClick={() => handleArrowClick('next')}
            />
        </div>
    );
});
Carousal.displayName = "Carousal";
export default Carousal;
