import mongoose from "mongoose";

const aiMessagesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["system", "user"],
      default: "system",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//! Compile to form the model
const AiMessage = mongoose.model("AiMessage", aiMessagesSchema);

export default AiMessage;
