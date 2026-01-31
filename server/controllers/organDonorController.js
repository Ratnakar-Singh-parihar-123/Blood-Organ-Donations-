const OrganDonor = require("../models/OrganDonor");
const { generateToken } = require("../utils/jwt");

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

module.exports = { register, login, logout };
