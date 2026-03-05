// @ts-nocheck
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import SplashScreenUI from '../src/screens/SplashScreen';
import useAuthStore from '../src/store/useAuthStore';

export default function Index() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                router.replace('/home');
            } else {
                router.replace('/onboarding');
            }
        }, 3200); // wait for loading animation to finish
        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    return <SplashScreenUI />;
}
