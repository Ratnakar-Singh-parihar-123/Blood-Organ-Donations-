const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    patientType: {
      type: String,
      enum: ["self", "family", "friend"],
      default: "self",
    },

    // 🔴 Blood related
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      default: "",
    },

    // 🫀 Organ related
    organRequired: {
      type: String,
      enum: [
        "Heart",
        "Kidney",
        "Liver",
        "Lungs",
        "Pancreas",
        "Cornea",
        "Bone Marrow",
        "Skin",
      ],
      default: "",
    },

    // 🧠 Tell system what patient needs
    needType: {
      type: String,
      enum: ["blood", "organ", "both"],
      default: "blood",
    },

    medicalCondition: {
      type: String,
      default: "",
    },

    urgencyLevel: {
      type: String,
      enum: ["normal", "urgent", "emergency"],
      default: "normal",
    },

    hospitalName: {
      type: String,
      default: "",
    },

    doctorName: {
      type: String,
      default: "",
    },

    // 📍 VERY IMPORTANT for matching
    city: {
      type: String,
      enum: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Kolkata",
        "Hyderabad",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Lucknow",
        "Indore",
        "Bhopal",
        "Chandigarh",
        "Dehradun",
        "Nagpur",
      ],
      required: [true, "City is required"],
    },

    emergencyContact: {
      type: String,
      required: [true, "Emergency contact is required"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },

    // 🔐 OTP reset
    resetOTP: String,
    resetOTPExpire: Date,
  },
  { timestamps: true },
);

// 🔒 Password hashing
patientSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 Compare password
patientSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Patient", patientSchema);
