const BloodDonor = require("../models/BloodDonor");
const OrganDonor = require("../models/OrganDonor");
const Patient = require("../models/Patient");
const User = require("../models/User"); // agar common user model hai

const getDashboardCounts = async (req, res) => {
  try {
    const bloodDonorCount = await BloodDonor.countDocuments();
    const organDonorCount = await OrganDonor.countDocuments();
    const patientCount = await Patient.countDocuments();
    const userCount = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        bloodDonors: bloodDonorCount,
        organDonors: organDonorCount,
        patients: patientCount,
        users: userCount,
      },
    });
  } catch (error) {
    console.error("Dashboard count error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getDashboardCounts };
