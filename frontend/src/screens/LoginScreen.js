import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation, onLogin, isLoading, error, clearError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (onLogin) {
            onLogin(email, password);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#0D1E2D" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>MindCare AI</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* Logo badge */}
                    <View style={styles.logoBadge}>
                        <MaterialCommunityIcons name="shield-check" size={30} color="#1A8C80" />
                    </View>

                    {/* Welcome text */}
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to continue your mindfulness{'\n'}journey</Text>

                    {/* Email */}
                    <Text style={styles.label}>Email or Phone Number</Text>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="account-outline" size={20} color="#9EAAB5" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. name@email.com"
                            placeholderTextColor="#C0CDD6"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.passwordLabelRow}>
                        <Text style={styles.label}>Password</Text>
                        <TouchableOpacity>
                            <Text style={styles.forgot}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="lock-outline" size={20} color="#9EAAB5" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#C0CDD6"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="#9EAAB5"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Login button */}
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.dividerRow}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>Or continue with</Text>
                        <View style={styles.divider} />
                    </View>

                    {/* Social Buttons */}
                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialBtn}>
                            <FontAwesome name="google" size={18} color="#DB4437" />
                            <Text style={styles.socialText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}>
                            <FontAwesome name="apple" size={18} color="#000000" />
                            <Text style={styles.socialText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up link */}
                    <View style={styles.signupRow}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Security Footer */}
                    <View style={styles.securityRow}>
                        <MaterialCommunityIcons name="shield-check-outline" size={14} color="#9EAAB5" />
                        <Text style={styles.securityText}>  Secure 256-bit SSL encrypted connection</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    keyboardView: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingBottom: 32,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginBottom: 20,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0D1E2D',
    },
    logoBadge: {
        alignSelf: 'center',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E0F6F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#0D1E2D',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#5B6E7D',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0D1E2D',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    inputRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 54,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#0D1E2D',
    },
    eyeBtn: {
        padding: 4,
    },
    passwordLabelRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    forgot: {
        fontSize: 14,
        color: '#2BBFB0',
        fontWeight: '500',
    },
    loginBtn: {
        width: '100%',
        backgroundColor: '#2BBFB0',
        borderRadius: 50,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 28,
        shadowColor: '#2BBFB0',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    dividerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#DDE4EA',
    },
    dividerText: {
        marginHorizontal: 12,
        color: '#8FA0AE',
        fontSize: 13,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 32,
    },
    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#DDE4EA',
        borderRadius: 50,
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        gap: 8,
    },
    socialText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0D1E2D',
    },
    signupRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    signupText: {
        color: '#5B6E7D',
        fontSize: 14,
    },
    signupLink: {
        color: '#2BBFB0',
        fontSize: 14,
        fontWeight: '700',
    },
    securityRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    securityText: {
        fontSize: 12,
        color: '#9EAAB5',
    },
});

export default LoginScreen;
