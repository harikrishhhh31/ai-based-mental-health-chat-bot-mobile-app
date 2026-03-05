const express = require('express');
const {
    getUserSessions,
    sendMessage,
} = require('../controllers/chat.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Require all chat routes to be authenticated
router.use(protect);

router.get('/history', getUserSessions);
router.post('/message', sendMessage);

module.exports = router;
