let io;

exports.setSocketIO = (serverIo) => {
  io = serverIo;

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join user-specific room
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // Listen for sending messages
    socket.on("sendMessage", ({ chatId, senderId, text }) => {
      const message = { sender: senderId, text, timestamp: new Date() };
      io.to(chatId).emit("receiveMessage", message); // broadcast to chat room
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

exports.getIO = () => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};
