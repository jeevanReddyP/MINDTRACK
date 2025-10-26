import Challenge from "../models/Challenge.js";

// Create a new challenge
export const createChallenge = async (req, res) => {
  try {
    const { habit, duration, dailyMinutes } = req.body;
    const challenge = new Challenge({ habit, duration, dailyMinutes, hearts: 0 });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all challenges
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
