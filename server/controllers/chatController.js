const Chat = require("../models/Chat");
const User = require("../models/User");

// Create or get a chat between two users
exports.accessChat = async (req, res) => {
  const { userId, role } = req.body; // role of the other participant
  const loggedInUserId = req.user._id; // from auth middleware

  try {
    // Check if chat exists
    let chat = await Chat.findOne({
      participants: { 
        $all: [
          { $elemMatch: { userId: loggedInUserId } },
          { $elemMatch: { userId, role } }
        ]
      }
    }).populate("participants.userId", "name role");

    if (!chat) {
      // Create new chat
      chat = await Chat.create({
        participants: [
          { userId: loggedInUserId, role: req.user.role },
          { userId, role }
        ]
      });
      chat = await chat.populate("participants.userId", "name role");
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error accessing chat" });
  }
};

// Get all chats for logged in user
exports.getChats = async (req, res) => {
  const loggedInUserId = req.user._id;

  try {
    const chats = await Chat.find({
      "participants.userId": loggedInUserId
    }).populate("participants.userId", "name role").sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching chats" });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { chatId, text } = req.body;
  const senderId = req.user._id;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const message = { sender: senderId, text };
    chat.messages.push(message);
    await chat.save();
    const populatedChat = await chat.populate("messages.sender", "name role");

    res.status(200).json(populatedChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending message" });
  }
};
