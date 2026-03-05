import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const QUICK_REPLIES = ['Grounding exercise', 'Talk about work'];

const ChatScreen = ({ navigation, messages, onSendMessage, isLoading }) => {
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const sendMessage = (text) => {
        const msg = text.trim() || inputText.trim();
        if (!msg) return;

        if (onSendMessage) {
            onSendMessage(msg);
        }
        setInputText('');
    };

    const renderMessage = ({ item }) => {
        const isAI = item.role === 'ai';
        return (
            <View style={[styles.messageRow, isAI ? styles.rowLeft : styles.rowRight]}>
                {/* AI avatar */}
                {isAI && (
                    <View style={styles.aiAvatar}>
                        <MaterialCommunityIcons name="shield-check" size={16} color="#1A8C80" />
                    </View>
                )}

                <View style={[styles.bubble, isAI ? styles.aiBubble : styles.userBubble]}>
                    <Text style={[styles.bubbleText, !isAI && styles.userBubbleText]}>
                        {item.text}
                    </Text>
                </View>

                {/* User avatar */}
                {!isAI && (
                    <View style={styles.userAvatar}>
                        <MaterialCommunityIcons name="account" size={18} color="#FFFFFF" />
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* ── Header ─────────────────────────────────────────── */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.headerBtn}>
                    <Ionicons name="arrow-back" size={22} color="#0D1E2D" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>MindCare AI</Text>
                    <View style={styles.onlineRow}>
                        <View style={styles.onlineDot} />
                        <Text style={styles.onlineText}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerBtn}>
                    <Ionicons name="ellipsis-vertical" size={22} color="#0D1E2D" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
                {/* ── Messages ───────────────────────────────────── */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messagesList}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    ListHeaderComponent={
                        <Text style={styles.dateSeparator}>TODAY</Text>
                    }
                />

                {/* ── Quick Replies ──────────────────────────────── */}
                <View style={styles.quickRepliesRow}>
                    {QUICK_REPLIES.map((reply) => (
                        <TouchableOpacity
                            key={reply}
                            style={styles.quickReplyChip}
                            onPress={() => sendMessage(reply)}
                        >
                            <Text style={styles.quickReplyText}>{reply}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Disclaimer ─────────────────────────────────── */}
                <Text style={styles.disclaimer}>
                    MindCare is here to support, but not replace professional medical advice.
                </Text>

                {/* ── Input Bar ──────────────────────────────────── */}
                <View style={styles.inputBar}>
                    <TouchableOpacity style={styles.plusBtn}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={26} color="#9EAAB5" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type your message..."
                        placeholderTextColor="#C0CDD6"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, inputText.trim() && styles.sendBtnActive]}
                        onPress={() => sendMessage(inputText)}
                    >
                        <Ionicons name="send" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    flex: { flex: 1 },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F4',
        backgroundColor: '#FFFFFF',
    },
    headerBtn: { padding: 6, width: 38 },
    headerCenter: { alignItems: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '700', color: '#0D1E2D' },
    onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#2ECC71' },
    onlineText: { fontSize: 12, color: '#2ECC71', fontWeight: '500' },

    // Messages
    messagesList: { padding: 16, paddingBottom: 8 },
    dateSeparator: {
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '600',
        color: '#9EAAB5',
        letterSpacing: 1.2,
        marginBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    rowLeft: { justifyContent: 'flex-start' },
    rowRight: { justifyContent: 'flex-end' },
    aiAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E0F6F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F4A261',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    bubble: {
        maxWidth: '72%',
        borderRadius: 18,
        padding: 14,
    },
    aiBubble: {
        backgroundColor: '#F0F4F8',
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        backgroundColor: '#2BBFB0',
        borderBottomRightRadius: 4,
    },
    bubbleText: {
        fontSize: 14,
        color: '#0D1E2D',
        lineHeight: 20,
    },
    userBubbleText: {
        color: '#FFFFFF',
    },

    // Quick replies
    quickRepliesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    quickReplyChip: {
        borderWidth: 1.5,
        borderColor: '#C8D6E0',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
    },
    quickReplyText: {
        fontSize: 13,
        color: '#0D1E2D',
        fontWeight: '500',
    },

    // Disclaimer
    disclaimer: {
        textAlign: 'center',
        fontSize: 11,
        color: '#B0BEC5',
        paddingHorizontal: 20,
        paddingBottom: 8,
    },

    // Input bar
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
        borderTopColor: '#EEF1F4',
        backgroundColor: '#FFFFFF',
        gap: 10,
    },
    plusBtn: { padding: 2 },
    textInput: {
        flex: 1,
        backgroundColor: '#F2F5F8',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
        color: '#0D1E2D',
        maxHeight: 100,
    },
    sendBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#C0CDD6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBtnActive: {
        backgroundColor: '#2BBFB0',
    },
});

export default ChatScreen;
