// @ts-nocheck
import React from 'react';
import { useRouter } from 'expo-router';
import RegisterScreenUI from '../src/screens/RegisterScreen';
import useAuthStore from '../src/store/useAuthStore';

export default function Register() {
    const router = useRouter();
    const { register, isLoading, error, clearError } = useAuthStore();

    const handleRegister = async (name: any, email: any, password: any) => {
        await register(name, email, password);
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
            router.replace('/home');
        }
    };

    return (
        <RegisterScreenUI
            onRegister={handleRegister}
            isLoading={isLoading}
            error={error}
            clearError={clearError}
            navigation={{
                goBack: () => router.back(),
                navigate: (screen: any) => router.push(`/${screen.toLowerCase()}`),
            }}
        />
    );
}
