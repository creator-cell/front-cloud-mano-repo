"use client";

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion';

interface ArrowButtonProps {
    direction: 'prev' | 'next';
    onClick: () => void;
    hover?: boolean;
    className?: string;
    arrowSize?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const ArrowButton = ({ direction, onClick, className, arrowSize, onMouseEnter, onMouseLeave }: ArrowButtonProps) => {
    // console.log("🚀 ~ ArrowButton ~ hover:", hover)
    const arrowRef = useRef(null);


    return (
        <motion.div
            whileTap={{ scale: 0.9, }}
            initial={{}}
            ref={arrowRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cn("w-8 h-8  rounded-full flex items-center justify-center cursor-pointer absolute top-1/2 transform will-change-transform -translate-y-1/2 !z-10 border-[1px]", className,
                {
                    // 'left-4': direction === 'prev',
                    // 'right-4': direction === 'next'
                })}
            style={{
                transform: "inherit",
            }}
        >
            {direction === 'prev' ? <ChevronLeft size={arrowSize ? arrowSize : 18} className="z-20" /> : <ChevronRight size={arrowSize ? arrowSize : 18} className="z-20" />}
        </motion.div>
    );
};

export default ArrowButton;