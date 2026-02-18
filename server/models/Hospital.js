const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const hospitalSchema = new mongoose.Schema(
  {
    // Basic Info
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    // Auth
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔒 password by default response me nahi aayega
    },

    role: {
      type: String,
      default: "hospital",
    },

    // Status & Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Optional (future use)
    documents: {
      license: String,
      certificate: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    resetOTP: String,
    resetOTPExpire: Date,
    lastLogin: Date,
  },
  { timestamps: true },
);

// 🔹 Pre-save hook without next()
hospitalSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // Only hash if password changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
hospitalSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Hospital", hospitalSchema);
