import express from "express";
import { createSavings, getSavings, getSavingsTotal } from "../../controllers";

const router = express.Router();

router.get("/api/v1/savings", getSavings);
router.get("/api/v1/savings/total", getSavingsTotal);
router.post("/api/v1/savings", createSavings);

export default router;
