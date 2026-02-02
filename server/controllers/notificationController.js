const Notification = require("../models/Notification");
const User = require("../models/User");
const Patient = require("../models/Patient");
const BloodDonor = require("../models/BloodDonor");
const OrganDonor = require("../models/OrganDonor");

let io;

/* ===============================
   SOCKET.IO INITIALIZER
================================ */
exports.setSocketIO = (socketIO) => {
  io = socketIO;

  // 📊 Emit system stats every 1 minute
  setInterval(async () => {
    if (!io) return;

    try {
      const totalBloodDonors = await BloodDonor.countDocuments();
      const totalOrganDonors = await OrganDonor.countDocuments();
      const totalUsers = await User.countDocuments({ role: "user" });
      const totalPatients = await Patient.countDocuments();

      const statsNotification = {
        _id: "stats-" + Date.now(),
        title: "📊 System Stats Update",
        message: `Blood Donors: ${totalBloodDonors}, Organ Donors: ${totalOrganDonors}, Users: ${totalUsers}, Patients: ${totalPatients}`,
        type: "system",
        isSystem: true,
        createdAt: new Date(),
      };

      io.emit("new-notification", statsNotification);
    } catch (err) {
      console.error("Stats notification error:", err.message);
    }
  }, 60 * 1000);
};

/* ===============================
   CREATE + EMIT NOTIFICATION
================================ */
exports.createNotification = async (req, res) => {
  try {
    const { title, message, bloodGroup, location, type } = req.body;

    const notification = await Notification.create({
      title,
      message,
      bloodGroup: bloodGroup || null,
      location: location || "Unknown",
      type: type || "blood", // blood | organ | system
    });

    // 🔔 SOCKET EMIT
    if (io) {
      if (type === "blood" && bloodGroup) {
        io.to(`blood-${bloodGroup}`).emit("new-notification", notification);
      } else if (type === "organ") {
        io.to("organ-donor").emit("new-notification", notification);
      } else {
        io.emit("new-notification", {
          ...notification.toObject(),
          isSystem: true,
        });
      }
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET ALL NOTIFICATIONS
================================ */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   MARK ONE AS READ
================================ */
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   MARK ALL AS READ
================================ */
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
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   DELETE ONE
================================ */
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   DELETE ALL
================================ */
exports.deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ success: true, message: "All notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   🔔 EMIT REGISTER NOTIFICATION
================================ */
exports.emitNewUserNotification = (data) => {
  if (!io) return;

  const notification = {
    _id: "reg-" + Date.now(),
    title: `🎉 New ${data.role} Registered`,
    message: `${data.fullName} joined as ${data.role}`,
    bloodGroup: data.bloodGroup || null,
    location: data.location || "Unknown",
    type: "system",
    isSystem: true,
    createdAt: new Date(),
  };

  io.emit("new-notification", notification);
};
