import express from "express";
import { createSavings, getSavings, getSavingsTotal } from "../../controllers";

const router = express.Router();

router.get("/", getSavings);
router.get("/total", getSavingsTotal);
router.post("/", createSavings);

export default router;
