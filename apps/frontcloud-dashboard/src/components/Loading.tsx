import React from "react";
import { CustomHeading } from "@/components/custom/CustomHeading";

const LoadingPage = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
                {/* Spinner Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Heading */}
                <CustomHeading
                    variant="small"
                    className="text-3xl text-gray-800 font-semibold mb-4 text-center"
                >
                    Loading, please wait...
                </CustomHeading>

                {/* Description */}
                <p className="text-lg text-gray-600">
                    We’re processing your request. This may take a few moments.
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
