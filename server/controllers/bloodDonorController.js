const BloodDonor = require("../models/BloodDonor");
const { generateToken } = require('../utils/jwt');

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

module.exports = { register, login, logout };
