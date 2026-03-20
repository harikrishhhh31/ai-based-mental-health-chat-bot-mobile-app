import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        icon: 'shield-check',
        iconOverlay: 'comment-text',
        title: 'Talk with an AI for\nemotional support',
        description:
            'MindCare AI is here to listen and support you through your journey to mental well-being.',
    },
    {
        id: '2',
        icon: 'brain',
        iconOverlay: null,
        title: 'AI that understands\nhow you feel',
        description:
            'Our AI listens without judgment, detects your emotional state, and responds with empathy — just like talking to a therapist.',
    },
    {
        id: '3',
        icon: 'clock-check-outline',
        iconOverlay: null,
        title: 'Support available\n24/7, anytime',
        description:
            'Whether it\'s 3 AM or mid-afternoon, MindCare AI is always here — ready to help you through anxiety, stress, or difficult moments.',
    },
];

const OnboardingScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        } else {
            // Last slide → navigate to Auth
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        navigation.replace('Login');
    };

    const renderSlide = ({ item }) => (
        <View style={styles.slide}>
            {/* Illustration Card */}
            <View style={styles.illustrationCard}>
                <View style={styles.iconCircleBg}>
                    <MaterialCommunityIcons name={item.icon} size={70} color="#1A8C80" />
                    {item.iconOverlay && (
                        <MaterialCommunityIcons
                            name={item.iconOverlay}
                            size={26}
                            color="#FFFFFF"
                            style={styles.overlayIcon}
                        />
                    )}
                </View>
            </View>

            {/* Text */}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back and Skip */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation?.goBack?.()}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#0D1E2D" />
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                scrollEnabled={true}
                style={styles.flatList}
            />

            {/* Pagination Dots */}
            <View style={styles.dotsContainer}>
                {SLIDES.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === currentIndex ? styles.dotActive : styles.dotInactive,
                        ]}
                    />
                ))}
            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextText}>
                    {currentIndex === SLIDES.length - 1 ? 'Get Started  →' : 'Next  →'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    skipButton: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    skipText: {
        fontSize: 16,
        color: '#2BBFB0',
        fontWeight: '500',
    },
    flatList: {
        flexGrow: 0,
    },
    slide: {
        width: width,
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 20,
    },
    illustrationCard: {
        width: width * 0.78,
        height: 260,
        backgroundColor: '#EAF7FD',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircleBg: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlayIcon: {
        position: 'absolute',
        bottom: 16,
        right: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0D1E2D',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 34,
    },
    description: {
        fontSize: 15,
        color: '#5B6E7D',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 8,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 36,
        marginBottom: 28,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    dotActive: {
        width: 28,
        backgroundColor: '#2BBFB0',
    },
    dotInactive: {
        width: 8,
        backgroundColor: '#D3DEE5',
    },
    nextButton: {
        backgroundColor: '#2BBFB0',
        width: width - 48,
        paddingVertical: 18,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#2BBFB0',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    nextText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

export default OnboardingScreen;
