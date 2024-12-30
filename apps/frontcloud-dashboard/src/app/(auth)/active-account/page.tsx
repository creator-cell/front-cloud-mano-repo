"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use Next.js router to handle URL params
import { toast } from 'sonner'; // To show a success or error message
import { useSearchParams } from 'next/navigation';

const ActiveAccount = () => {
    const router = useRouter();
    const searchParms = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const token = searchParms.get('token');

    useEffect(() => {
        if (token) {
            // Make an API request to verify the activation token
            const activateAccount = async () => {
                try {
                    setIsLoading(true);
                    // Replace with your backend API URL
                    const response = await fetch(`/api/activate-account?token=${token}`, {
                        method: 'POST',
                    });

                    if (response.ok) {
                        const result = await response.json();
                        setIsSuccess(true);
                        toast.success(result.message || 'Your account has been activated!');
                    } else {
                        const result = await response.json();
                        setErrorMessage(result.message || 'Account activation failed');
                        toast.error(result.message || 'Activation failed');
                    }
                } catch (error) {
                    setErrorMessage('An error occurred. Please try again.');
                    toast.error('An error occurred. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            };

            activateAccount();
        }
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state until response comes back
    }

    return (
        <div className="activation-page">
            {isSuccess ? (
                <div className="success-message">
                    <h2>Your account has been activated!</h2>
                </div>
            ) : (
                <div className="error-message">
                    <h2>{errorMessage || 'Account activation failed. Please try again.'}</h2>
                </div>
            )}
        </div>
    );
};

export default ActiveAccount;
