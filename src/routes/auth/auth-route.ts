import express from "express";
import {
  handleLogin,
  handleRegister,
  handleRefreshToken,
  handleLogout,
} from "../../controllers";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);

export default router;
