import express from "express";
impo

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;