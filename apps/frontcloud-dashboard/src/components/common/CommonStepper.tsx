"use client";
import React, { useState } from 'react';
import { Label } from '../ui/label';

interface OptionType {
    value: string;
    label: string;
}

interface CommonStepperProps {
    options: OptionType[];
    minWidth?: string;
}

const CommonStepper: React.FC<CommonStepperProps> = ({ options, minWidth }) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };

    return (
        <div
            className="flex items-center justify-between py-6"
            style={{ width: minWidth }}
        >
            {options.map((option, index) => (
                <React.Fragment key={index}>
                    <div
                        onClick={() => handleStepClick(index)}
                        className='flex flex-col gap-y-3 cursor-pointer items-center relative'>
                        <div

                            className={` flex flex-col items-center 
                        ${index <= activeStep ? 'bg-green-500 text-white' : 'bg-transparent border-2 border-gray-600'} 
                        text-gray-500 rounded-full h-8 w-8 flex items-center justify-center`}
                        >
                            {option.value}
                        </div>
                        {/* Label */}
                        <Label className="mt-2 text-center text-xs whitespace-nowrap absolute left-0 -bottom-7">
                            {option.label}
                        </Label>
                    </div>


                    {/* Horizontal Line */}
                    {index < options.length - 1 && (
                        <div
                            className={`h-0.5  flex-grow ${index < activeStep ? 'bg-green-500' : 'bg-gray-600'}`}
                            style={{ width: '100%' }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CommonStepper;
