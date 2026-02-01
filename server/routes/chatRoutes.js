const express = require("express");
const router = express.Router();
const { accessChat, getChats, sendMessage } = require("../controllers/chatController");
// const authMiddleware = require("../middleware/auth");

// Access or create chat
router.post("/", accessChat);

// Get all chats
router.get("/", getChats);

// Send message
router.post("/message", sendMessage);

module.exports = router;
