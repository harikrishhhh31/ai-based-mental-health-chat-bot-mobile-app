// @ts-nocheck
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import LoginScreenUI from '../src/screens/LoginScreen';
import useAuthStore from '../src/store/useAuthStore';

export default function Login() {
    const router = useRouter();
    const { login, isLoading, error, clearError } = useAuthStore();

    const handleLogin = async (email: any, password: any) => {
        await login(email, password);
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
            router.replace('/home');
        }
    };

    return (
        <LoginScreenUI
            onLogin={handleLogin}
            isLoading={isLoading}
            error={error}
            clearError={clearError}
            navigation={{
                goBack: () => router.replace('/onboarding'),
                navigate: (screen: any) => router.push(`/${screen.toLowerCase()}`),
                replace: (screen: any) => router.replace(`/${screen.toLowerCase()}`),
            }}
        />
    );
}
