import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  Send, Search, Users, MoreVertical,
  Phone, Video, Info, Paperclip,
  Smile, Camera, Mic, CheckCheck,
  Clock, ChevronLeft, Image as ImageIcon,
  FileText, VideoIcon, X, Maximize2,
  UserPlus, Archive, Bell, BellOff,
  Trash2, Shield, Lock, Star,
  ThumbsUp, Heart, MessageCircle,
  User, Calendar, MapPin, Award,
  MessageSquare, Filter, CheckCircle,
  ArrowUp, ArrowRight, ArrowLeft
} from "lucide-react";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

const Chat = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [filter, setFilter] = useState("all"); // all, unread, groups
  const [isFullscreen, setIsFullscreen] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load chats
  useEffect(() => {
    if (!user || !user._id) return; // ⚠️ safety check

    const fetchChats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats`, {
          withCredentials: true
        });
        setChats(res.data);

        // 🔹 Calculate unread counts
        const counts = {};
        res.data.forEach(chat => {
          counts[chat._id] = chat.messages?.filter(msg =>
            !msg.read && msg.sender._id !== user._id
          ).length || 0;
        });
        setUnreadCounts(counts);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [user]); // ✅ Dependency ko 'user' rakha, _id pe nahi


  // Join socket room for selected chat
  useEffect(() => {
    if (!selectedChat) return;

    socket.emit("join", selectedChat._id);
    socket.emit("markAsRead", { chatId: selectedChat._id, userId: user._id });

    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
      scrollToBottom();

      // If message is from others and chat is active, mark as read
      if (msg.sender._id !== user._id) {
        socket.emit("markAsRead", { chatId: selectedChat._id, userId: user._id });
      }
    });

    socket.on("userTyping", (data) => {
      if (data.chatId === selectedChat._id && data.userId !== user._id) {
        setTypingUsers(prev => [...new Set([...prev, data.userId])]);
        setIsTyping(true);

        // Clear typing indicator after 3 seconds
        setTimeout(() => {
          setTypingUsers(prev => prev.filter(id => id !== data.userId));
          if (typingUsers.length === 1) setIsTyping(false);
        }, 3000);
      }
    });

    socket.on("userOnline", (userId) => {
      setOnlineUsers(prev => [...new Set([...prev, userId])]);
    });

    socket.on("userOffline", (userId) => {
      setOnlineUsers(prev => prev.filter(id => id !== userId));
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [selectedChat, user]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!selectedChat) return;
    socket.emit("typing", {
      chatId: selectedChat._id,
      userId: user._id,
      userName: user.name
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats/message`,
        {
          chatId: selectedChat._id,
          text: message
        },
        { withCredentials: true }
      );

      setMessages(res.data.messages);
      socket.emit("sendMessage", {
        chatId: selectedChat._id,
        senderId: user._id,
        text: message,
        senderName: user.name
      });
      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file) => {
    if (!selectedChat) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chatId", selectedChat._id);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats/upload`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      setMessages(prev => [...prev, res.data.message]);
      socket.emit("sendMessage", {
        chatId: selectedChat._id,
        senderId: user._id,
        text: `📎 ${file.name}`,
        file: res.data.file,
        senderName: user.name
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Get other participants in chat
  const getOtherParticipants = (chat) => {
    return chat.participants.filter(p => p.userId._id !== user._id);
  };

  // Get chat title
  const getChatTitle = (chat) => {
    const others = getOtherParticipants(chat);
    if (others.length === 1) {
      return others[0].userId.name;
    }
    return others.map(p => p.userId.name).join(", ");
  };

  // Get chat subtitle
  const getChatSubtitle = (chat) => {
    const others = getOtherParticipants(chat);
    if (others.length === 1) {
      return `${others[0].role} • ${onlineUsers.includes(others[0].userId._id) ? 'Online' : 'Offline'}`;
    }
    return `${others.length} participants`;
  };

  // Get last message preview
  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return "No messages yet";
    const lastMsg = chat.messages[chat.messages.length - 1];
    return lastMsg.text.length > 30
      ? lastMsg.text.substring(0, 30) + "..."
      : lastMsg.text;
  };

  // Filtered chats
  const filteredChats = chats.filter(chat => {
    const matchesSearch = getChatTitle(chat).toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "unread") {
      return matchesSearch && (unreadCounts[chat._id] > 0);
    }
    if (filter === "groups") {
      return matchesSearch && getOtherParticipants(chat).length > 1;
    }
    return matchesSearch;
  });

  // Quick reactions
  const quickReactions = ["👍", "❤️", "🔥", "🎉", "🙏", "🤝", "👏", "💯"];

  return (
    <div className={`flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Left Sidebar - Chat List */}
      <div className={`w-full md:w-96 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Messages</h1>
                <p className="text-blue-100 text-sm">{chats.length} conversations</p>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-white hover:bg-white/20 rounded-lg"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-lg border-none focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === "all"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Users className="h-3 w-3 inline mr-1" />
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === "unread"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Bell className="h-3 w-3 inline mr-1" />
              Unread
              {Object.values(unreadCounts).reduce((a, b) => a + b, 0) > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter("groups")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === "groups"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Users className="h-3 w-3 inline mr-1" />
              Groups
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No conversations</h3>
              <p className="text-gray-500 text-center">
                {searchQuery
                  ? `No chats found for "${searchQuery}"`
                  : "Start a conversation with a donor or patient"}
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const otherParticipants = getOtherParticipants(chat);
              const isOnline = otherParticipants.some(p => onlineUsers.includes(p.userId._id));
              const unreadCount = unreadCounts[chat._id] || 0;

              return (
                <div
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat);
                    setMessages(chat.messages || []);
                    setUnreadCounts(prev => ({ ...prev, [chat._id]: 0 }));
                  }}
                  className={`p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${selectedChat?._id === chat._id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {getChatTitle(chat).charAt(0).toUpperCase()}
                      </div>
                      {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {otherParticipants.length > 1 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
                          {otherParticipants.length}
                        </div>
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {getChatTitle(chat)}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {chat.lastMessageTime || "Just now"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">
                        {getLastMessage(chat)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {getChatSubtitle(chat)}
                        </span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => {
              // Create new chat functionality
              console.log("Start new chat");
            }}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <UserPlus className="h-5 w-5" />
            <span>New Conversation</span>
          </button>
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
        {/* Chat Header */}
        {selectedChat && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>

                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {getChatTitle(selectedChat).charAt(0).toUpperCase()}
                  </div>
                  {getOtherParticipants(selectedChat).some(p => onlineUsers.includes(p.userId._id)) && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div>
                  <h2 className="font-bold text-gray-800">{getChatTitle(selectedChat)}</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {getOtherParticipants(selectedChat).length === 1
                        ? `${getOtherParticipants(selectedChat)[0].role} • ${onlineUsers.includes(getOtherParticipants(selectedChat)[0].userId._id)
                          ? 'Online'
                          : 'Offline'
                        }`
                        : `${getOtherParticipants(selectedChat).length} participants`
                      }
                    </span>
                    {getOtherParticipants(selectedChat).some(p => p.verified) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => window.open(`tel:${getOtherParticipants(selectedChat)[0]?.userId?.phone}`)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Voice Call"
                >
                  <Phone className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleFileUpload}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                  title="Video Call"
                >
                  <Video className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowChatInfo(!showChatInfo)}
                  className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                  title="Chat Info"
                >
                  <Info className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span>{typingUsers.length} user{typingUsers.length > 1 ? 's' : ''} typing...</span>
              </div>
            )}
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50">
          {!selectedChat ? (
            <div className="flex flex-col items-center justify-center h-full">
              <MessageCircle className="h-20 w-20 text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a conversation</h3>
              <p className="text-gray-500 text-center max-w-md">
                Choose a chat from the list to start messaging, or start a new conversation
              </p>
              <button
                onClick={() => console.log("Start new chat")}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Start New Chat
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No messages yet</h3>
              <p className="text-gray-500 text-center max-w-md">
                Send the first message to start the conversation
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => {
                const isCurrentUser = msg.sender._id === user._id;
                const isConsecutive = idx > 0 && messages[idx - 1].sender._id === msg.sender._id;

                return (
                  <div
                    key={idx}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] ${isConsecutive ? "mt-1" : "mt-4"}`}>
                      {!isConsecutive && !isCurrentUser && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {msg.sender.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-2.5 ${isCurrentUser
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                          }`}
                      >
                        {msg.file ? (
                          <div className="space-y-2">
                            <div className="p-3 bg-white/10 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Paperclip className="h-4 w-4" />
                                <span className="font-medium">{msg.file.name}</span>
                              </div>
                              <div className="text-xs opacity-80 mt-1">
                                {msg.file.size} • {msg.file.type}
                              </div>
                            </div>
                            {msg.text && <p className="mt-2">{msg.text}</p>}
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        )}
                      </div>

                      <div className={`flex items-center justify-end space-x-2 mt-1 ${isCurrentUser ? "" : "justify-start"}`}>
                        {isCurrentUser && (
                          <>
                            <span className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.read ? (
                              <CheckCheck className="h-3 w-3 text-blue-500" />
                            ) : (
                              <Clock className="h-3 w-3 text-gray-400" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        {selectedChat && (
          <div className="border-t border-gray-200 bg-white p-4">
            {/* Quick Reactions */}
            <div className="flex items-center space-x-2 mb-3 overflow-x-auto pb-2">
              <span className="text-sm text-gray-500 mr-2">Quick:</span>
              {quickReactions.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => setMessage(prev => prev + emoji)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {/* Attachment Button */}
              <div className="relative">
                <button
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Paperclip className="h-5 w-5" />
                </button>

                {showAttachmentMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-48 z-10">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left"
                    >
                      <ImageIcon className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-800">Photo & Video</div>
                        <div className="text-xs text-gray-500">Upload from device</div>
                      </div>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                      <Camera className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-800">Camera</div>
                        <div className="text-xs text-gray-500">Take photo/video</div>
                      </div>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-800">Document</div>
                        <div className="text-xs text-gray-500">Upload files</div>
                      </div>
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                  }}
                  multiple
                />
              </div>

              {/* Message Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Smile className="h-5 w-5" />
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`p-3 rounded-full ${message.trim()
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  } transition-all duration-200`}
              >
                {message.trim() ? (
                  <Send className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Info Sidebar */}
      {showChatInfo && selectedChat && (
        <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Chat Info</h3>
              <button
                onClick={() => setShowChatInfo(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Participants */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Participants</h4>
              <div className="space-y-3">
                {selectedChat.participants.map((participant, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {participant.userId.name}
                          {participant.userId._id === user._id && " (You)"}
                        </div>
                        <div className="text-sm text-gray-600">{participant.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {onlineUsers.includes(participant.userId._id) ? (
                        <div className="text-xs text-green-600 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          Online
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">Offline</div>
                      )}
                      {participant.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Details */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Chat Details</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">
                    {new Date(selectedChat.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Messages</span>
                  <span className="font-medium">{messages.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${getOtherParticipants(selectedChat).some(p => onlineUsers.includes(p.userId._id))
                      ? "text-green-600"
                      : "text-gray-600"
                    }`}>
                    {getOtherParticipants(selectedChat).some(p => onlineUsers.includes(p.userId._id))
                      ? "Active now"
                      : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left text-red-600">
                <BellOff className="h-4 w-4" />
                <span>Mute Notifications</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left text-gray-700">
                <Archive className="h-4 w-4" />
                <span>Archive Chat</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left text-red-600">
                <Trash2 className="h-4 w-4" />
                <span>Delete Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="fixed bottom-20 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-64">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Emoji</h4>
            <button
              onClick={() => setShowEmojiPicker(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {["😀", "😂", "🥰", "😎", "🤔", "👍", "❤️", "🔥", "🎉", "🙏", "💯", "👏"].map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMessage(prev => prev + emoji);
                  setShowEmojiPicker(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;