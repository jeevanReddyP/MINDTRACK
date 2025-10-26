import express from "express";
import signup from "../../app/src/Components/Signup";
imo

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;