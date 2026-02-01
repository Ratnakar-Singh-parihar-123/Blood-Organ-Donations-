const OrganDonor = require("../models/OrganDonor");
const { generateToken } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


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
            const messages = Object.values(error.errors).map(
                (val) => val.message
            );
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

        const organDonor = await OrganDonor
            .findOne({ email })
            .select("+password");

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
        const { email } = req.body;

        const organdonor = await OrganDonor.findOne({ email });
        if (!organdonor) {
            return res.status(400).json({ message: "OrganDonor not found" });

        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // hash otp
        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");
        organdonor.resetOTP = hashedOTP;
        organdonor.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
        await organdonor.save();

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

        const organdonor = await OrganDonor.findOne({
            email,
            resetOTP: hashedOTP,
            resetOTPExpire: { $gt: Date.now() },
        });

        if (!organdonor) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// reset password
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        const organdonor = await OrganDonor.findOne({
            email,
            resetOTP: hashedOTP,
            resetOTPExpire: { $gt: Date.now() },
        });

        if (!organdonor) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        organdonor.password = newPassword;
        organdonor.resetOTP = undefined;
        originAgentClusterdonor.resetOTPExpire = undefined;

        await organdonor.save();

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

        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        // overwrite old OTP
        organdonor.resetOTP = hashedOTP;
        organdonor.resetOTPExpire = Date.now() + 10 * 60 * 1000;

        await organdonor.save();

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

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    resendOTP
};
