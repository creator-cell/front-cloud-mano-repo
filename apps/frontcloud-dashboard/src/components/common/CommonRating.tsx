"use client";
import React from 'react'
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
    rating: number;
    maxRating?: number;
    onRatingChange?: (rating: number) => void;
    className?: string;
}


const Rating: React.FC<RatingProps> = ({
    rating,
    maxRating = 5,
    onRatingChange,
    className,
}) => {
    return (
        <div className={cn("flex space-x-1", className)}>
            {
                [...Array(maxRating)].map((_, index) => {
                    const starIndex = index + 1;
                    return (
                        <Star
                            key={starIndex}
                            className={cn("w-5 h-5 ", {
                                "text-yellow-500": starIndex <= rating,
                                "text-gray-300": starIndex > rating,
                                "cursor-pointer": onRatingChange
                            })}
                            onClick={() => onRatingChange && onRatingChange(starIndex)}
                        />
                    )
                })
            }

        </div>
    )
}

export default Rating;





