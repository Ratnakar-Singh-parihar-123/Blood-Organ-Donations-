const Hospital = require("../models/Hospital");
const { generateToken } = require("../utils/jwt");

// Hospital Register
const register = async (req, res) => {
    try {
        const {
            hospitalName,
            registrationNumber,
            email,
            phone,
            city,
            password,
        } = req.body;

        // 1️⃣ Validate required fields
        if (!hospitalName || !registrationNumber || !email || !phone || !city || !password) {
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
                message: "Hospital already exists with this email or registration number",
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
            const messages = Object.values(error.errors).map(val => val.message);
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
        message: 'Logged out successfully. Please delete the token on client side.'
    });
};

module.exports = {
    register,
    login,
    logout
};
