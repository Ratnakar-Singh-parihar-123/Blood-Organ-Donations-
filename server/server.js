const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

// ================= IMPORT ROUTES =================
const authRoutes = require("./routes/authRoutes");
const blooddonorRoutes = require("./routes/bloodDonor");
const organdonorRoutes = require("./routes/organDonor");
const patientRoutes = require("./routes/patientRoutes");
const alluserdonorCountRoutes = require("./routes/alluserdonorcountRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// ================= DB =================
const connectDB = require("./config/database");

// ================= APP INIT =================
const app = express();
const server = http.createServer(app);

// ================= CORS CONFIG =================
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= REQUEST LOG =================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ================= SOCKET.IO =================
const socketSetup = require("./socket/socket");
const { setSocketIO } = require("./controllers/notificationController");

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketSetup(io);
setSocketIO(io);

// ================= HEALTH CHECK =================
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
    env: process.env.NODE_ENV || "development",
    time: new Date().toISOString(),
  });
});

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/blood-donors", blooddonorRoutes);
app.use("/api/organ-donors", organdonorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/dashboard", alluserdonorCountRoutes);
app.use("/api/notifications", notificationRoutes);

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Allowed Origin: ${allowedOrigin}`);
      console.log(`🔌 Socket.IO active`);
    });
  } catch (error) {
    console.error("❌ Server start failed:", error.message);
    process.exit(1);
  }
};

// ================= SAFETY =================
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err.message);
  process.exit(1);
});

startServer();
