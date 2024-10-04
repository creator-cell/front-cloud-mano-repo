// RatingStar.tsx
import { Star } from 'lucide-react';
import React from 'react';

interface RatingStarProps {
    rating: number; // The current rating value
    maxRating?: number; // Maximum rating value, default is 5
}

const RatingStar: React.FC<RatingStarProps> = ({ rating, maxRating = 5 }) => {
    const stars = Array.from({ length: maxRating }, (_, index) => index + 1);
    return (
        <div className="flex items-center gap-x-[0.13rem]">
            {stars.map((star) => (
                <span
                    key={star}
                    className={`cursor-default ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    aria-label={`Rate ${star} out of ${maxRating}`}
                >
                    <Star size={18} fill='yellow' />
                </span>
            ))}
        </div>
    );
};

export default RatingStar;
