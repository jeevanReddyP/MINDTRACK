import express from "express";
import sign

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;