const Notification = require("../models/Notification");
const User = require("../models/User"); 
const Patient = require("../models/Patient");
const BloodDonor = require("../models/BloodDonor");
const OrganDonor = require("../models/OrganDonor");

let io;

// Initialize Socket.IO
exports.setSocketIO = (socketIO) => {
  io = socketIO;

  // Emit system stats every 1 minute
  setInterval(async () => {
    if (!io) return;

    const totalBloodDonors = await BloodDonor.countDocuments();
    const totalOrganDonors = await OrganDonor.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalPatients = await Patient.countDocuments();

    const statsNotification = {
      _id: "stats-" + Date.now(),
      title: "System Stats Update",
      message: `Blood Donors: ${totalBloodDonors}, Organ Donors: ${totalOrganDonors}, Users: ${totalUsers}, Patients: ${totalPatients}`,
      location: "System",
      bloodGroup: null,
      isSystem: true,
      createdAt: new Date(),
    };

    io.emit("new-notification", statsNotification);
  }, 60 * 1000); // every 1 minute
};

// CREATE + EMIT Notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, bloodGroup, location, type } = req.body;

    const notification = await Notification.create({
      title,
      message,
      bloodGroup: bloodGroup || null,
      location: location || "Unknown",
      type: type || "blood", // blood / organ / system
    });

    if (io) {
      // Emit based on type
      if (type === "blood" && bloodGroup) {
        io.to("donor").emit("new-notification", notification);
      } else if (type === "organ") {
        io.to("organ-donor").emit("new-notification", notification);
      } else {
        io.emit("new-notification", { ...notification.toObject(), isSystem: true });
      }
    }

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MARK Notification as Read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE single notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE all notifications
exports.deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({
      success: true,
      message: "All notifications deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MARK ALL Notifications as Read
exports.markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { isRead: false }, 
      { $set: { isRead: true } }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} notifications marked as read`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// EMIT New Donor / User Registration Notification
exports.emitNewUserNotification = async (newUser) => {
  if (!io) return;

  const newUserNotification = {
    _id: "new-user-" + Date.now(),
    title: "New User Registered",
    message: `${newUser.fullName} joined as ${newUser.role}`,
    location: newUser.location || "Unknown",
    bloodGroup: newUser.bloodGroup || null,
    isSystem: true,
    createdAt: new Date(),
  };

  io.emit("new-notification", newUserNotification);
};
