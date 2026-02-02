const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Create notification
router.post("/", notificationController.createNotification);

// Get all notifications
router.get("/", notificationController.getNotifications);

// Mark as read
router.put("/:id/read", notificationController.markAsRead);


// Mark ALL notifications as read
router.put("/read-all", notificationController.markAllAsRead);

// Delete single notification
router.delete("/:id", notificationController.deleteNotification);

// Delete all notifications
router.delete("/", notificationController.deleteAllNotifications);

module.exports = router;
