import express from "express";
import { login, register, handleRefreshToken } from "../../controllers";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh", handleRefreshToken);

export default router;
