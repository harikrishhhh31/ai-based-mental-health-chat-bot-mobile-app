import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// ── Mood options ──────────────────────────────────────────────
const MOODS = [
    { label: 'Happy', icon: '😊', bg: '#FFF6DC' },
    { label: 'Calm', icon: '🧊', bg: '#DCF0FF' },
    { label: 'Anxious', icon: '🌿', bg: '#EDE0FF' },
    { label: 'Sad', icon: '😞', bg: '#EEF0F5' },
];

// ── Quick-access cards ────────────────────────────────────────
const QUICK = [
    { label: 'Mood Check', sub: 'Track your progress', icon: 'chart-bar', color: '#2BBFB0', bg: '#E6F9F7' },
    { label: 'Daily Tips', sub: 'Mental wellness bits', icon: 'lightbulb-on-outline', color: '#3DAA6E', bg: '#E5F6ED' },
];

// ── Recommendations ───────────────────────────────────────────
const RECS = [
    {
        id: '1',
        title: '5-Min Mindful Breathing',
        sub: 'Guided session • 5 mins',
        action: 'play-circle-outline',
        color: '#2BBFB0',
        icon: 'human-handsdown',
    },
    {
        id: '2',
        title: 'Managing Morning Stress',
        sub: 'Article • 3 mins read',
        action: 'bookmark-outline',
        color: '#5B6E7D',
        icon: 'book-open-variant',
    },
];

// ── Bottom tab items ──────────────────────────────────────────
const TABS = [
    { label: 'Home', icon: 'home', active: true },
    { label: 'Chat', icon: 'chat-outline', active: false },
    { label: 'Profile', icon: 'account-outline', active: false },
    { label: 'Settings', icon: 'cog-outline', active: false },
];

