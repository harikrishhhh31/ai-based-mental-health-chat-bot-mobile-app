// @ts-nocheck
import React from 'react';
import { useRouter } from 'expo-router';
import ChatScreenUI from '../src/screens/ChatScreen';
import useChatStore from '../src/store/useChatStore';

export default function Chat() {
    const router = useRouter();
    const { messages, sendMessage, isLoading, startNewChat } = useChatStore();

    return (
        <ChatScreenUI
            messages={messages}
            onSendMessage={sendMessage}
            isLoading={isLoading}
            navigation={{ goBack: () => router.back() }}
        />
    );
}
