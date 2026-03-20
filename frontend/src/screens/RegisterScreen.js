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
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation, onRegister, isLoading, error, clearError }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleRegister = () => {
        setValidationError('');
        
        if (!name.trim()) {
            setValidationError('Please enter your name');
            return;
        }
        if (!email.trim()) {
            setValidationError('Please enter your email');
            return;
        }
        if (!password) {
            setValidationError('Please enter a password');
            return;
        }
        if (password.length < 6) {
            setValidationError('Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }
        
        if (onRegister) {
            onRegister(name.trim(), email.trim(), password);
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
                            <Ionicons name="arrow-back" size={24} color="#0D1E2D" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>MindCare AI</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* Logo badge */}
                    <View style={styles.logoBadge}>
                        <MaterialCommunityIcons name="shield-check" size={30} color="#1A8C80" />
                    </View>

                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join MindCare AI and start your{'\n'}wellness journey today</Text>

                    {/* Error Message */}
                    {(validationError || error) && (
                        <View style={styles.errorContainer}>
                            <MaterialCommunityIcons name="alert-circle" size={18} color="#E55050" />
                            <Text style={styles.errorText}>{validationError || error}</Text>
                        </View>
                    )}

                    {/* Full Name */}
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="account-outline" size={20} color="#9EAAB5" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Alex Johnson"
                            placeholderTextColor="#C0CDD6"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                setValidationError('');
                                if (clearError) clearError();
                            }}
                            editable={!isLoading}
                        />
                    </View>

                    {/* Email */}
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="email-outline" size={20} color="#9EAAB5" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. name@email.com"
                            placeholderTextColor="#C0CDD6"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setValidationError('');
                                if (clearError) clearError();
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!isLoading}
                        />
                    </View>

                    {/* Password */}
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="lock-outline" size={20} color="#9EAAB5" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="At least 6 characters"
                            placeholderTextColor="#C0CDD6"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setValidationError('');
                                if (clearError) clearError();
                            }}
                            editable={!isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="#9EAAB5"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password */}
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="lock-check-outline" size={20} color="#9EAAB5" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Re-enter your password"
                            placeholderTextColor="#C0CDD6"
                            secureTextEntry={!showConfirm}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setValidationError('');
                                if (clearError) clearError();
                            }}
                            editable={!isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                            <MaterialCommunityIcons
                                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="#9EAAB5"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Register button */}
                    <TouchableOpacity 
                        style={[styles.registerBtn, isLoading && styles.registerBtnDisabled]} 
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.registerBtnText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    {/* Login link */}
                    <View style={styles.loginRow}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity 
                            onPress={() => navigation?.navigate('Login')}
                            disabled={isLoading}
                        >
                            <Text style={styles.loginLink}>Log In</Text>
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
    container: { flex: 1, backgroundColor: '#F2F5F8' },
    keyboardView: { flex: 1 },
    scroll: { flexGrow: 1, paddingHorizontal: 28, paddingBottom: 32, alignItems: 'center' },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginBottom: 20,
    },
    backBtn: { width: 40, height: 40, justifyContent: 'center' },
    headerTitle: { fontSize: 17, fontWeight: '700', color: '#0D1E2D' },
    logoBadge: {
        alignSelf: 'center',
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: '#E0F6F4',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 20,
    },
    title: { fontSize: 28, fontWeight: '800', color: '#0D1E2D', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 15, color: '#5B6E7D', textAlign: 'center', lineHeight: 22, marginBottom: 28 },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDE8E8',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 16,
        width: '100%',
    },
    errorText: {
        color: '#E55050',
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
    label: { fontSize: 14, fontWeight: '600', color: '#0D1E2D', marginBottom: 8, alignSelf: 'flex-start' },
    inputRow: {
        width: '100%',
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFFFFF', borderRadius: 14,
        paddingHorizontal: 14, height: 54, marginBottom: 18,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
    },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, fontSize: 15, color: '#0D1E2D' },
    eyeBtn: { padding: 4 },
    registerBtn: {
        width: '100%',
        backgroundColor: '#2BBFB0', borderRadius: 50, height: 56,
        justifyContent: 'center', alignItems: 'center',
        marginTop: 8, marginBottom: 24,
        shadowColor: '#2BBFB0', shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
    },
    registerBtnDisabled: {
        backgroundColor: '#9EAAB5',
    },
    registerBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
    loginRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
    loginText: { color: '#5B6E7D', fontSize: 14 },
    loginLink: { color: '#2BBFB0', fontSize: 14, fontWeight: '700' },
    securityRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    securityText: { fontSize: 12, color: '#9EAAB5' },
});

export default RegisterScreen;
