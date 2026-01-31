const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query;
    
    const notifications = await Notification.getUserNotifications(
      req.user.id,
      req.userType,
      parseInt(limit),
      parseInt(skip)
    );

    const unreadCount = await Notification.getUnreadCount(req.user.id, req.userType);

    res.json({
      success: true,
      notifications,
      unreadCount,
      total: notifications.length
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/notifications/unread-count
// @desc    Get unread notifications count
// @access  Private
router.get('/unread-count', auth, async (req, res) => {
  try {
    const count = await Notification.getUnreadCount(req.user.id, req.userType);
    
    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/notifications/read
// @desc    Mark notifications as read
// @access  Private
router.put('/read', auth, async (req, res) => {
  try {
    const { notificationIds } = req.body;
    
    if (!notificationIds || !Array.isArray(notificationIds)) {
      return res.status(400).json({
        success: false,
        message: 'Notification IDs are required'
      });
    }

    await Notification.markAsRead(notificationIds, req.user.id);

    // Emit real-time update via socket
    if (req.io && req.userSocketId) {
      req.io.to(req.userSocketId).emit('notifications:updated', {
        type: 'mark_as_read',
        notificationIds
      });
    }

    const unreadCount = await Notification.getUnreadCount(req.user.id, req.userType);

    res.json({
      success: true,
      message: 'Notifications marked as read',
      unreadCount
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
      userType: req.userType,
      isRead: false,
      isDeleted: false
    });

    const notificationIds = notifications.map(n => n._id);
    
    if (notificationIds.length > 0) {
      await Notification.markAsRead(notificationIds, req.user.id);
    }

    // Emit real-time update via socket
    if (req.io && req.userSocketId) {
      req.io.to(req.userSocketId).emit('notifications:updated', {
        type: 'mark_all_as_read'
      });
    }

    res.json({
      success: true,
      message: 'All notifications marked as read',
      count: notificationIds.length
    });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        isDeleted: true
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Emit real-time update via socket
    if (req.io && req.userSocketId) {
      req.io.to(req.userSocketId).emit('notifications:updated', {
        type: 'delete',
        notificationId: req.params.id
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/notifications/clear-all
// @desc    Clear all notifications
// @access  Private
router.delete('/clear-all', auth, async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        userType: req.userType,
        isDeleted: false
      },
      {
        isDeleted: true
      }
    );

    // Emit real-time update via socket
    if (req.io && req.userSocketId) {
      req.io.to(req.userSocketId).emit('notifications:updated', {
        type: 'clear_all'
      });
    }

    res.json({
      success: true,
      message: 'All notifications cleared'
    });
  } catch (error) {
    console.error('Clear all notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;