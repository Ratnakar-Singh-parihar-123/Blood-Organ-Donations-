const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Create a new notification (admin/system)
router.post("/", notificationController.createNotification);

// Get all notifications
router.get("/", notificationController.getNotifications);

// Mark a notification as read
router.put("/read/:id", notificationController.markAsRead);

module.exports = router;
