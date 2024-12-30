import React from "react";
import Image from "next/image";
import { CustomHeading } from "@/components/custom/CustomHeading";
import { Label } from "./ui/label";

const Success = () => {
    return (
        <div className="w-full  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto ">
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center text-white">
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
                            <path d="M9 11l3 3L22 4"></path>
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <CustomHeading
                    variant="small"
                    className="text-3xl text-gray-800 font-semibold mb-4 text-center"
                >
                    Your account has been successfully created!
                </CustomHeading>

                {/* Description */}
                <Label className="text-lg text-gray-600 mb-6">
                    Check your email to activate your account and start using our services. The activation link has been sent to your inbox.
                </Label>

                {/* Image (Optional) */}
                {/* <div className="mb-8">
                    <Image
                        src={successImg}
                        alt="Success"
                        width={400}
                        height={300}
                        className="mx-auto"
                    />
                </div> */}

                {/* Call to Action */}
                <p className="text-sm text-gray-500 mb-4 pt-7">
                    If you don't see the email, please check your spam folder.
                </p>
                <a
                    href="/dashboard"
                    className="text-white bg-primary hover:bg-primary-dark rounded-full py-2 px-6 text-lg"
                >
                    Go to Dashboard
                </a>
            </div>
        </div>
    );
};

export default Success;
