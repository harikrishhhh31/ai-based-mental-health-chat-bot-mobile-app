// @ts-nocheck
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import RegisterScreenUI from '../src/screens/RegisterScreen';
import useAuthStore from '../src/store/useAuthStore';

export default function Register() {
    const router = useRouter();
    const { register, isLoading, error, clearError, isAuthenticated, user } = useAuthStore();

    const handleRegister = async (name, email, password) => {
        try {
            await register(name, email, password);
        } catch (err) {
            console.log('Registration error:', err);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            Alert.alert(
                '🎉 Account Created!',
                `Welcome ${user.name}!\n\nCheck your email to verify your account.`,
                [
                    {
                        text: 'Go to Login',
                        onPress: () => {
                            router.replace('/login');
                        },
                    },
                ]
            );
        }
    }, [isAuthenticated, user]);

    return (
        <RegisterScreenUI
            onRegister={handleRegister}
            isLoading={isLoading}
            error={error}
            clearError={clearError}
            navigation={{
                goBack: () => router.back(),
                navigate: (screen) => router.push(`/${screen.toLowerCase()}`),
            }}
        />
    );
}
