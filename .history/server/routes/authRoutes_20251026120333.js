import express from "express";
import Signup from "../../app/src/Components/Signup";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;