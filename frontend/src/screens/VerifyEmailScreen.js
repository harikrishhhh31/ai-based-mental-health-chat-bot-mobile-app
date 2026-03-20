import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const BASE_URL = 'http://192.168.0.102:5000/api';

const VerifyEmailScreen = () => {
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = getQueryParam('token');
                if (!token) {
                    setStatus('error');
                    setMessage('No verification token found');
                    return;
                }

                const response = await axios.get(`${BASE_URL}/auth/verify-email/${token}`);
                setStatus('success');
                setMessage(response.data.message || 'Email verified successfully!');
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Verification failed');
            }
        };

        verifyEmail();
    }, []);

    const getQueryParam = (param) => {
        const url = window.location.href;
        const params = new URLSearchParams(url.split('?')[1]);
        return params.get(param);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={[
                    styles.iconContainer,
                    status === 'success' ? styles.successBg : 
                    status === 'error' ? styles.errorBg : styles.loadingBg
                ]}>
                    {status === 'loading' ? (
                        <ActivityIndicator size="large" color="#2BBFB0" />
                    ) : (
                        <MaterialCommunityIcons
                            name={status === 'success' ? 'check-circle' : 'alert-circle'}
                            size={60}
                            color={status === 'success' ? '#2ECC71' : '#E55050'}
                        />
                    )}
                </View>

                <Text style={styles.title}>
                    {status === 'success' && 'Email Verified!'}
                    {status === 'error' && 'Verification Failed'}
                    {status === 'verifying' && 'Verifying...'}
                </Text>

                <Text style={styles.message}>{message}</Text>

                {status === 'success' && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => window.location.href = '/login'}
                    >
                        <Text style={styles.buttonText}>Go to Login</Text>
                    </TouchableOpacity>
                )}

                {status === 'error' && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => window.location.href = '/login'}
                    >
                        <Text style={styles.buttonText}>Go to Login</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    successBg: {
        backgroundColor: '#E8F8F0',
    },
    errorBg: {
        backgroundColor: '#FDE8E8',
    },
    loadingBg: {
        backgroundColor: '#E8F4FD',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0D1E2D',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: '#5B6E7D',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#2BBFB0',
        paddingHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default VerifyEmailScreen;
