import express from "express";
import lo

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;