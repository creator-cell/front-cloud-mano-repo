"use client";

import { useVerifyAccountMutation } from "@/store/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Success from "./Success";
import ErrorPage from "./Error";
import LoadingPage from "./Loading";

const ActiveAccount = ({ token }: { token: string }) => {
    const router = useRouter();

    const [VerifyAccount, { isLoading, isSuccess, isError }] = useVerifyAccountMutation()

    useEffect(() => {
        VerifyAccount({ token })
            .unwrap()
            .then((res) => {
                toast.success('Account activated successfully');
            })
            .catch((error) => {
                toast.error('Account activation failed');
            });
    }, [token]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-black text-white">
            {isSuccess ? (
                <Success
                    title="Account Activated"
                    description="Your account has been activated successfully"
                    buttonText="Go to Login"
                    onClick={() => router.push('/sign-in')}
                />
            ) : (
                <ErrorPage />
            )}
        </div>
    );
};

export default ActiveAccount;
