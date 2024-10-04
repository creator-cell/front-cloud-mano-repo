"use client";
import React from 'react';

interface Phrase {
    name: string;
    value: string;
}

interface PhraseListProps {
    phrases: Phrase[];
}

const PhraseList: React.FC<PhraseListProps> = ({ phrases }) => {
    return (
        <div className='space-y-4'>
            {phrases.map((phrase, index) => (
                <div className='flex gap-x-6' key={index}>
                    <div className='flex-1 px-4 py-3 bg-gray-100 h-fit rounded-sm'>{phrase.name}</div>
                    <div className='flex-1 p-4 bg-gray-100 h-fit rounded-sm'>{phrase.value}</div>
                </div>
            ))}
        </div>
    );
};

export default PhraseList;
