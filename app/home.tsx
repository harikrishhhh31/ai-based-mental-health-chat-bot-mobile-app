// @ts-nocheck
import React from 'react';
import { useRouter } from 'expo-router';
import HomeScreenUI from '../src/screens/HomeScreen';

export default function Home() {
    const router = useRouter();
    return (
        <HomeScreenUI
            navigation={{
                navigate: (screen: any) => router.push(`/${screen.toLowerCase()}`),
                replace: (screen: any) => router.replace(`/${screen.toLowerCase()}`),
            }}
        />
    );
}
