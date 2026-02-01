const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Server } = require("socket.io");
const http = require("http");

// Import routes & DB
const authRoutes = require('./routes/authRoutes');
const blooddonorRoutes = require('./routes/bloodDonor');
const organdonorRoutes = require('./routes/organDonor');
const patientRoutes = require('./routes/patientRoutes');
const alluserdonotCountRoutes = require('./routes/alluserdonorcountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const connectDB = require('./config/database');

// Initialize express
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ================= SOCKET.IO =================
const socketSetup = require("./socket/socket");
const { setSocketIO } = require("./controllers/notificationController");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketSetup(io);
setSocketIO(io);
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blood-donors', blooddonorRoutes);
app.use('/api/organ-donors', organdonorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dashboard', alluserdonotCountRoutes);
app.use("/api/notifications", notificationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔌 Socket.IO enabled`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

startServer();
