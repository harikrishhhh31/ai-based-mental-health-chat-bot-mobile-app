const ChatSession = require('../models/ChatSession');
const { getGeminiResponse } = require('../services/gemini.service');

// @desc    Get all chat sessions for the logged in user
// @route   GET /api/chat/history
// @access  Private
const getUserSessions = async (req, res) => {
    try {
        // Return the latest sessions first
        const sessions = await ChatSession.find({ user: req.user._id }).sort({
            updatedAt: -1,
        });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message, get AI response, and save to DB
// @route   POST /api/chat/message
// @access  Private
const sendMessage = async (req, res) => {
    const { sessionId, message } = req.body;
    const userId = req.user._id;

    try {
        let session;
        let formattedHistory = [];

        // Attempt to retrieve existing session, if provided
        if (sessionId) {
            session = await ChatSession.findOne({ _id: sessionId, user: userId });
            if (!session) {
                return res
                    .status(404)
                    .json({ message: 'Chat session not found or unauthorized.' });
            }

            // Format previous history for Gemini (max 20 previous messages to save tokens)
            const recentHistory = session.messages.slice(-20);
            formattedHistory = recentHistory.map((msg) => ({
                role: msg.role, // Mongoose schema ensures this is exactly 'user' or 'model'
                parts: [{ text: msg.content }],
            }));
        } else {
            // Create a new session if no ID was provided
            session = new ChatSession({
                user: userId,
                title: message.substring(0, 30) + '...', // Automatic title generation
                messages: [],
            });
        }

        // Step 1: Add user's new message to the local memory object
        session.messages.push({
            role: 'user',
            content: message,
        });

        // Step 2: Query Gemini API via our service
        const aiResponseText = await getGeminiResponse(formattedHistory, message);

        // Step 3: Add AI's response to the local memory object
        session.messages.push({
            role: 'model',
            content: aiResponseText,
        });

        // Step 4: Save the entire sequence into MongoDB
        await session.save();

        // Step 5: Send the new message back to the frontend
        res.status(200).json({
            sessionId: session._id,
            title: session.title,
            reply: aiResponseText, // This directly fuels the Chat UI bubble
        });
    } catch (error) {
        console.error('Chat error:', error);
        res
            .status(500)
            .json({ message: 'Error processing chat.', error: error.message });
    }
};

module.exports = {
    getUserSessions,
    sendMessage,
};
