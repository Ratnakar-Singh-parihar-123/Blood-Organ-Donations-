const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const bloodDonorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false
    },
    donationDate: {
      type: Date,
    },
    address: {
      type: String,
    },
    // BloodDonor & OrganDonor schema
    isAvailable: { type: Boolean, default: true },
    resetOTP: String,
    resetOTPExpire: Date,
  },
  { timestamps: true }
);


// 🔐 PASSWORD HASH (before save)
// 🔹 Pre-save hook without next()
bloodDonorSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // Only hash if password changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
bloodDonorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model("BloodDonor", bloodDonorSchema);