const HomeScreen = ({ navigation }) => {
    const [selectedMood, setSelectedMood] = useState(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* ── Top-bar ─────────────────────────────────────── */}
                <View style={styles.topBar}>
                    <View style={styles.topBarLeft}>
                        <MaterialCommunityIcons name="shield-check" size={22} color="#1A8C80" />
                        <Text style={styles.topBarTitle}>MindCare AI</Text>
                    </View>
                    <TouchableOpacity style={styles.bellBtn}>
                        <Ionicons name="notifications-outline" size={22} color="#0D1E2D" />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>

                    {/* ── Greeting ──────────────────────────────────── */}
                    <Text style={styles.greeting}>Good morning, Alex.</Text>
                    <Text style={styles.greetingSub}>How are you feeling today?</Text>

                    {/* ── Mood selector ─────────────────────────────── */}
                    <View style={styles.moodRow}>
                        {MOODS.map((m) => (
                            <TouchableOpacity
                                key={m.label}
                                style={[
                                    styles.moodCard,
                                    { backgroundColor: m.bg },
                                    selectedMood === m.label && styles.moodCardSelected,
                                ]}
                                onPress={() => setSelectedMood(m.label)}
                            >
                                <Text style={styles.moodEmoji}>{m.icon}</Text>
                                <Text style={styles.moodLabel}>{m.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ── Chat CTA card ──────────────────────────────── */}
                    <LinearGradient
                        colors={['#2BBFB0', '#3A7BDB']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.ctaCard}
                    >
                        <View style={styles.ctaTextBlock}>
                            <Text style={styles.ctaTitle}>Need to talk?</Text>
                            <Text style={styles.ctaSub}>
                                Our AI therapist is here to listen and guide you through anything on your mind.
                            </Text>
                            <TouchableOpacity
                                style={styles.ctaBtn}
                                onPress={() => navigation?.navigate('Chat')}
                            >
                                <Text style={styles.ctaBtnText}>Start Chatting  →</Text>
                            </TouchableOpacity>
                        </View>
                        <MaterialCommunityIcons
                            name="comment-multiple-outline"
                            size={56}
                            color="rgba(255,255,255,0.18)"
                            style={styles.ctaIcon}
                        />
                    </LinearGradient>

                    {/* ── Quick Access ───────────────────────────────── */}
                    <Text style={styles.sectionTitle}>Quick Access</Text>
                    <View style={styles.quickRow}>
                        {QUICK.map((q) => (
                            <TouchableOpacity key={q.label} style={styles.quickCard}>
                                <View style={[styles.quickIconBox, { backgroundColor: q.bg }]}>
                                    <MaterialCommunityIcons name={q.icon} size={24} color={q.color} />
                                </View>
                                <Text style={styles.quickLabel}>{q.label}</Text>
                                <Text style={styles.quickSub}>{q.sub}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ── Recommended ────────────────────────────────── */}
                    <View style={styles.recHeader}>
                        <Text style={styles.sectionTitle}>Recommended for you</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    {RECS.map((rec) => (
                        <View key={rec.id} style={styles.recCard}>
                            <View style={[styles.recThumb, { backgroundColor: '#E6F9F7' }]}>
                                <MaterialCommunityIcons name={rec.icon} size={30} color="#2BBFB0" />
                            </View>
                            <View style={styles.recText}>
                                <Text style={styles.recTitle}>{rec.title}</Text>
                                <Text style={styles.recSub}>{rec.sub}</Text>
                            </View>
                            <MaterialCommunityIcons name={rec.action} size={26} color={rec.color} />
                        </View>
                    ))}

                </View>
            </ScrollView>

            {/* ── Bottom Tab Bar ─────────────────────────────────── */}
            <View style={styles.tabBar}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.label}
                        style={styles.tabItem}
                        onPress={() => {
                            if (tab.label === 'Chat') navigation?.navigate('Chat');
                            if (tab.label === 'Profile') navigation?.navigate('Profile');
                            if (tab.label === 'Home') navigation?.navigate('Home');
                        }}
                    >
                        <MaterialCommunityIcons
                            name={tab.icon}
                            size={24}
                            color={tab.active ? '#2BBFB0' : '#9EAAB5'}
                        />
                        <Text style={[styles.tabLabel, tab.active && styles.tabLabelActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    scroll: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F4',
    },
    topBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    topBarTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0D1E2D',
    },
    bellBtn: {
        padding: 4,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
    },
    greeting: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0D1E2D',
        marginBottom: 4,
    },
    greetingSub: {
        fontSize: 14,
        color: '#5B6E7D',
        marginBottom: 20,
    },
    // Mood
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    moodCard: {
        width: '23%',
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: 'center',
        gap: 6,
    },
    moodCardSelected: {
        borderWidth: 2,
        borderColor: '#2BBFB0',
    },
    moodEmoji: {
        fontSize: 26,
    },
    moodLabel: {
        fontSize: 12,
        color: '#0D1E2D',
        fontWeight: '500',
    },
    // CTA
    ctaCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 28,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    ctaTextBlock: {
        flex: 1,
    },
    ctaTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
    },
    ctaSub: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 16,
    },
    ctaBtn: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignSelf: 'flex-start',
    },
    ctaBtnText: {
        color: '#2BBFB0',
        fontWeight: '700',
        fontSize: 14,
    },
    ctaIcon: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    // Quick access
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0D1E2D',
        marginBottom: 14,
    },
    quickRow: {
        flexDirection: 'row',
        gap: 14,
        marginBottom: 28,
    },
    quickCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    quickIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    quickLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0D1E2D',
        marginBottom: 3,
    },
    quickSub: {
        fontSize: 12,
        color: '#9EAAB5',
    },
    // Recommended
    recHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    seeAll: {
        color: '#2BBFB0',
        fontSize: 14,
        fontWeight: '600',
    },
    recCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
        gap: 14,
    },
    recThumb: {
        width: 52,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recText: {
        flex: 1,
    },
    recTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0D1E2D',
        marginBottom: 4,
    },
    recSub: {
        fontSize: 12,
        color: '#9EAAB5',
    },
    // Tab bar
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEF1F4',
        paddingVertical: 10,
        paddingBottom: 16,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        gap: 3,
    },
    tabLabel: {
        fontSize: 11,
        color: '#9EAAB5',
    },
    tabLabelActive: {
        color: '#2BBFB0',
        fontWeight: '600',
    },
});

export default HomeScreen;
