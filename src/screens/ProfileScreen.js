import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// ── Account settings menu items ───────────────────────────────
const MENU_ITEMS = [
    { icon: 'account-outline', label: 'Edit Profile', sub: 'Name, email, and password' },
    { icon: 'cog-outline', label: 'Settings', sub: 'App preferences and privacy' },
    { icon: 'bell-outline', label: 'Notifications', sub: 'Reminder and alert settings' },
    { icon: 'help-circle-outline', label: 'Help & Support', sub: 'FAQs and contact us' },
];

// ── Bottom tabs ───────────────────────────────────────────────
const TABS = [
    { label: 'Home', icon: 'home-outline', active: false },
    { label: 'Meditate', icon: 'meditation', active: false },
    { label: 'Journal', icon: 'book-open-outline', active: false },
    { label: 'Profile', icon: 'account', active: true },
];

const ProfileScreen = ({ navigation, user, onLogout }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* ── Header ─────────────────────────────────── */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color="#0D1E2D" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Profile</Text>
                    <View style={{ width: 38 }} />
                </View>

                {/* ── Avatar ─────────────────────────────────── */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarOuter}>
                        <View style={styles.avatarInner}>
                            <MaterialCommunityIcons name="shield-check" size={48} color="#1A8C80" />
                        </View>
                        {/* Camera overlay badge */}
                        <TouchableOpacity style={styles.cameraBadge}>
                            <MaterialCommunityIcons name="camera" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.userName}>{user?.name || 'Alex Johnson'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'alex.j@example.com'}</Text>

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>STREAK</Text>
                            <Text style={styles.statValue}>12 Days</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>MINUTES</Text>
                            <Text style={styles.statValue}>340</Text>
                        </View>
                    </View>
                </View>

                {/* ── Account Settings ───────────────────────── */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>

                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity key={item.label} style={styles.menuRow}>
                            <View style={styles.menuIconBox}>
                                <MaterialCommunityIcons name={item.icon} size={20} color="#2BBFB0" />
                            </View>
                            <View style={styles.menuText}>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                                <Text style={styles.menuSub}>{item.sub}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#C4CDD5" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Logout ─────────────────────────────────── */}
                <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
                    <MaterialCommunityIcons name="logout" size={18} color="#E55050" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* ── Footer ─────────────────────────────────── */}
                <View style={styles.footer}>
                    <MaterialCommunityIcons name="shield-check" size={14} color="#2BBFB0" />
                    <Text style={styles.footerText}>  MindCare AI v2.4.0 • Made for your peace of mind</Text>
                </View>

            </ScrollView>

            {/* ── Bottom Tab Bar ─────────────────────────── */}
            <View style={styles.tabBar}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.label}
                        style={styles.tabItem}
                        onPress={() => {
                            if (tab.label === 'Home') navigation?.replace('Home');
                            if (tab.label === 'Chat') navigation?.navigate('Chat');
                            if (tab.label === 'Profile') navigation?.replace('Profile');
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
    safeArea: { flex: 1, backgroundColor: '#F2F5F8' },
    scroll: { paddingBottom: 24 },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
    },
    backBtn: { width: 38, padding: 4 },
    headerTitle: { fontSize: 17, fontWeight: '700', color: '#0D1E2D' },

    // Avatar section
    avatarSection: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 28,
        paddingBottom: 24,
        marginBottom: 12,
    },
    avatarOuter: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#E6F6F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        position: 'relative',
    },
    avatarInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#C8EFEC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#2BBFB0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userName: { fontSize: 20, fontWeight: '800', color: '#0D1E2D', marginBottom: 4 },
    userEmail: { fontSize: 14, color: '#8FA0AE', marginBottom: 20 },
    statsRow: {
        flexDirection: 'row',
        gap: 14,
    },
    statCard: {
        backgroundColor: '#EAF6FD',
        borderRadius: 14,
        paddingHorizontal: 28,
        paddingVertical: 12,
        alignItems: 'center',
    },
    statLabel: { fontSize: 10, fontWeight: '700', color: '#8FA0AE', letterSpacing: 1 },
    statValue: { fontSize: 17, fontWeight: '800', color: '#2BBFB0', marginTop: 2 },

    // Settings section
    section: {
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9EAAB5',
        letterSpacing: 1.2,
        marginBottom: 14,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F7',
    },
    menuIconBox: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#E6F9F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuText: { flex: 1 },
    menuLabel: { fontSize: 15, fontWeight: '600', color: '#0D1E2D', marginBottom: 2 },
    menuSub: { fontSize: 12, color: '#9EAAB5' },

    // Logout
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    logoutText: { color: '#E55050', fontSize: 16, fontWeight: '700' },

    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },
    footerText: { fontSize: 12, color: '#9EAAB5' },

    // Tab bar
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEF1F4',
        paddingVertical: 10,
        paddingBottom: 16,
    },
    tabItem: { flex: 1, alignItems: 'center', gap: 3 },
    tabLabel: { fontSize: 11, color: '#9EAAB5' },
    tabLabelActive: { color: '#2BBFB0', fontWeight: '600' },
});

export default ProfileScreen;
