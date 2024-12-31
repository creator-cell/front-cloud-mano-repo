import React from "react";
import { CustomHeading } from "@/components/custom/CustomHeading";
import { Label } from "./ui/label";

const ErrorPage = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto ">
                {/* Error Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex justify-center items-center text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12" y2="16"></line>
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <CustomHeading
                    variant="small"
                    className="text-3xl text-red-500 font-semibold mb-4 text-center"
                >
                    Oops! Something went wrong.
                </CustomHeading>

                {/* Description */}
                <Label className="text-lg text-white mb-6">
                    We encountered an issue while processing your request. Please try again or contact support if the problem persists.
                </Label>

                {/* Call to Actions */}
                <div className="flex justify-center space-x-4 mt-12">
                    <a
                        href="/"
                        className="text-white bg-primary hover:bg-primary-dark rounded-full py-2 px-6 text-lg"
                    >
                        Go to Homepage
                    </a>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-white bg-gray-600 hover:bg-gray-700 rounded-full py-2 px-6 text-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
