// @ts-nocheck
import React from 'react';
import { useRouter } from 'expo-router';
import OnboardingScreenUI from '../src/screens/OnboardingScreen';

export default function Onboarding() {
    const router = useRouter();
    return <OnboardingScreenUI navigation={{
        replace: (screen: any) => router.replace(`/${screen.toLowerCase()}`),
        navigate: (screen: any) => router.push(`/${screen.toLowerCase()}`),
    }} />;
}
