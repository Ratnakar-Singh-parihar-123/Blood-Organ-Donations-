const Hospital = require("../models/Hospital");
const { generateToken } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary").v2;

// Hospital Register
const register = async (req, res) => {
  try {
    const { hospitalName, registrationNumber, email, phone, city, password } =
      req.body;

    // 1️⃣ Validate required fields
    if (
      !hospitalName ||
      !registrationNumber ||
      !email ||
      !phone ||
      !city ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check email OR registration number
    const existingHospital = await Hospital.findOne({
      $or: [{ email }, { registrationNumber }],
    });

    if (existingHospital) {
      return res.status(400).json({
        success: false,
        message:
          "Hospital already exists with this email or registration number",
      });
    }

    // 3️⃣ Create hospital (password will hash in model)
    const hospital = await Hospital.create({
      hospitalName,
      registrationNumber,
      email,
      phone,
      city,
      password,
    });

    // 4️⃣ Generate JWT token
    const token = generateToken(hospital._id);

    // 5️⃣ Send response
    res.status(201).json({
      success: true,
      message: "Hospital registered successfully",
      token,
      hospital: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        city: hospital.city,
        isVerified: hospital.isVerified || false,
      },
    });
  } catch (error) {
    console.error("Hospital Registration error:", error);

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

// login logic
const login = async (req, res) => {
  try {
    let { email, registrationNumber, password } = req.body;

    if ((!email && !registrationNumber) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or Registration Number and password are required",
      });
    }

    if (email) email = email.toLowerCase();

    const hospital = await Hospital.findOne({
      $or: [{ email }, { registrationNumber }],
    }).select("+password");

    if (!hospital) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (hospital not found)",
      });
    }

    const isMatch = await hospital.comparePassword(String(password));

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (password mismatch)",
      });
    }

    const token = generateToken(hospital._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      hospital: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        city: hospital.city,
        isVerified: hospital.isVerified,
      },
    });
  } catch (error) {
    console.error("Hospital Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// logout
const logout = (req, res) => {
  // Since JWT is stateless, we just inform the client to delete the token
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Please delete the token on client side.",
  });
};

// send otp
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    hospital.resetOTP = hashedOTP;
    hospital.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
    hospital.isOTPVerified = false;
    hospital.lastOTPSentAt = Date.now();

    await hospital.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`,
    );

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const hospital = await Hospital.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpire: { $gt: Date.now() },
    });

    if (!hospital) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    hospital.isOTPVerified = true;
    await hospital.save();

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hospital = await Hospital.findOne({
      email,
      isOTPVerified: true,
      resetOTPExpire: { $gt: Date.now() },
    });

    if (!hospital) {
      return res.status(400).json({ message: "OTP not verified or expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    hospital.password = hashedPassword;

    hospital.resetOTP = undefined;
    hospital.resetOTPExpire = undefined;
    hospital.isOTPVerified = false;

    await hospital.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// resend otp
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // 60 sec cooldown
    if (
      hospital.lastOTPSentAt &&
      Date.now() - hospital.lastOTPSentAt < 60 * 1000
    ) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting OTP again" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    hospital.resetOTP = hashedOTP;
    hospital.resetOTPExpire = Date.now() + 10 * 60 * 1000;
    hospital.isOTPVerified = false;
    hospital.lastOTPSentAt = Date.now();

    await hospital.save();

    await sendEmail(
      email,
      "Resend Password Reset OTP",
      `Your new OTP is ${otp}. It will expire in 10 minutes.`,
    );

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateHospitalProfile = async (req, res) => {
  try {
    if (req.user.role !== "hospital") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { name, phone, address, city, state, pincode } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (pincode) updateData.pincode = pincode;

    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedHospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hospital profile updated successfully",
      hospital: updatedHospital,
    });
  } catch (error) {
    console.error("Update hospital profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateHospitalProfilePic = async (req, res) => {
  try {
    if (req.user.role !== "hospital") {
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

    // 🔎 Fetch hospital first
    const hospital = await Hospital.findById(req.user.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // 🔥 Delete old logo if exists
    if (hospital.profilePicPublicId) {
      await cloudinary.uploader.destroy(hospital.profilePicPublicId);
    }

    // 📤 Upload new logo
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "hospital_profile_pictures",
    });

    hospital.profilePic = result.secure_url;
    hospital.profilePicPublicId = result.public_id;

    await hospital.save();

    res.status(200).json({
      success: true,
      message: "Hospital profile picture updated successfully",
      hospital,
    });
  } catch (error) {
    console.error("Update hospital pic error:", error);
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
  resendOTP,
  resetPassword,
  updateHospitalProfile,
  updateHospitalProfilePic,
};
