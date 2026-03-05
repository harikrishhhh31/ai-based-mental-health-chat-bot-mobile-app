import { create } from 'zustand';
import { sendChatMessage, getChatSessions } from '../api/client';

const useChatStore = create((set, get) => ({
    // ── State ────────────────────────────────────────────────────
    messages: [],         // [{ id, role: 'user'|'ai', text }]
    sessionId: null,      // current chat session ID from MongoDB
    sessions: [],         // list of past sessions
    isLoading: false,     // true while waiting for AI response
    error: null,

    // ── Actions ──────────────────────────────────────────────────

    /**
     * Send a message and get a real AI reply from the backend.
     * The backend forwards to Gemini and saves to MongoDB.
     */
    sendMessage: async (text) => {
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            text,
        };

        // Immediately append the user's message for instant feedback
        set((state) => ({
            messages: [...state.messages, userMessage],
            isLoading: true,
            error: null,
        }));

        try {
            const res = await sendChatMessage(text, get().sessionId);
            const { reply, sessionId } = res.data;

            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: reply,
            };

            set((state) => ({
                messages: [...state.messages, aiMessage],
                sessionId,           // save/update the session ID from backend
                isLoading: false,
            }));
        } catch (err) {
            const message = err.response?.data?.message || 'Could not get a response. Please try again.';
            set({ error: message, isLoading: false });
        }
    },

    /**
     * Load past chat sessions from the server.
     */
    loadSessions: async () => {
        try {
            const res = await getChatSessions();
            set({ sessions: res.data });
        } catch {
            // silently fail
        }
    },

    /**
     * Start a brand-new empty chat session.
     */
    startNewChat: () => {
        set({
            messages: [],
            sessionId: null,
            error: null,
        });
    },

    clearError: () => set({ error: null }),
}));

export default useChatStore;
