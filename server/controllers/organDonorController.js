const OrganDonor = require("../models/OrganDonor");
const { generateToken } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const {
      fullName,
      age,
      bloodGroup,
      phone,
      email,
      organsToDonate,
      emergencyContact,
      medicalHistory,
      address,
      password,
    } = req.body;

    // check if organ donor already exists
    const existingOrganDonor = await OrganDonor.findOne({ email });
    if (existingOrganDonor) {
      return res.status(400).json({
        success: false,
        message: "Organ Donor already exists with this email",
      });
    }

    // create organ donor
    const organDonor = await OrganDonor.create({
      fullName,
      age,
      bloodGroup,
      phone,
      email,
      organsToDonate,
      emergencyContact,
      medicalHistory,
      address,
      password,
    });

    // Generate JWT
    const token = generateToken(organDonor._id);

    organDonor.password = undefined;

    res.status(201).json({
      success: true,
      message: "Organ Donor registered successfully",
      token,
      organDonor,
    });
  } catch (error) {
    console.error("Organ Donor Registration Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const organDonor = await OrganDonor.findOne({ email }).select("+password");

    if (!organDonor) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await organDonor.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(organDonor._id);

    organDonor.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      organDonor,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// ================= LOGOUT =================
const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Please delete the token on client side.",
  });
};

// send otp
const forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;

    let Model;

    switch (role) {
      case "bloodDonor":
        Model = BloodDonor;
        break;
      case "organDonor":
        Model = OrganDonor;
        break;
      case "patient":
        Model = Patient;
        break;
      default:
        Model = User;
    }

    const user = await Model.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    user.resetOTP = hashedOTP;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`,
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const organdonor = await OrganDonor.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpire: { $gt: Date.now() },
    });

    if (!organdonor) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const organdonor = await OrganDonor.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpire: { $gt: Date.now() },
    });

    if (!organdonor) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    organdonor.password = newPassword;
    organdonor.resetOTP = undefined;
    organdonor.resetOTPExpire = undefined;

    await organdonor.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// resend otp
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const organdonor = await OrganDonor.findOne({ email });
    if (!organdonor) {
      return res.status(404).json({ message: "Organ Donor not found" });
    }

    // OPTIONAL: cooldown (60 sec)
    if (
      organdonor.resetOTPExpire &&
      organdonor.resetOTPExpire > Date.now() - 9 * 60 * 1000
    ) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting OTP again" });
    }

    // generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // overwrite old OTP
    organdonor.resetOTP = hashedOTP;
    organdonor.resetOTPExpire = Date.now() + 10 * 60 * 1000;

    await organdonor.save();

    await sendEmail(
      email,
      "Resend Password Reset OTP",
      `Your new OTP is ${otp}. It will expire in 10 minutes.`,
    );

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update organ donor profile
const updateOrganDonorProfile = async (req, res) => {
  try {
    if (req.user.role !== "organDonor") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { name, phone, organType, bloodGroup, location } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (organType) updateData.organType = organType;
    if (bloodGroup) updateData.bloodGroup = bloodGroup;
    if (location) updateData.location = location;

    const updatedDonor = await OrganDonor.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedDonor) {
      return res.status(404).json({
        success: false,
        message: "Organ donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Organ donor profile updated successfully",
      donor: updatedDonor,
    });
  } catch (error) {
    console.error("Update organ donor profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateOrganDonorProfilePic = async (req, res) => {
  try {
    if (req.user.role !== "organDonor") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // 🔎 Fetch donor first
    const donor = await OrganDonor.findById(req.user.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Organ donor not found",
      });
    }

    // 🔥 Delete old image if exists
    if (donor.profilePicPublicId) {
      await cloudinary.uploader.destroy(donor.profilePicPublicId);
    }

    // 📤 Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "organ_donor_profile_pictures",
    });

    // 📝 Update fields
    donor.profilePic = result.secure_url;
    donor.profilePicPublicId = result.public_id;

    await donor.save();

    res.status(200).json({
      success: true,
      message: "Organ donor profile picture updated successfully",
      donor,
    });
  } catch (error) {
    console.error("Update organ donor pic error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
  updateOrganDonorProfile,
  updateOrganDonorProfilePic,
};
