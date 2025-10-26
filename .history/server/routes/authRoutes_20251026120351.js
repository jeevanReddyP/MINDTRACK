import express from "express";
import signup from "../../app/src/Components/Signup";
import 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;