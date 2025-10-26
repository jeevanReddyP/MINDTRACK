import express from "express";
import login from "../controllers"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;