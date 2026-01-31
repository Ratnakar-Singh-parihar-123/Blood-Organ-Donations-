const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const organDonorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be greater than 0"],
      max: [100, "Age must be less than 100"],
    },

    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    organsToDonate: {
      type: [String],
      required: [true, "Please select at least one organ"],
      enum: [
        "Kidney",
        "Liver",
        "Heart",
        "Lungs",
        "Pancreas",
        "Intestine",
        "Cornea",
        "Skin",
        "Bone Marrow",
      ],
    },

    emergencyContact: {
      name: {
        type: String,
        required: [true, "Emergency contact name is required"],
      },
      phone: {
        type: String,
        required: [true, "Emergency contact phone is required"],
      },
      relation: {
        type: String,
        required: [true, "Relation is required"],
      },
    },

    medicalHistory: {
      type: String,
      default: "No major medical history",
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

// 🔹 Pre-save hook without next()
organDonorSchema.pre('save', async function () {
    if (!this.isModified('password')) return; // Only hash if password changed
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
organDonorSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("OrganDonor", organDonorSchema);
