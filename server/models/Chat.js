const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      role: { 
        type: String, 
        enum: ["patient", "blood-donor", "organ-donor", "blood-organ-donor"], 
        required: true 
      }
    }
  ],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
