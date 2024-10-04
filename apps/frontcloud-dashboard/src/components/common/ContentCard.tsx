"use client";
import React from 'react';
import { Button } from '../ui/button';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    text: string;
}

interface ContentCardProps {
    title: string;
    description: string;
    date?: string;
    button: ButtonProps;
    linkText?: string;
    height?: number;
    linkHref?: string;

}

const ContentCard: React.FC<ContentCardProps> = ({
    title,
    description,
    button,
    date,
    height
}) => {
    return (
        <div className={cn(" p-4   flex flex-col ",
            height && `h-[${height}rem]`
        )}>
            <p className='text-[14px] pb-5'>{date && date}</p>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="mb-5 flex-1">{description}</p>
            {button && (
                <Button
                    onClick={button.onClick}
                    variant={"ghost"}
                    className='group  hover:bg-transparent px-0 self-start uppercase hover:text-blue-500 tracking-widest'  >
                    {button.text}
                    <MoveRight className='ml-3 text-blue-500 transition-transform duration-300 group-hover:translate-x-2' />
                </Button>

            )}
        </div>
    );
};

export default ContentCard;
