// @ts-nocheck
import React from 'react';
import { useRouter } from 'expo-router';
import ProfileScreenUI from '../src/screens/ProfileScreen';
import useAuthStore from '../src/store/useAuthStore';

export default function Profile() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    return (
        <ProfileScreenUI
            user={user}
            onLogout={handleLogout}
            navigation={{
                goBack: () => router.back(),
                navigate: (screen: any) => router.push(`/${screen.toLowerCase()}`),
            }}
        />
    );
}
