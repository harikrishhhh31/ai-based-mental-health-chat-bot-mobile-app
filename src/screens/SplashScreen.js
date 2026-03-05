import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
    // Animation value starts at 0 (0% progress)
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate the progress bar from 0 to 100 over 3 seconds
        Animated.timing(progressAnim, {
            toValue: 100,
            duration: 3000,
            useNativeDriver: false, // Must be false for width animation
        }).start(() => {
            // Once animation finishes, navigate to the Home or Auth screen
            // navigation.replace('Home');
        });
    }, [progressAnim, navigation]);

    // Interpolate the animated value to a percentage string for the width
    const widthInterpolation = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <LinearGradient
            colors={['#D2F2E2', '#E2FCEE', '#CEF0DF']} // Soft mint/teal gradient matching the design
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Logo Container */}
                <View style={styles.logoCircle}>
                    {/* Temporary placeholder icon since we don't have the exact asset */}
                    <MaterialCommunityIcons name="shield-check" size={60} color="#155B5C" />
                    <MaterialCommunityIcons
                        name="comment-text"
                        size={24}
                        color="#FFFFFF"
                        style={styles.chatIconOverlay}
                    />
                </View>

                {/* Typography */}
                <Text style={styles.title}>MindCare AI</Text>
                <Text style={styles.subtitle}>Your AI Companion for Mental</Text>
                <Text style={styles.subtitle}>Wellness</Text>
            </View>

            {/* Progress Bar Area */}
            <View style={styles.progressContainer}>
                <View style={styles.progressTextRow}>
                    <Text style={styles.progressLabel}>Finding your calm...</Text>
                    <Text style={styles.progressPercent}>75%</Text>
                    {/* Note: In a real app the 75% could be dynamically bound to progressAnim */}
                </View>

                <View style={styles.progressBarBackground}>
                    <Animated.View
                        style={[
                            styles.progressBarFill,
                            { width: widthInterpolation }
                        ]}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: -40, // Bump it slightly up to match the visual balance of the screenshot
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#155B5C',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 30,
        position: 'relative',
    },
    chatIconOverlay: {
        position: 'absolute',
        top: 48,
        left: 48,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0D1E2D', // Very dark navy
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#34495E',
        fontWeight: '400',
        marginBottom: 4,
    },
    progressContainer: {
        width: '80%',
        paddingBottom: 20,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    progressLabel: {
        color: '#5B8682',
        fontSize: 14,
    },
    progressPercent: {
        color: '#20A88B',
        fontSize: 14,
        fontWeight: '600',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#C5E6D8', // Light background of the bar
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#30A68A', // Teal foreground of the bar
        borderRadius: 4,
    },
});

export default SplashScreen;
