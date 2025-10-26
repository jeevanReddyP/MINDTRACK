import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  habit: { type: String, required: true },
  duration: { type: Number, required: true },
  dailyMinutes: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

export default Challenge;
