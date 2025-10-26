import express from "express";
import Challenge from "../models/Challenge.js";

const router = express.Router();

// Create a new challenge
router.post("/", async (req, res) => {
  const { habit, duration, dailyMinutes } = req.body;

  if (!habit || !duration || !dailyMinutes) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newChallenge = await Challenge.create({ habit, duration, dailyMinutes });
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all challenges (optional)
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
