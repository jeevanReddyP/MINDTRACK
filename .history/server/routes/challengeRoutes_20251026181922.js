import express from "express";
import { createChallenge, getChallenges } from "../controllers/challengeController.js";

const router = express.Router();

router.post("/", createChallenge);
router.get("/", getChallenges);

export default router;
