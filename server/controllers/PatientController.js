const Patient = require("../models/Patient");
const { generateToken } = require("../utils/jwt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const BloodDonor = require("../models/BloodDonor");
const OrganDonor = require("../models/OrganDonor");

// register
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      patientType,
      bloodGroup,
      organRequired,
      needType,
      medicalCondition,
      urgencyLevel,
      hospitalName,
      doctorName,
      city,
      emergencyContact,
      address,
    } = req.body;

    // ✅ CHECK DUPLICATES BEFORE CREATING
    const existingEmail = await Patient.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Patient already exists with this email",
      });
    }

    const existingPhone = await Patient.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Patient already exists with this phone number",
      });
    }

    // ✅ CREATE PATIENT
    const patient = await Patient.create({
      name,
      email,
      phone,
      password,
      patientType,
      bloodGroup,
      organRequired,
      needType,
      medicalCondition,
      urgencyLevel,
      hospitalName,
      doctorName,
      city,
      emergencyContact,
      address,
    });

    // ✅ GENERATE JWT
    const token = generateToken(patient._id);

    // hide password in response
    patient.password = undefined;

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      token,
      patient,
    });
  } catch (error) {
    console.error("Patient Registration Error:", error);

    // ✅ HANDLE DUPLICATE KEY ERROR (MONGODB UNIQUE INDEX)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Patient already exists with this ${duplicateField}`,
      });
    }

    // ✅ HANDLE VALIDATION ERRORS (MONGOOSE SCHEMA VALIDATION)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // fallback server error
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};


// LOGIN

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const patient = await Patient
      .findOne({ email })
      .select("+password");

    if (!patient) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await patient.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(patient._id);

    patient.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      patient,
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


// SEND OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // hash otp
    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    patient.resetOTP = hashedOTP;
    patient.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await patient.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const patient = await Patient.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpire: { $gt: Date.now() },
    });

    if (!patient) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const patient = await Patient.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpire: { $gt: Date.now() },
    });

    if (!patient) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    patient.password = newPassword;
    patient.resetOTP = undefined;
    patient.resetOTPExpire = undefined;

    await patient.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// resend otp
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // OPTIONAL: cooldown (60 sec)
    if (
      patient.resetOTPExpire &&
      patient.resetOTPExpire > Date.now() - 9 * 60 * 1000
    ) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting OTP again" });
    }

    // generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // overwrite old OTP
    patient.resetOTP = hashedOTP;
    patient.resetOTPExpire = Date.now() + 10 * 60 * 1000;

    await patient.save();

    await sendEmail(
      email,
      "Resend Password Reset OTP",
      `Your new OTP is ${otp}. It will expire in 10 minutes.`
    );

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//  macth donor 
const matchDonors = async (req, res) => {
  try {
    // 1️⃣ Fetch patient
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 2️⃣ Fetch blood donors
    const bloodDonorsRaw = await BloodDonor.find({
      bloodGroup: patient.bloodGroup.toUpperCase(),
      city: { $regex: `^${patient.city}$`, $options: "i" },
      isAvailable: true,
    }).limit(10);

    // 3️⃣ Map blood donors for frontend
    const bloodDonors = bloodDonorsRaw.map(d => ({
      _id: d._id,
      name: d.name,
      bloodGroup: d.bloodGroup,
      city: d.city,
      distance: Math.floor(Math.random() * 50) + 1, // mock 1-50 km
      availability: d.isAvailable ? "immediate" : "not available",
      isVerified: d.isVerified || false,
      matchScore: Math.floor(Math.random() * 21) + 80, // mock 80-100%
      type: "blood"
    }));

    // 4️⃣ Fetch organ donors (if needed)
    let organDonors = [];
    if (patient.organRequired) {
      const organDonorsRaw = await OrganDonor.find({
        organsToDonate: { $in: [patient.organRequired] },
        city: { $regex: `^${patient.city}$`, $options: "i" },
        isAvailable: true,
      }).limit(10);

      organDonors = organDonorsRaw.map(d => ({
        _id: d._id,
        name: d.name,
        organs: d.organsToDonate,
        city: d.city,
        distance: Math.floor(Math.random() * 50) + 1,
        availability: d.isAvailable ? "immediate" : "not available",
        isVerified: d.isVerified || false,
        matchScore: Math.floor(Math.random() * 21) + 80,
        type: "organ"
      }));
    }

    // 5️⃣ Send response
    res.json({
      patient,
      matches: {
        bloodDonors,
        organDonors
      }
    });

  } catch (error) {
    console.error("Match Donors Error:", error);
    res.status(500).json({ message: "Server error" });
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
  matchDonors
};
