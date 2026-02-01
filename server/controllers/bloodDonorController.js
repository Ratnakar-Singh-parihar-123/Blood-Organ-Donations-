const BloodDonor = require("../models/BloodDonor");
const { generateToken } = require('../utils/jwt');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Blood Donor register
const register = async (req, res) => {
    try {
        const {
            fullName,
            age,
            bloodGroup,
            phone,
            email,
            password,
            donationDate,
            address,
        } = req.body;

        // check if blood donor already exists
        const existingBloodDonor = await BloodDonor.findOne({ email });
        if (existingBloodDonor) {
            return res.status(400).json({
                success: false,
                message: "Blood Donor already exists with this email",
            });
        }

        // create blood donor
        const bloodDonor = await BloodDonor.create({
            fullName,
            age,
            bloodGroup,
            phone,
            email,
            password,
            donationDate,
            address,
        });

        // Generate JWT
        const token = generateToken(bloodDonor._id);

        res.status(201).json({
            success: true,
            message: "Blood Donor registered successfully",
            token,
            bloodDonor,
        });
    } catch (error) {
        console.error("Blood Donor Registration Error:", error);

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

// Blood Donor login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const bloodDonor = await BloodDonor
            .findOne({ email })
            .select("+password");

        if (!bloodDonor) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPasswordMatch = await bloodDonor.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT
        const token = generateToken(bloodDonor._id);

        bloodDonor.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            bloodDonor,
        });
    } catch (error) {
        console.error("Login error:", error);
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
        message: 'Logged out successfully. Please delete the token on client side.'
    });
};

// send otp
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const blooddonor = await BloodDonor.findOne({ email });
        if (!blooddonor) {
            return res.status(400).json({ message: "BloodDonor not found" });

        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // hash otp
        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");
        blooddonor.resetOTP = hashedOTP;
        blooddonor.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
        await blooddonor.save();

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

        const blooddonor = await BloodDonor.findOne({
            email,
            resetOTP: hashedOTP,
            resetOTPExpire: { $gt: Date.now() },
        });

        if (!blooddonor) {
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

        const blooddonor = await BloodDonor.findOne({
            email,
            resetOTP: hashedOTP,
            resetOTPExpire: { $gt: Date.now() },
        });

        if (!blooddonor) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        blooddonor.password = newPassword;
        blooddonor.resetOTP = undefined;
        blooddonor.resetOTPExpire = undefined;

        await blooddonor.save();

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

        const blooddonor = await BloodDonor.findOne({ email });
        if (!blooddonor) {
            return res.status(404).json({ message: "BloodDonor not found" });
        }

        // OPTIONAL: cooldown (60 sec)
        if (
            blooddonor.resetOTPExpire &&
            blooddonor.resetOTPExpire > Date.now() - 9 * 60 * 1000
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
        blooddonor.resetOTP = hashedOTP;
        blooddonor.resetOTPExpire = Date.now() + 10 * 60 * 1000;

        await blooddonor.save();

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
