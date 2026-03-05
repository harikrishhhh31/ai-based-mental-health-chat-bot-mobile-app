// @ts-nocheck
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useAuthStore from '../src/store/useAuthStore';

/**
 * Root layout — handles all navigation and auth-gating.
 * 
 * Route structure:
 *   index          → SplashScreen (initial, auto-redirects)
 *   onboarding     → OnboardingScreen
 *   login          → LoginScreen
 *   register       → RegisterScreen
 *   home           → HomeScreen
 *   chat           → ChatScreen
 *   profile        → ProfileScreen
 */
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, restoreSession } = useAuthStore();

  // On app startup, try to restore a saved login session
  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        {/* Keep default Expo screens out of the way */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
