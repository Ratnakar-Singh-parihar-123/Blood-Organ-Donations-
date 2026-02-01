module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("join", ({ role }) => {
      console.log("➡️ join event:", role);

      if (role === "donor") {
        socket.join("donor");
        console.log("👥 Joined donor room:", socket.id);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
};
